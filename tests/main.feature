Feature: The site must work

  Scenario: The front page should have the title "Solitaire Table"
    Given I am on "/"
    Then I should see an "h1" element with the text "Solitaire Table"
    And the "title" metatag should contain "Solitaire Table"

  @mobile @tablet @desktop @widescreen
  Scenario: Visual: Game screen
    Given I am playing
    Then the screenshot "game" should match
    And the url should contain "5173/play/klondike/"

  Scenario: The images should work
    Given I navigate to "/img/klondike/OwkrbDZdvVUcTspxHLEgmXNiyGulAfoIWMKFneaBSJPjRhqYCQtz.png"
    Then the screenshot should match