# Usr Mngt Assesment - David Camargo

This project, created by David Camargo, is a full-stack application that includes a frontend, backend, Redis for managing a temporary store, and Nginx for reverse proxying. The backend is built using NestJS, and the frontend is React, both served through Nginx.

## Table of Contents

- [Project Title](#project-title)
- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```

2. Start the application using Docker Compose:
   ```sh
   docker compose up --build
   ```

3. The application will be available at `http://localhost`.

## Usage

The application consists of the following services:

- **Redis**: Used for caching user data.
- **Backend**: A NestJS application that handles API requests.
- **Frontend**: The frontend application served through Nginx.
- **Nginx**: Acts as a reverse proxy for the frontend and backend services.

## Endpoints

### Users

- **GET /users**: Retrieve a paginated list of users.
  - Query Parameters:
    - `page`: Page number (default: 1)
    - `limit`: Number of users per page (default: 50)

- **POST /users**: Create a new user.
  - Body:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
    ```

- **DELETE /users/:id**: Delete a user by ID.

