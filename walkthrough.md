# Implementation Walkthrough - Estaty Real Estate Portal

We have successfully built the role-based backend from scratch using Node.js, Express, MongoDB, and Socket.io, and fully integrated it with the Vite + React frontend using Axios (with bearer interceptors) and socket event listeners.

---

## Technical Summary of Changes

### 1. Backend Structure (Node.js + MongoDB)
We created a modular Express app in the `Real-estate-backend` directory:
- **Database Configuration & Connection**: Created [db.js](file:///d:/Real%20Estate-Project/Real-estate-backend/config/db.js) using Mongoose.
- **Role-Based Authentication Middleware**: Created [auth.js](file:///d:/Real%20Estate-Project/Real-estate-backend/middleware/auth.js) to decode JWT tokens (`protect`) and enforce user role restrictions (`restrictTo`).
- **Data Models (MongoDB Schemas)**:
  - [User.js](file:///d:/Real%20Estate-Project/Real-estate-backend/models/User.js): Manages profiles, credentials (hashed via bcrypt), roles (`admin`, `vendor`, `agent`, `customer`), and user wishlists.
  - [Property.js](file:///d:/Real%20Estate-Project/Real-estate-backend/models/Property.js): Manages prices, tags, status approvals (`Pending`, `Approved`, `Rejected`), views, and relationships.
  - [Project.js](file:///d:/Real%20Estate-Project/Real-estate-backend/models/Project.js): Represents construction and pre-launch developments by builders.
  - [Ticket.js](file:///d:/Real%20Estate-Project/Real-estate-backend/models/Ticket.js): Manages support threads with embedded response sub-documents.
  - [Message.js](file:///d:/Real%20Estate-Project/Real-estate-backend/models/Message.js): Stores customer leads on properties.
  - [Category.js](file:///d:/Real%20Estate-Project/Real-estate-backend/models/Category.js): Stores property category specifications (e.g. Apartment, House, Shop).
  - [Amenity.js](file:///d:/Real%20Estate-Project/Real-estate-backend/models/Amenity.js): Stores property listing amenities checklist items (e.g. Mosque, Gym, Pool).
  - [Country.js](file:///d:/Real%20Estate-Project/Real-estate-backend/models/Country.js), [State.js](file:///d:/Real%20Estate-Project/Real-estate-backend/models/State.js), [City.js](file:///d:/Real%20Estate-Project/Real-estate-backend/models/City.js): Store geographical listing boundaries.
- **Separate Controllers and Routers for Each Role**:
  - **Auth**: [authController.js](file:///d:/Real%20Estate-Project/Real-estate-backend/controllers/authController.js) & [authRoutes.js](file:///d:/Real%20Estate-Project/Real-estate-backend/routes/authRoutes.js) (Login, signup, edit profile, change password).
  - **Admin**: [adminController.js](file:///d:/Real%20Estate-Project/Real-estate-backend/controllers/adminController.js) & [adminRoutes.js](file:///d:/Real%20Estate-Project/Real-estate-backend/routes/adminRoutes.js) (Dashboard statistics, approvals, user lists, ticket threads).
  - **Vendor**: [vendorController.js](file:///d:/Real%20Estate-Project/Real-estate-backend/controllers/vendorController.js) & [vendorRoutes.js](file:///d:/Real%20Estate-Project/Real-estate-backend/routes/vendorRoutes.js) (Property/Project CRUD, leads monitoring, active statistics).
  - **Agent**: [agentController.js](file:///d:/Real%20Estate-Project/Real-estate-backend/controllers/agentController.js) & [agentRoutes.js](file:///d:/Real%20Estate-Project/Real-estate-backend/routes/agentRoutes.js) (Leads overview, assigned listings, messages).
  - **Customer**: [customerController.js](file:///d:/Real%20Estate-Project/Real-estate-backend/controllers/customerController.js) & [customerRoutes.js](file:///d:/Real%20Estate-Project/Real-estate-backend/routes/customerRoutes.js) (Public properties, detail view counts, wishlist additions, support tickets, property inquiries).
  - **Specifications**: [specController.js](file:///d:/Real%20Estate-Project/Real-estate-backend/controllers/specController.js) & [specRoutes.js](file:///d:/Real%20Estate-Project/Real-estate-backend/routes/specRoutes.js) (Admin specifications management).
- **Socket.io bootstrap**: Configured [server.js](file:///d:/Real%20Estate-Project/Real-estate-backend/server.js) to open sockets for support chat rooms (`join_ticket`) and direct property message forwarding (`join_user`).
- **Database Seeder**: Updated [seed.js](file:///d:/Real%20Estate-Project/Real-estate-backend/seed.js) to automatically populate MongoDB with standard mock data, user accounts, categories, amenities, and locations.

---

### 2. Frontend Integration (Vite + React)
- **Axios Configuration**: Configured [axiosInstance.js](file:///d:/Real%20Estate-Project/Real-estate-frontend/src/api/axiosInstance.js) with interceptors to automatically append JWT bearer headers and redirect expired sessions.
- **Global Auth State Context**: Created [AuthContext.jsx](file:///d:/Real%20Estate-Project/Real-estate-frontend/src/context/AuthContext.jsx) to expose active session parameters and wrapped it in [App.jsx](file:///d:/Real%20Estate-Project/Real-estate-frontend/src/App.jsx).
- **Login Pages**: Updated [LoginForm.jsx](file:///d:/Real%20Estate-Project/Real-estate-frontend/src/components/login/LoginForm.jsx) and [CustomerLogin.jsx](file:///d:/Real%20Estate-Project/Real-estate-frontend/src/pages/CustomerLogin.jsx) to handle live auth tokens and support customer signup.
- **Dashboards**:
  - [CustomerDashboard.jsx](file:///d:/Real%20Estate-Project/Real-estate-frontend/src/pages/CustomerDashboard.jsx) loads wishlist, tickets, and profile.
  - [VendorDashboard.jsx](file:///d:/Real%20Estate-Project/Real-estate-frontend/src/pages/VendorDashboard.jsx) loads properties, projects, and handles creations.
  - [AgentDashboard.jsx](file:///d:/Real%20Estate-Project/Real-estate-frontend/src/pages/AgentDashboard.jsx) loads properties and assigned clients.
  - [AdminDashboard.jsx](file:///d:/Real%20Estate-Project/Real-estate-frontend/src/pages/AdminDashboard.jsx) loads total counts and approvals.
- **Subcomponents**: Configured [VendorEditProfileTab.jsx](file:///d:/Real%20Estate-Project/Real-estate-frontend/src/components/vendor/VendorEditProfileTab.jsx), [VendorChangePasswordTab.jsx](file:///d:/Real%20Estate-Project/Real-estate-frontend/src/components/vendor/VendorChangePasswordTab.jsx), and [CustomerChangePasswordTab.jsx](file:///d:/Real%20Estate-Project/Real-estate-frontend/src/components/customer/CustomerChangePasswordTab.jsx) to sync edits.
- **Real-Time Websocket chat**: Integrated socket connections in:
  - [CustomerTicketDetailView.jsx](file:///d:/Real%20Estate-Project/Real-estate-frontend/src/components/customer/CustomerTicketDetailView.jsx) (Support tickets chat updates).
  - [VendorPropertyMessagesTab.jsx](file:///d:/Real%20Estate-Project/Real-estate-frontend/src/components/vendor/VendorPropertyMessagesTab.jsx) (Inquiry messages update).

---

## Quick Start Instructions

Since terminal permissions were restricted during installation, please run the following steps manually to launch the app:

### Step 1: Install Backend dependencies
Open a terminal in the backend directory and execute:
```bash
cd d:\Real Estate-Project\Real-estate-backend
npm install
```

### Step 2: Seed the database
Make sure your local MongoDB instance is running on port `27017` (configured in `.env`), and run:
```bash
npm run seed
```
> [!NOTE]
> This creates default accounts with password **`password123`**:
> - Admin: `leonard@estacy.com`
> - Vendor: `oscar@estacy.com`
> - Agent: `rendall@estacy.com`
> - Customer: `sarah.j@gmail.com`

### Step 3: Run the servers
Start the backend Express/Socket.io server:
```bash
npm run dev
```

Start the frontend Vite server:
```bash
cd d:\Real Estate-Project\Real-estate-frontend
npm install
npm run dev
```
Now, you can log in to each dashboard with live database records, create properties, trigger approvals, submit support tickets, and chat in real-time!
