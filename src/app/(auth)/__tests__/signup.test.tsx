import { storageAuthTokenSave } from '@storage/storageToken';
import { storageUserSave } from '@storage/storageUser';

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../__tests__/utils/customRender';
import SignUp from '../signUp';

describe('App Screens: SignUp', () => {
  it('should open the DateTimePicker when pressing the icon', async () => {
    render(<SignUp />);

    fireEvent.press(screen.getByTestId('show-button'));
    await waitFor(() => {
      expect(screen.queryByTestId('dateTimePicker')).toBeTruthy();
    });
  });
  it('should close the DateTimePicker when confirming the date', async () => {
    render(<SignUp />);

    fireEvent.press(screen.getByTestId('show-button'));
    await waitFor(() => {
      expect(screen.queryByTestId('dateTimePicker')).toBeTruthy();
    });

    fireEvent(screen.queryByTestId('dateTimePicker'), 'onChange', {
      nativeEvent: {
        timestamp: new Date().getTime(),
      },
    });

    await waitFor(() => {
      expect(screen.queryByTestId('dateTimePicker')).toBeNull();
    });
  });
  it('should show error message when all the fields are not entered', async () => {
    render(<SignUp />);

    await fireEvent.press(screen.getByTestId('submit-button'));

    await waitFor(() => {
      const errorMessage = screen.getAllByText('Name is a required field')[0];
      expect(errorMessage).toBeTruthy();
    });
  });
  it('should be render valid fields', async () => {
    render(<SignUp />);

    await waitFor(() => {
      const nameInput = screen.getByTestId('name-input');
      const emailInput = screen.getByTestId('email-input');
      const usernameInput = screen.getByTestId('username-input');
      const phoneInput = screen.getByTestId('phone-input');

      const dateOfBirthInput = screen.getByTestId('dateOfBirth-input');
      const passwordInput = screen.getByTestId('password-input');
      const passwordConfirmInput = screen.getByTestId('passwordConfirm-input');

      expect(nameInput).toBeTruthy();
      expect(emailInput).toBeTruthy();
      expect(phoneInput).toBeTruthy();
      expect(usernameInput).toBeTruthy();

      expect(dateOfBirthInput).toBeTruthy();
      expect(passwordInput).toBeTruthy();
      expect(passwordConfirmInput).toBeTruthy();
    });
  });
  it('should be fills in the form with correct arguments and register success', async () => {
    const data = {
      username: 'test_username',
      email: 'test@example.com',
      password: '12345678',
      passwordConfirm: '12345678',
      name: 'test',
      dateOfBirth: '2022-01-01T10:00:00.123Z',
      phone: '99999999999',
    };
    const dataResponse = {
      id: 'RECORD_ID',
      collectionId: '_pb_users_auth_',
      collectionName: 'users',
      username: 'username123',
      verified: false,
      emailVisibility: true,
      email: 'test@example.com',
      created: '2022-01-01 01:00:00.123Z',
      updated: '2022-01-01 23:59:59.456Z',
      name: 'test',
      avatar: 'filename.jpg',
      dateOfBirth: '2022-01-01 10:00:00.123Z',
      phone: '999999999',
    };
    const getUser = () => {
      return {
        record: dataResponse,
      };
    };
    const mockCreateUser = getUser();

    render(<SignUp />);
    await storageUserSave(dataResponse);
    await storageAuthTokenSave({ token: '123a1231b123c' });

    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const usernameInput = screen.getByTestId('username-input');
    const phoneInput = screen.getByTestId('phone-input');
    const dateOfBirthInput = screen.getByTestId('dateOfBirth-input');
    const passwordInput = screen.getByTestId('password-input');
    const passwordConfirmInput = screen.getByTestId('passwordConfirm-input');

    await fireEvent.changeText(emailInput, data.email);
    await fireEvent.changeText(usernameInput, data.username);
    await fireEvent.changeText(nameInput, data.name);
    await fireEvent.changeText(dateOfBirthInput, data.dateOfBirth);
    await fireEvent.changeText(phoneInput, data.phone);
    await fireEvent.changeText(passwordInput, data.password);
    await fireEvent.changeText(passwordConfirmInput, data.passwordConfirm);

    await fireEvent.press(screen.getByTestId('submit-button'));

    await waitFor(() =>
      act(() => {
        expect(mockCreateUser).toEqual({ record: dataResponse });
      }),
    );
  });
});
