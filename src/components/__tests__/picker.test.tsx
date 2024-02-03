import DatePickerInput from '@components/DatePicker';
import { fireEvent, render } from '@testing-library/react-native';

describe('DatePickerInput', () => {
  it('should open the DateTimePicker when the icon is pressed', async () => {
    const { getByTestId, queryByTestId } = render(<DatePickerInput />);

    expect(queryByTestId('datetime-picker')).toBeNull();

    fireEvent.press(getByTestId('date-picker-icon'));

    expect(getByTestId('datetime-picker')).toBeTruthy();
  });
});
