# Query Tracker Backend 🧠

A robust, enterprise-grade server-side architecture for centralized query and ticket management.

## 🛠️ Technology Stack
- **Environment:** [Node.js](https://nodejs.org/)
- **Framework:** [Express](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- **Authentication:** [Cookie-Parser](https://github.com/expressjs/cookie-parser) for secure sessions
- **Validation:** [Joi](https://joi.dev/) for data integrity
- **Security:** [Helmet](https://helmetjs.github.io/) + [CORS](https://github.com/expressjs/cors) + [Rate Limiting](https://github.com/n642/express-rate-limit)
- **Logging:** Custom Winston-powered logger for system activity tracking.

## 🏗️ System Architecture
The backend follows a strict **Controller-Router-Model (CRM)** pattern for clean separation of concerns.

### 🛂 Authentication Middleware
- **Protocol:** `authenticateUser`
- **Function:** Intercepts incoming requests to verify `email` and `role` cookies. It attaches the user's identity to `req.user` for downstream access control.

### 🛰️ API Endpoint Reference

#### 👤 User Management
- `POST /user/register`: Registers a new network operator (default role: `user`).
- `POST /user/login`: Validates credentials and sets secure session cookies.

#### 🎫 Ticket Lifecycle
- `GET /user/getTickets`: Retrieves all network missions. Admins and regular users can view all, but filters can be applied via query parameters.
- `POST /user/createTicket`: Initializes a new query data packet with operator metadata.
- `PUT /user/updateTicket/:id`: Logic-controlled update:
    - **Admins/Owners**: Can modify core subject/description and status.
    - **General Users**: Can inject solutions to any existing ticket.
- `DELETE /user/deleteTicket/:id`: Purges a ticket record (Restricted to Admins or Owners).

#### 🛡️ Admin Operations
- `GET /admin/users`: Lists all registered operators (excluding sensitive info).
- `PUT /admin/users/:id/role`: Escalates or de-escalates operator privilege levels.
- `DELETE /admin/users/:id`: Purges a user account from the central database.

## 🛠️ Installation & Setup
1. Create a `.env` file from `.env.example`.
2. Configure `MONGO_URI` and `PORT`.
3. `npm install`
4. `npm start` (or `npm run dev` for nodemon development).
