# Burger Cafe

Burger Cafe is a React and TypeScript web application for building and ordering custom burgers.

The project demonstrates user authentication, protected routes, REST API integration, state management, drag-and-drop functionality, order processing, and user account features.

## Live Demo

https://elena-front.github.io/burger_cafe/

## Demo Access

To explore authenticated features such as the user profile and order history, use the demo account:

**Email:** demo@example.com  
**Password:** demo-password

> Replace these credentials with the actual demo account you create for the project.

## Features

- User registration and login
- Token-based authentication
- Access and refresh token handling
- Protected routes for authenticated users
- Burger constructor with drag-and-drop ingredients
- REST API integration
- Order creation
- Order feed
- User profile management
- Personal order history
- Ingredient details
- Password recovery flow
- Logout functionality

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- React Router
- REST API
- HTTP / JSON
- React DnD
- WebSocket
- CSS Modules
- Jest
- Cypress
- Webpack
- Git / GitHub

## Authentication

The application uses token-based authentication.

After login:

- the access token is stored in `localStorage`;
- the refresh token is used to renew an expired session;
- authenticated users can access protected routes;
- users can view and update their profile;
- users can access their personal order history.

The application also supports registration, logout, and password recovery.

## API Integration

The frontend communicates with an external REST API.

The API is used for:

- user registration and authentication;
- retrieving and updating user profile data;
- loading burger ingredients;
- creating orders;
- retrieving order information.

The project includes handling of HTTP requests, JSON responses, authentication headers, and token refresh.

## Routing

The application uses React Router and includes both public and protected routes.

Examples:

- `/` — burger constructor
- `/login` — login page
- `/register` — registration
- `/profile` — protected user profile
- `/profile/orders` — protected order history
- `/feed` — order feed

Authenticated users are redirected away from login and registration pages, while unauthenticated users are redirected to the login page when attempting to access protected routes.

## Running Locally

### Requirements

- Node.js
- npm or Yarn

### Installation

Clone the repository:

```bash
git clone https://github.com/elena-front/burger_cafe.git
cd burger_cafe
