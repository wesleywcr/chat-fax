import type { ILastMessages } from '@dto/messagesDTO';
import { useAuth } from '@hooks/useAuth';
import useLastMessages from '@hooks/useLastMessages';
import { router } from 'expo-router';

export default function useHome() {
  const { data: lastMessages } = useLastMessages();
  const { user } = useAuth();

  function handleOpenChat(id: string) {
    router.push(`chat/${id}`);
  }

  function handleOpenProfile() {
    router.push(`/profile`);
  }

  function groupMessagesByContact(messages: ILastMessages[] | undefined) {
    if (messages !== undefined) {
      const latestMessagesByContact = {} as any;
      messages.forEach((message) => {
        const contactId =
          message.expand.to.id === user.id
            ? message.expand.from.id
            : message.expand.to.id;

        if (
          !latestMessagesByContact[contactId] ||
          message.created > latestMessagesByContact[contactId].created
        ) {
          latestMessagesByContact[contactId] = message;
        }
      });

      return Object.values(latestMessagesByContact) as ILastMessages[];
    }
  }
  const lastMessagesData = lastMessages?.filter(
    (item) => item.expand.to.id === user.id || item.expand.from.id === user.id,
  );
  const messagesFilters = groupMessagesByContact(lastMessagesData);

  function unReadMessages(ID: string) {
    if (lastMessages !== undefined) {
      return lastMessages
        .filter(
          (item) =>
            item.to === user.id && item.from === ID && item.status === 1,
        )
        .map((item) => item.text).length;
    }
    return 0;
  }
  return {
    handleOpenChat,
    handleOpenProfile,
    unReadMessages,
    messagesFilters,
  };
}
