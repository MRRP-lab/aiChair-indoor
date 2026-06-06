import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Pressable, Text } from 'react-native';

const feature = loadFeature('__tests__/features/guideFollowing.feature');

defineFeature(feature, (test) => {

    const stopFollowingButton = jest.fn()
    const chairIsMoving = jest.fn(() => false)


    test('User wants to end the guide Following', ({ given, then }) => {
        given('the user presses the "stop following" button', () => {
            render(
                <Pressable onPress={stopFollowingButton}>
                    <Text>Stop Following</Text>
                </Pressable>
            );
            fireEvent.press(screen.getByText(/Stop Following/i));
        });

        then('the app should stop sending movement commands to the wheelchair', () => {
            expect(chairIsMoving()).toBe(false);

            expect(stopFollowingButton).toHaveBeenCalledTimes(1);
        });
    });
});