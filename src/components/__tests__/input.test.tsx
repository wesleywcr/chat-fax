import { Input } from '@components/Input';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('Component: Input', () => {
  it('should be render input', () => {
    render(<Input placeholder="Enter test" />);
    const inputElement = screen.getByPlaceholderText('Enter test');
    expect(inputElement).toBeTruthy();
  });

  it('should be displays correct value', () => {
    render(<Input placeholder="Enter test" value="ID" />);
    const inputElement = screen.getByPlaceholderText('Enter test');
    expect(inputElement.props.value).toBe('ID');
  });

  it('should be changes text correctly', () => {
    const onChangeTextMock = jest.fn();
    render(<Input placeholder="Enter test" onChangeText={onChangeTextMock} />);
    const inputElement = screen.getByPlaceholderText('Enter test');

    fireEvent.changeText(inputElement, 'email');
    expect(onChangeTextMock).toHaveBeenCalledWith('email');
  });
});
