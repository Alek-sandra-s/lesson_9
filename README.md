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
