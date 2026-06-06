Feature: Guide Following

    Scenario: User wants to end the guide Following
        Given the user presses the "stop following" button
        Then the app should stop sending movement commands to the wheelchair