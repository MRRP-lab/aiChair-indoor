Feature: Emergency Operations

  Scenario: Emergency Stop
    Given the user is on the guide following screen
    When they hit the emergency stop button
    Then the wheelchair should be notified to stop