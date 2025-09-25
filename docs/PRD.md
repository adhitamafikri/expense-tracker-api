# The Expense Tracker API - Phase 1

## Features

### User Management

- User Registration
- User Login

### Category Management - Admin

- CRUD income category management
- CRUD expense category management

### Expense Management - User

- Input income -> amount + category
- Input expense -> amount + category
- Delete income
- Delete expense
- See incomes per category
- See expenses per category
- See overall incomes and expenses per month

## Endpoints

### Auth

- **login**
  - path: `/auth/login`
  - requestBody:

  ```typescript
  {
    phone: string;
    password: string;
    loginFor: string;
  }
  ```

### Admin

### User
