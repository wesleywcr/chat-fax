import { pb } from '@lib/pocketbase';

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../__tests__/utils/customRender';
import Login from '../login';

describe('App Screens: Login', () => {
  it('should be render valid fields', () => {
    render(<Login />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });
  it('should be fills in the form with correct arguments and login success', async () => {
    const mockAuth = jest.fn();
    pb.collection('users').authWithPassword = mockAuth;
    const email = 'usuario@teste.com';
    const password = 'senhateste';

    render(<Login />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    await fireEvent.changeText(emailInput, email);
    await fireEvent.changeText(passwordInput, password);

    await fireEvent.press(screen.getByTestId('submit-button'));

    await waitFor(() =>
      act(() => {
        expect(mockAuth).toHaveBeenCalled();
        expect(mockAuth).toHaveBeenCalledWith(email, password);
      }),
    );
  });

  it('should be error in authentication', async () => {
    const mockAuthWithPassword = jest
      .spyOn(pb.collection('users'), 'authWithPassword')
      .mockRejectedValue(new Error('Falha na autenticação'));
    const email = 'usuario@teste.com';
    const password = 'senhateste';

    render(<Login />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    await fireEvent.changeText(emailInput, email);
    await fireEvent.changeText(passwordInput, password);

    await fireEvent.press(screen.getByTestId('submit-button'));
    await waitFor(() => {
      expect(mockAuthWithPassword).toHaveBeenCalledWith(email, password);
    });
  });
});
