Feature: Login functionality

  Scenario: Valid login
    Given I navigate to the login page
    When I enter valid credentials
    Then I should see the dashboard
    And I take a screenshot of the dashboard
    When I click on the "New Customer" menu link
    Then I should see all menu links listed

