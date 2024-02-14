/* eslint-disable react-hooks/exhaustive-deps */
import type { ChatDTO } from '@dto/chatDTO';
import { useAuth } from '@hooks/useAuth';
import useListMessages from '@hooks/useListMessages';
import useShowUser from '@hooks/useShowUser';
import { pb } from '@lib/pocketbase';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import type { SectionList } from 'react-native';

export default function useReceiver() {
  const { control, reset, handleSubmit } = useForm<ChatDTO>();

  const { user } = useAuth();

  const listRef = useRef<SectionList | null>(null);

  const { receiverId } = useLocalSearchParams();
  const {
    data: listMsg,
    isLoading,
    refetch,
  } = useListMessages(receiverId as string);

  const { data: receiver } = useShowUser(String(receiverId));

  async function updateUserMessages(newStatus: number) {
    try {
      const dataListMessages = listMsg?.map((item) => item.data.map((i) => i));
      const messages = dataListMessages?.flat().map((item) => item);
      if (messages !== undefined) {
        for (let i = 0; i < messages.length; i++) {
          const message = messages[i];

          const dataForm = {
            text: message.message,
            status: newStatus,
            from: message.from,
            to: message.to,
            user: message.from,
          };

          if (dataForm.to === user.id) {
            await pb.collection('messages').update(message.id, dataForm);
          }
        }
      }
    } catch (error) {
      console.error(`Failed to update messages: ${error}`);
    }
  }

  const scrollToBottom = () => {
    if (listMsg !== undefined) {
      if (listMsg?.length !== 0) {
        const lastSection = listMsg.length - 1;
        const lastItemIndex = listMsg[lastSection].data.length - 1;

        if (listRef.current) {
          listRef.current.scrollToLocation({
            sectionIndex: lastSection,
            itemIndex: lastItemIndex,
            animated: true,
          });
        }
      }
    }
  };
  useEffect(() => {
    updateUserMessages(2);
    scrollToBottom();
  }, [listMsg]);

  useFocusEffect(
    useCallback(() => {
      const fetchNewMessages = async () => {
        try {
          await pb.collection('messages').subscribe('*', (e) => {
            console.log('action', e);
            refetch();
          });

          updateUserMessages(2);
          scrollToBottom();
        } catch (error: any) {
          console.error('Error Subscribe', error.originalError);
        }
      };

      fetchNewMessages();

      return async () => {
        try {
          await pb.collection('messages').unsubscribe('*');
          console.log('unsubscribed');
        } catch (error: any) {
          console.log('error unsubscribed', error.originalError);
        }
      };
    }, []),
  );

  async function handleSendMessage(data: ChatDTO) {
    try {
      const form = {
        text: data.text,
        user: user.id,
        status: 1,
        from: user.id,
        to: receiverId,
      };
      await pb.collection('messages').create(form);
      reset();
    } catch (error: any) {
      console.error('Error', error.originalError.data);
    }
  }

  return {
    handleSubmit,
    handleSendMessage,
    control,
    listMsg,
    listRef,
    isLoading,
    receiver,
  };
}
