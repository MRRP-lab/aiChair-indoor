Feature: Example

    Scenario: Run Index
        When Index() is called
        Then I should receive a View with text that says "Edit app/index.tsx to edit this screen."