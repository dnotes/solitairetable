@concurrent
Feature: Game controls

  As a user
  I want to control the game with appropriate buttons on the page

  @mobile @tablet @desktop @widescreen
  Scenario: Take a screenshot
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
