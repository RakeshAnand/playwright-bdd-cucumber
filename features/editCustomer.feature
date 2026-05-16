Feature: Edit Customer
  As a bank manager
  I want to fetch and verify customer details
  So that I can ensure the data matches expected records

  Scenario Outline: Verify customer details against JSON data
    Given I navigate to the login page
    When I enter valid credentials
    Then I should see the dashboard
    And I click on the "Edit Customer" menu link
    When I enter Customer ID "<customerId>" and submit the form
    When I print the customer details
    #Then I am on the Edit Customer page
    #Then the customer details should match the expected data for "<customerKey>"

    Examples:
      | customerKey | customerId |
      | customer4   | 37001      |
#| customer5   | 37002      |