## Node TS Mongo OAuth2.0 Starter Pack

### Tech stack

- Node.js & Express.js
- Typescript
- Mongo DB
- Google OAuth 2.0

### Project details

Initial starter for backend with authentication. An example is providing a simple page with login and 2 simple GET endpoints, for which the user is required to be logged in. If the user is logged in, a session is created and stored on the client side.

- Implemented basic security using [Helmet](https://www.npmjs.com/package/helmet), cors and SSL certificate for using HTTPS protocol.
- Google OAuth2 is included using [Passport](https://www.npmjs.com/package/passport)
- Storing user sessions on the client with a [cookie-session](https://www.npmjs.com/package/cookie-session)
- Using non-relational database Mongo. In this example, there are created 2 collections - `users` and `notes`.

### Requirements

- setting up Mongo database on [Mondodb.com](https://www.mongodb.com/)
- setting up Google OAuth2 client to get CLIENT_ID and CLIENT_SECRET
- SSL certificate can be generated locally for development purposes
- add required environment variables according to `.env.example`
