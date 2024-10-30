@concurrent
Feature: Game controls

  As a user
  I want to control the game with appropriate buttons on the page

  @mobile @tablet @desktop @widescreen
  Scenario: Visual: Game screen
    Given I am playing
    Then the screenshot should match
    And the url should contain "5173/play/klondike/"

  Rule: The game controls should be shown correctly on the page

    @mobile @tablet
    Scenario: Mobile users should see a concise button bar
      Given I am playing
      Then I should see a "Games" button
      And I should see a "Deal" button
      And I should see a "Undo" button
      And I should see a "Redo" button
      And I should see a "Share" button
      And I should see a "Menu" button

    @desktop @widescreen
    Scenario: I should see the basic buttons immediately
      Given I am playing
      Then I should see a "Restart" button
      And I should see a "New" button
      And I should see a "Undo" button
      And I should see a "Redo" button
      And I should see a "Share" button
      And I should NOT see a "Menu" button
      And I should NOT see a "Deal" button

  Rule: The game should allow autoplay when all cards are playable

    @mobile @tablet @desktop @widescreen
    Scenario: The autoplay button shows
      Given all cards are playable
      When I click the "autoplay" button
      And I wait for 1500ms
      Then I should see "Finished!"
      And I should see "Time:"
      And I should see "Moves:"
      And I should see the "New" button
      And I should see the "Restart" button
      And I should see the "Share" button

  Rule: Remove the Replay button until it is ready

    @mobile @tablet @desktop @widescreen
    Scenario: remove the button from the main screen
      Given I am playing
      Then I should NOT see a "Replay" button

    @mobile @tablet @desktop @widescreen
    Scenario: remove the button from the "Finished!" screen
      Given I have just won a game
      And I take a screenshot
      Then I should NOT see a "Replay" button

    @mobile @tablet
    Scenario: remove the button from the "Deal" Menu
      Given I am playing
      When I click the "Deal" button
      Then I should NOT see a "Replay" button

