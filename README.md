DELETE /test-orders/{id} endpoint checklist

| № | Test name                                                                                                                       | Status |
|---|---------------------------------------------------------------------------------------------------------------------------------|--------|
| 1 | Valid order ID and API key deletes an order and returns status code "NO_CONTENT" (204)                                          | Passed |
| 2 | Invalid order ID with special characters and valid API key does not delete an order and returns status code "BAD_REQUEST" (400) | Passed |
| 3 | Valid order ID and invalid API key does not delete an order and returns status code "UNAUTHORIZED" (401)                        | Passed |
| 4 | Valid order ID and empty API key does not delete an order and returns status code "UNAUTHORIZED" (401)                          | Passed |
| 5 | Empty order ID and valid API key does not delete an order and returns status code "METHOD_NOT_ALLOWED" (405)                    | Passed |

PUT /test-orders/{id} endpoint checklist

| № | Test name                                                                                                                       | Status |
|---|---------------------------------------------------------------------------------------------------------------------------------|--------|
| 1 | Valid order ID and API key updates an order and returns status code "OK" (200)                                                  | Passed |
| 2 | Invalid order ID with special characters and valid API key does not update an order and returns status code "BAD_REQUEST" (400) | Passed |
| 3 | Valid order ID and invalid API key does not update an order and returns status code ""UNAUTHORIZED" (401)                       | Passed |
| 4 | Request without order id and valid API key does not update an order and returns status code "METHOD_NOT_ALLOWED" (405)          | Passed |
| 5 | Request with valid order id and empty API key does not update an order and returns status code "UNAUTHORIZED" (401)             | Passed |
| 6 | Request with non-existent order id and valid API key does not update an order and returns status code "NOT_FOUND" (404)         | Failed |

GET /test-orders endpoint checklist

| № | Test name                                                                                                         | Status |
|---|-------------------------------------------------------------------------------------------------------------------|--------|
| 1 | Valid username and password return an API key, status code "OK"                                                   | Passed |
| 2 | Invalid username(number instead of string) and valid password do not return an API key, status code "BAD_REQUEST" | Failed |
| 3 | Valid username and invalid password(number instead of string) do not return an API key, status code "BAD_REQUEST" | Failed |
| 4 | Empty username or password do not return an API key, status code "INTERNAL_SERVER_ERROR"                          | Passed |
| 5 | Empty username or password do not return an API key, status code "INTERNAL_SERVER_ERROR"                          | Passed |

Post /api/loan-calc/decision checklist

| №  | Test name                                                                                                              | Status |
|----|------------------------------------------------------------------------------------------------------------------------|--------|
| 1  | Income greater than 0, debt not negative, age greater than 16, returns risk score and level and status code "OK" (200) | Passed |
| 2  | Income equals 0, debt not negative, age greater than 16, returns status code "BAD_REQUEST" (400)                       | Passed |
| 3  | Income greater than 0, debt negative, age greater than 16, returns status code "BAD_REQUEST" (400)                     | Passed |
| 4  | Income greater than 0, debt not negative, age less than 16, returns status code "BAD_REQUEST" (400)                    | Failed |
| 5  | Risk decision "Negative", person's risk level is "Very High Risk", status code "OK" (200)                              | Passed |
| 6  | Risk decision "Positive", person's risk level is "High Risk", status code "OK" (200)                                   | Passed |
| 7  | Risk decision "Positive", person's risk level is "Medium Risk", status code "OK" (200)                                 | Passed |
| 8  | Risk decision "Positive", person's risk level is "Low Risk", status code "OK" (200)                                    | Passed |
| 9  | If person's risk level is "High Risk", risk periods are 3 and 6                                                        | Passed |
| 10 | If person's risk level is "Medium Risk", risk periods are 6, 9 and 12                                                  | Passed |
| 11 | If person's risk level is "Low Risk", risk periods are 12, 18, 24, 30, 36                                              | Passed |
| 12 | All fields are filled, "income" field is empty, returns status code "BAD_REQUEST" (400)                                | Passed |
| 13 | All fields are filled, "debt" field is empty, returns status code "BAD_REQUEST" (400)                                  | Failed |
| 14 | All fields are filled, "age" field is empty, returns status code "BAD_REQUEST" (400)                                   | Passed |
| 15 | All fields are filled, "employed" field is empty, returns status code "BAD_REQUEST" (400)                              | Failed |
| 16 | All fields are filled, "loanAmount" field is empty, returns status code "BAD_REQUEST" (400)                            | Passed |
| 17 | All fields are filled, "loanPeriod" field is empty, returns status code "BAD_REQUEST" (400)                            | Passed |