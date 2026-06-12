Feature: Guide Following

    Scenario: The user ends guide following
        Given the app is on guide following mode
        When the user presses the "stop following" button
        Then the app should tell the chair to stop moving