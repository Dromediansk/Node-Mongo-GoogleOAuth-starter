## Node TS Mongo OAuth2.0 Starter Pack

### Tech stack

- Node.js & Express.js
- Typescript
- Mongo DB
- Google OAuth 2.0

### Project details

Initial starter for backend with Google authentication. An example is providing a page with login and 2 GET endpoints, for which the user is required to be logged in. If the user is logged in, a session is created and stored on the client side.

- Implemented basic security using [Helmet](https://www.npmjs.com/package/helmet) and cors policy.
- Google OAuth2 is included using [Passport](https://www.npmjs.com/package/passport)
- Storing user sessions on the client with a [cookie-session](https://www.npmjs.com/package/cookie-session)
- CRUD operations for `users` and `notes`

### Database details

- For data, the project is using the non-relational database Mongo. 
- There are created 2 collections - `users` and `notes`.
- Each `user` can have multiple `notes`.

### Setup

- setting up Mongo database on [Mongodb.com](https://www.mongodb.com/)
- setting up Google OAuth2 client to get CLIENT_ID and CLIENT_SECRET on [Google console](https://console.cloud.google.com/)
- add required environment variables according to `.env.example`
