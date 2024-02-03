import { Button } from '@components/Button';
import { render, screen } from '@testing-library/react-native';

describe('Component: Button', () => {
  it('should be render without if isLoading prop is undefined', () => {
    render(<Button title="test" />);
    const activityIndicator = screen.queryByTestId('activity-indicator');
    expect(activityIndicator).toBeNull();
  });
});
