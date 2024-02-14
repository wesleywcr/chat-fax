import { BarInput } from '@components/BarInput';
import { Header } from '@components/Header';
import { Received } from '@components/messages/Received';
import { Sent } from '@components/messages/Sent';
import type { IDataMessages, IListMessages } from '@dto/messagesDTO';
import { useAuth } from '@hooks/useAuth';
import { FILE_URL } from '@storage/storageVariables';
import { convertDateToDay, convertDateToHours } from '@utils/convertDate';
import { Controller } from 'react-hook-form';
import { SectionList, Text, View } from 'react-native';

import useReceiver from '../hook/useReceiver';

export default function Chat() {
  const { user } = useAuth();
  const {
    handleSubmit,
    handleSendMessage,
    control,
    listMsg,
    listRef,
    isLoading,
    receiver,
  } = useReceiver();

  if (listMsg === undefined || receiver === undefined) {
    return <Text className="text-white">Not Found</Text>;
  }
  function renderMessages(data: IListMessages) {
    if (data.from !== user.id) {
      return (
        <View className="w-full  items-start  ">
          <Received
            message={data.message}
            hours={convertDateToHours(data.created_at)}
            avatar_url={`${FILE_URL}/${receiver?.id}/${receiver?.avatar}`}
          />
        </View>
      );
    }
    return (
      <Sent
        message={data.message}
        status={data.status === 1 ? 'sent' : 'viewed'}
        hours={convertDateToHours(data.created_at)}
      />
    );
  }

  return (
    <View className="flex-1 flex-col  justify-between bg-black">
      <Header name={receiver.name ?? ''} status="online" />

      <View
        className="h-full w-full flex-col justify-between rounded-3xl
         bg-stone-950 pb-24"
      >
        <SectionList
          ref={listRef}
          onScrollToIndexFailed={() => listRef.current?.getScrollableNode()}
          sections={listMsg as IDataMessages[]}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={
            isLoading ? (
              <Text className="p-5 text-center font-Poppins_500Medium text-white">
                Loading...
              </Text>
            ) : (
              <></>
            )
          }
          renderSectionHeader={({ section: { title } }) => (
            <View className="mt-5 self-center rounded-md bg-gray-700 px-1 py-2">
              <Text className="text-center text-white">
                {convertDateToDay(title)}
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View className="flex-col  items-end  p-7">
              {renderMessages(item)}
            </View>
          )}
        />

        <Controller
          control={control}
          name="text"
          render={({ field: { onChange, value } }) => (
            <BarInput
              testID="insert-input"
              value={value}
              onChangeText={onChange}
              characterCount={value?.length}
              onSend={handleSubmit(handleSendMessage)}
              onSubmitEditing={handleSubmit(handleSendMessage)}
              returnKeyType="send"
            />
          )}
        />
      </View>
    </View>
  );
}
