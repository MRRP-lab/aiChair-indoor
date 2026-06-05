import { render, screen, userEvent } from '@testing-library/react-native';

import EmergencyStop from '../app/emergency-stop';

describe('EmergencyStop', () => {
    it('renders a button named "Emergency Stop"', () => {
        render(<EmergencyStop sendToChair={() => {}} />);
        screen.getByRole('button', { name: 'Emergency Stop' });
    });

    it('calls sendToChair with "emergency-stop" when pressed', async () => {
        const sendToChair = jest.fn();
        const user = userEvent.setup();

        render(<EmergencyStop sendToChair={sendToChair} />);
        const button = screen.getByRole('button', { name: 'Emergency Stop' });
        await user.press(button);
        expect(sendToChair).toHaveBeenCalledWith('emergency-stop');
    });
});