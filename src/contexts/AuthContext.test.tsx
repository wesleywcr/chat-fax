import { useAuth } from '@hooks/useAuth';
import { act, renderHook, waitFor } from '@testing-library/react-native';

import { AuthContextProvider } from './AuthContext';

describe('Context: Auth', () => {
  it('should login is success', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthContextProvider,
    });

    await waitFor(() => act(() => !result.current.isLoadingUserStorageData));

    expect(result.current.signIn);
  });
});
