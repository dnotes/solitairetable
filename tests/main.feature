Feature: The site must work

  Scenario: The front page should have the title "Solitaire Table"
    Given I am on "/"
    Then I should see an "h1" element with the text "Solitaire Table"
    And the "title" metatag should contain "Solitaire Table"