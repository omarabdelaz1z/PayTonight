# PayTonight: Payment Gateway: 

## Documentation

## How to use

  1. Register in API through Portal https://paytonight.herokuapp.com/

  2. Login and generate API credentials, make sure to save APP_KEY or you will need to generate another one (notice that APP ID doesn't change so)

  3. Make a POST Call to /api/payment/checkout with the following headers:
  ```bash
    Content-Type: 'application/json',
    x-api-key: "<your API key>"
  ```
  and the following body:

  ```bash
    APP_ID:"<Your APP_ID>"
    amount: <Amount charged>
  ```
  4. The page will be redirected to /api/payment/iframe?token=token with the following iframe
  ![payment frame](https://github.com/omarabdelaz1z/PayTonight/pull/public/assets/img/iframe.png)

  5. Enter payment card credentials

  6. A response should return if payment credentials were accepted by bank.

Example API request would be
```js
const PAYMENT_ENDPOINT = "https://paytonight.herokuapp.com/api/payment/checkout";

const body = JSON.stringify({
  APP_ID: "APP_ID",
  amount: amount,
});

const options = {
  method: "POST",
  headers: {
    "x-api-key": "APP_KEY",
    "Content-Type": "application/json",
  },
  body,
};

fetch(PAYMENT_ENDPOINT, options)
  .then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
    }
  })
  .catch(function (err) {
    console.info(err + " url: " + url);
  });
```

### You could also use API calls to register or login
1. Make a POST request to /auth/register
with the following body:
```bash
username:"<username>"
password:"<password>"
email:"<email>"
organization:"<organization>"
```
##### please note that all fields are required. Username & password lengths should be >=6

2. Make a POST request to /auth/login 
with the following body:

```bash
username:"<username>"
password:"<password>"
```
##### After successful login you should be able to view the dashboard and make the call to the payment gateway
## How to install
  1. create .env file with the following attributes:
 ```bash
  DATABASE_URL= # Path to mongoDB 
  PORT= # Port which the app runs
  SESSION_SECRET= # Secret key for session.
  JWT_ACCESS_TOKEN_SECRET= # json webtoken secret
  JWT_REFRESH_TOKEN_SECRET=# 
  PAYMENT_GATEWAY_ID= # An ID supplied by banking app
  BANK_ENDPOINT= # A banking endpoint used for transactions
  BANK_USERNAME= # A username supplied by banking app
  BANK_PASSWORD= # A password supplied by banking app
  PAYMENT_ENDPOINT= # This app's deployment url 
  ```
2. run  ```npm install ```

3. run ``` node server.js``` 
## Development
- run ```npm run dev```