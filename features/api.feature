Feature: User API Validation

    @api
    @regression
    Scenario: Verify user details via API
        Given I prepare a GET request for user "1"
        When I send the request to "/users/1"
        Then the response status code should be 200
        And the response body should contain name "Leanne Graham"