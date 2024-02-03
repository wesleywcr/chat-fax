import Loading from '@components/Loading';
import { render } from '@testing-library/react-native';

describe('Component: Loading', () => {
  it('should be render loading active', () => {
    render(<Loading />);
  });
});
