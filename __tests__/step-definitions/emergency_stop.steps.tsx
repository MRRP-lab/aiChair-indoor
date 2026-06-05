import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen, fireEvent } from '@testing-library/react-native';
import EmergencyStop from '../../app/emergency-stop';

const feature = loadFeature('__tests__/features/emergency_stop.feature');

defineFeature(feature, test => {
  test('Emergency Stop', ({ given, when, then }) => {
    let mockSendToChair: jest.Mock;

    given('the user is on the guide following screen', () => {
      mockSendToChair = jest.fn();                          
      render(<EmergencyStop sendToChair={mockSendToChair} />); 
    });

    when('they hit the emergency stop button', () => {
      fireEvent.press(screen.getByLabelText('Emergency Stop Button'));
    });

    then('the wheelchair should be notified to stop', () => {
      expect(mockSendToChair).toHaveBeenCalledWith('emergency-stop'); 
    });
  });
});