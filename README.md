# Simple stateless authentication API (no refresh token)

## How to use it

Make sure to create a .env file and look in the .env.example file to see the required environment variables:
  - MONGODB_CONNECT - The url to connect to your mongodb database.
  - TOKEN_SECRET - A random key to encrypt your token.
  - PORT - The port your application will run on.
  - TOKEN_EXPIRES_IN - Token expiration time (1s = 1 second, 1h = 1 hour, 1d = 1 day)
    defautl value = 1h.

## Endpoints

### Unprotected routes (no authentication required)

/register(post) - To register a new user.
  - Receives an object(user information) which must contain email and password properties. Return a token and the registered user.

/auth(post) - To authenticate a user(login)
  - Receives an object(user information) with email and password properties. Return a token and the email owner user.

/email-availability(post) - To check the availability of an email.
  - Receives an object with email propertie. if the email exists in the database it returns the email, otherwise it returns false.

### Protected routes (authentication required)

/user(get) - For user information.
  - Returns the user information. Theres is no need of req parameters, the information will be taken from the token.

/update-user(put) - To change user information(you can't change password or email)
  - Receives an object with key and value properties, the key is the propertie you want to change, and the value is the new value the propertie will receive.

<pre>
    Ex:
      {
        name: 'new name'
      }
    In this example the user name will be changed to 'new name'
</pre>
