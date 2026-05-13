Feature: Add New Customer
  As a bank manager
  I want to add new customers
  So that they can access banking services
  @skip
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
      #| customer1   |
      | customer2   |
#| customer3   |
