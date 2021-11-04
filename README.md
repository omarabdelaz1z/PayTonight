# PayTonight: Payment Gateway: 

It is now available at: https://paytonight.herokuapp.com/

## Documentation

## How to use

  1. Register in API through Portal https://paytonight.herokuapp.com/

  2. Login and Generate API Key for app

  3. Make a POST Call to https://paytonight.herokuapp.com/api/payment/checkout with the following headers:
  ```
    Content-Type: 'application/json',
    x-api-key: "<your API key>"
  ```
  and the following body:

  ```
    APP_ID:"<Your APP_ID>",
    amount: <Amount charged>
  ```
  4. A payment frame should return
  ![payment frame](https://drscdn.500px.org/photo/1039530682/m%3D900/v2?sig=c5e32389f509bc51ca74c3f07410a6261ef1d27dd9dafb87d97cc32fb00b1b81)

  5. Enter payment card credentials

  6. A response should return if payment credentials were accepted by bank.

## How to install
  1. create .env file with the following attributes:
 ```bash
  DB_PATH= # Path to mongoDB 
  PORT= # Port which the app runs
  SESSION_SECRET= # secret key for session.
  ```
2. run  ```npm install ```

3. run ``` node server.js``` 
