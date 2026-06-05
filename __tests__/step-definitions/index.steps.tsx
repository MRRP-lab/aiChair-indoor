import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen } from '@testing-library/react-native';
import Index from '../../app/index';

const feature = loadFeature('__tests__/features/index.feature');

defineFeature(feature, test => {
  test("User sees the home screen", ({ given, then }) => {

    given("the user opens the app", () => {
      render(<Index />);
    });

    then(/^they should see the text "(.*)"$/, (expectedText: string) => {
      expect(screen.getByText(expectedText)).toBeTruthy();
    });
  });
});