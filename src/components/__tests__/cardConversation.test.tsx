import { CardConversation } from '@components/CardConversation';
import { render, screen } from '@testing-library/react-native';

describe('Component: Card Conversation', () => {
  it('should be rendered when there are no messages to be read', () => {
    render(
      <CardConversation
        name="test"
        lastMessage="hi"
        avatar_url="avatar.png"
        unreadMessages={0}
        onPress={() => {}}
      />,
    );
    const activityIndicator = screen.queryByTestId('unreadMessages-indicator');
    expect(activityIndicator).toBeNull();
  });
});
