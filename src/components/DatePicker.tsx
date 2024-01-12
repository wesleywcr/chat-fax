import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const DatePickerInput = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <View>
      <TextInput
        placeholder="Selecione a data"
        value={date.toDateString()}
        editable={false}
      />

      <TouchableOpacity onPress={showDatepicker} testID="date-picker-icon">
        <Text>📅</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="datetime-picker"
          value={date}
          mode="date"
          is24Hour
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

export default DatePickerInput;
