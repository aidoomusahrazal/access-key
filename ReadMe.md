# Access Key Manager

Access Key Manager is a web application developed for Micro-Focus Inc. to facilitate the management and purchase of access keys for their multitenant school management platform. This application allows school IT personnel to manage access keys and provides administrative functionalities for Micro-Focus admins.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Design](#database-design)
- [Contributing](#contributing)
- [License](#license)

## Features

### School IT Personnel
1. Signup and login with email and password, with account verification.
2. Reset password feature to recover lost passwords.
3. View a list of all access keys: active, expired, or revoked.
4. View details of each access key including status, date of procurement, and expiry date.
5. Restrictions to prevent obtaining a new key if an active key already exists.

### Micro-Focus Admin
1. Login with email and password.
2. Manually revoke keys.
3. View all keys generated on the platform, along with their status, date of procurement, and expiry date.
4. Access endpoint to retrieve the active key details for a given school email.

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Styling: CSS, Bootstrap

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/aidoomusahrazal/access-key.git
    cd access-key-manager
    ```

2. **Backend Setup:**

    - Navigate to the `server` directory:

        ```bash
        cd backend
        ```

    - Install dependencies:

        ```bash
        npm install
        ```

    - Create a `.env` file in the `server` directory and add the following environment variables:

        ```env
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        ```

    - Start the backend server:

        ```bash
        npm start
        ```

3. **Frontend Setup:**

    - Navigate to the `client` directory:

        ```bash
        cd ../client
        ```

    - Install dependencies:

        ```bash
        npm install
        ```

    - Start the frontend server:

        ```bash
        npm start
        ```

4. **Open your browser and navigate to:**

    ```
    http://localhost:3000
    ```

## Usage

1. **School IT Personnel:**
    - Sign up and verify your account.
    - Log in using your credentials.
    - View and manage your access keys.

2. **Micro-Focus Admin:**
    - Log in using admin credentials.
    - Revoke access keys.
    - View all access keys and their details.
    - Use the provided endpoint to retrieve active key details.

## API Endpoints

- **POST /api/register** Register a new user.
- **POST /api/login** Login for users.
- **GET /api/verify/:token** Verify Email.
- **POST /api/forget-password** Forget password
- **POST /api/reset-password/:token** Reset password for users.
- **GET /api/get-access-keys:** Retrieve all access keys (admin only).
- **POST /api/get-access-key** Generate a new access key.
- **Get /api/revoke-access-key/:id** Revoke an access key (admin only).
- **GET /api/get-access-key/:email** Retrieve active key details for a given school email.

## Database for the admin

To Login in to the dashboard, use the credentials below

- **email** aidoomusa18ab0614@gmail.com
- **password** 12345678

## Contributing

We welcome contributions to improve this project. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with descriptive messages.
4. Push your branch and create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
