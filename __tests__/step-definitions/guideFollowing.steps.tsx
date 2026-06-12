import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, screen, fireEvent } from '@testing-library/react-native';
import GuideFollow from '../../app/guide-follow';

const feature = loadFeature('__tests__/features/guideFollowing.feature');

defineFeature(feature, (test) => {
    test('The user ends guide following', ({ given, when, then }) => {
        const sendToChair = jest.fn();

        given('the app is on guide following mode', () => {
            render(
                <GuideFollow sendToChair={sendToChair} />
            );
        });

        when('the user presses the "stop following" button', () => {
            fireEvent.press(screen.getByText(/Stop Following/i));
        });

        then('the app should tell the chair to stop moving', () => {
            expect(sendToChair).toHaveBeenCalledTimes(1);
            expect(sendToChair).toHaveBeenCalledWith('end-guide-follow');
        });
    });
});