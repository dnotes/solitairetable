@concurrent
Feature: Game stats

  As a player
  I want to know how I did when I finish a game
  To measure my performance

  Scenario: The time and moves are available
    Given all cards are playable
    And I click the "autoplay" button
    And I wait for 1500ms
    Then I should see "Time: 0:01"
    And I should see "Moves: 52"

  Scenario: The time doesn't start until the first click
    Given all cards are playable
    When I wait for 2000ms
    And I click the "autoplay" button
    And I wait for 1500ms
    Then I should see "Time: 0:01"

  Scenario: Share link should contain stats after the game is started
    Given I am playing
    When I click the "Share" button
    Then I should see "game link copied!"
    And the clipboard should contain "/play/"
    And the clipboard should NOT contain "score"
    And the clipboard should NOT contain "time"
    And the clipboard should NOT contain "moves"
    When I play the Ace of Spades
    And I wait 2 seconds
    And I click the "Share" button
    Then I should see "game link copied!"
    Then the clipboard should contain "score: -47"

  Rule: Undos and restarts should be tracked

    Scenario: I undo a move
      Given all cards are playable
      When I play the Ace of Diamonds
      And I click the "Undo" button
      And I click the "autoplay" button
      And I wait for 1500ms
      Then I should see "Undo: 1"
      And I should see "Restart: 0"

    Scenario: I restart the game
      Given all cards are playable
      When I play the Ace of Diamonds
      And I click the "Restart" button
      And I click the "autoplay" button
      And I wait for 1500ms
      Then I should see "Undo: 0"
      And I should see "Restart: 1"
