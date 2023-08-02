# Flex-Auth
This is a flexible authentication system built using React, Express, and MongoDB. The authentication methods allowed are:
1. Email & Password
2. MetaMask Web3

## Installation
To run the Flex-Auth on your local system, follow these steps:
1. Clone the repository:
    ```
    git clone https://github.com/pratham-jaiswal/flexible-authentication-system.git
    ```
2. Install dependencies for client, and server side:
    ```
    cd client
    npm install
    cd ../server
    npm install
    ```
3. Create a `.env` file in the root directory and refer to `.env-example`
4. Run the app:
    ```
    cd client
    npm start
    cd ../server
    npm start
    ```
5. The app will be accessible at http://localhost:3000.

## Technologies Used
**Client-Side:**
- React
- React Router DOM
- React Scripts
- Web3.js

**Server-Side:**
- Express.js
- MongoDB
- Mongoose
- Argon2
- JSON Web Tokens
- Cors
- Express Mongo Sanitize
- Helmet
- RateLimit
- CookieParser
- Dotenv

## Overview
Flex-Auth is a flexible authentication system that allows users to register, log in, and log out using their email and password or their MetaMask wallet address. The application provides a user-friendly UI with validation checks to ensure secure registration and login processes. Users can access their dashboard, which displays their name and email, or MetaMask wallet address after a successful login.

The application consists of two main parts: the client-side and the server-side.

**Client-Side:**
- The client-side is built using React and is responsible for rendering the UI and handling user interactions.
- The entry point for the client-side is `index.js`, which renders the `App` component.
- The `App` component (`App.js`) sets up routing for the different pages using React Router DOM.
- The `Home` provides buttons to navigate to the Register, Login, and MetaMask login pages.
- The `Login` and `Register` pages handle user authentication with email and password.
- The `MetaMask` component provides the ability to log in using a MetaMask wallet address.
- The `Dashboard` page displays user details after successful login.

**Server-Side:**
- The server-side is built using Express.js and is responsible for handling API requests and database interactions.
- The entry point for the server-side is `server.js`.
- The server uses MongoDB for data storage and `Mongoose` to interact with the database.
- User authentication is implemented using `Argon2` for password hashing and `JSON Web Tokens (JWT)` for creating and verifying tokens.
- The server sets up various middleware for security purposes, such as CORS, rate-limiting, helmet, and cookie parsing.

## Using the App
**Home Page**
- The home page (`Home.js`) is the landing page of the application.
- It provides buttons to navigate to the Register, Login, and MetaMask login pages.

**Register Page**
- The register page (`Register.js`) allows users to create a new account.
- Users need to provide their name, email, and password.
- Validation checks are performed for the email and password fields, showing real-time feedback based on the input.

**Login Page**
- The login page (`Login.js`) allows users to log in using their email and password.
- Users need to provide their registered email and password.
- Validation checks are performed for the email and password fields, showing real-time feedback based on the input.

**MetaMask Login**
- The MetaMask component (`metamask.js`) allows users to log in using their MetaMask wallet address.
- When the "Connect with MetaMask" button is clicked, MetaMask will open, prompting the user to connect their wallet.
- Once the connection is successful, the server verifies the MetaMask wallet address, and if it is registered, the user is logged in.
- If the user is already logged in with either email/password or MetaMask, they will be redirected to the Dashboard page.

**Dashboard Page**
- The dashboard page (`Dashboard.js`) displays user details after successful login.
- It shows the user's name and email or MetaMask wallet address.
- The user can log out by clicking the "Logout" button.

## API Endpoints
The server provides the following API endpoints for user registration, login, metamask login and logout:
- `POST /api/register`: Registers a new user with name, email, and password. Returns a JWT token upon successful registration.
- `POST /api/login`: Logs in a user with email and password. Returns a JWT token upon successful login.
- `POST /api/metamask`: Logs in a user with a MetaMask wallet address. Returns a JWT token upon successful login.
- `GET /api/data`: Retrieves user data (name, email, MetaMask address) after successful authentication.
- `POST /api/logout`: Logs out the user and clears the JWT token.

The API endpoints are protected using JWT authentication, meaning the user must be logged in to access the `/api/data` endpoint.

## Demo
<video controls>
  <source src="./Flex-Auth_App_PrathamJaiswal.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>