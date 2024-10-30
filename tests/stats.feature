@concurrent
Feature: Game stats

  As a player
  I want to know how I did when I finish a game
  To measure my performance

  Scenario: The time and moves are available
    Given all cards are playable
    And I click the "autoplay" button
    And I wait for 1500ms
    Then I should see "Time: 1 second"
    And I should see "Moves: 52"

  Scenario: The time doesn't start until the first click
    Given all cards are playable
    When I wait for 2000ms
    And I click the "autoplay" button
    And I wait for 1500ms
    Then I should see "Time: 1 second"
