# PayTonight: Payment Gateway

### Instructions

```cmd
npm install
```

### Project Structure

```tree
|   .env
|   .eslintrc.js
|   .gitignore
|   package-lock.json
|   package.json
|   README.md
|   server.js
|
+---public
|   |   index.html
|   |
|   +---about
|   |       index.html
|   |
|   +---login
|   |       index.html
|   |
|   \---register
|           index.html
|
\---src
    +---controllers
    |       transaction.controller.js
    |       user.controller.js
    |
    +---middlewares
    |       auth.js
    |
    +---models
    |       Transaction.js
    |       User.js
    |
    +---routes
    |       transcation.router.js
    |       user.router.js
    |
    \---utils
            db.js
            middleware.js
```
