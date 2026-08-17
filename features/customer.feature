Feature: Customer Management
  This feature covers login and adding new customers.
  Scenario: Print all left navigation pane links
    Given I navigate to the login page
    When I enter valid credentials
    Then I should see the dashboard
    Then I fetch and print all items from the left navigation pane

  @skip
  @smoke
  Scenario Outline: Add multiple customers
    Given I navigate to the login page
    When I enter valid credentials
    And I click on the "New Customer" menu link
    Given I am on the Add New Customer page
    And I fill in the customer details for "<customerKey>"
    And I submit the customer form
    Then the customer should be added successfully

    Examples:
      | customerKey |
      | customer1   |
#| customer2   |
#| customer3   |
