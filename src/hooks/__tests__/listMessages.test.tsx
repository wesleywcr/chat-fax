import { act, renderHook, waitFor } from '@__tests__/utils/customRender';
import useListMessages from '@hooks/useListMessages';
import * as useList from '@hooks/useListMessages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const useListSpy = jest.spyOn(useList, 'default');

describe('Hooks: useListMessages', () => {
  it('should render message listing successfully', async () => {
    const queryClient = new QueryClient();
    useListSpy.mockReturnValue({
      data: [
        {
          data: [
            {
              created_at: '2027-11-21 00:00:00',
              from: 'hopy65w99rwu7bz',
              id: 'h8c25k88cbvubnm',
              message: 'hi',
              status: 1,
              to: '2y1du0xrsv6mijg',
            },
          ],
          title: '2027-11-21 00:00:00',
        },
      ],
      isLoading: false,
      refetch: (): any => {},
    });
    const { result } = renderHook(() => useListMessages('123'), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });
    await waitFor(() =>
      act(
        expect(result.current.isLoading === false),
        expect(result.current.data).toBeTruthy(),
      ),
    );
  });
});
