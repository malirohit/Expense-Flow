# Expense-Flow 💸

A full-stack **Expense Tracker Web Application** built with the **MERN Stack** — **MongoDB, Express, React, Node.js** — featuring **JWT authentication**, CRUD expense management, and **data visualization**.

Track your personal expenses, view spending analytics, and manage categories with a responsive and intuitive UI.

---

## 🚀 Features

### 🔐 Authentication
- **User Signup & Login** with secure password hashing  
- JSON Web Token (JWT) based authentication  
- Protected routes for expense operations  

### 💰 Expense Management
- Add a new expense (Category, Amount, Comments)
- View expenses in a sortable table (latest first)
- Edit existing expenses
- Delete expenses

### 📊 Visual Analytics
- Category-wise expense distribution
- Dynamic pie chart and analytics dashboard

### ⚡ Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | React.js (Vite) |
| Styling & UI | Tailwind CSS + UI components |
| API | Axios |
| State & Server Sync | TanStack Query (React Query) |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT + bcrypt |

---

## 📁 Folder Structure

Expense-Flow/
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── .env
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── pages/
│ │ ├── types/
│ │ ├── api.ts
│ │ └── App.tsx
│ ├── index.html
│ └── .env
├── .gitignore
└── README.md


---

## 🛠️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/malirohit/Expense-Flow.git
cd Expense-Flow

🧱 Backend Setup

Install Dependencies

cd backend
npm install

Configure Environment Variables

Create a .env file in backend/ with:

PORT=5002
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret

Run Backend 

npm run dev

Server will start at http://localhost:5002

💻 Frontend Setup
Install Dependencies
cd frontend
npm install

Configure Environment Variables

In frontend/, create .env:

VITE_BACKEND_URL=http://localhost:5000/api

Run Frontend
npm run dev


App will open at http://localhost:3000 (or printed port)

🔗 API Endpoints
Auth
| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| POST   | `/api/user/signup` | Create new user |
| POST   | `/api/user/login`  | Login user      |


Expenses

All expense routes require Authorization: Bearer <token>

| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| POST   | `/api/user/signup` | Create new user |
| POST   | `/api/user/login`  | Login user      |


📦 State Management & Data Fetching

We use:

Axios for API requests

TanStack Query (React Query) for caching and automatic refetching

Expense list, totals, and analytics update automatically after mutations

📈 Visual Analytics

Expenses are displayed in a pie chart showing category distribution using:

Recharts

Derived stats such as:

Total expenses

Top spending categories

Percentage share

🎨 UI & UX

Clean, responsive layout

Dialogs for adding/editing expenses

Confirmation on delete

Friendly error validation

📌 Notes

Expenses are stored per authenticated user.

React components are typed using TypeScript interfaces.

Category constants are maintained for UI consistency.

📍 Future Improvements

✨ Add date filters, monthly breakdown
✨ Export expenses (CSV / PDF)
✨ Recurring transactions
✨ Dark mode toggle
✨ Deployment scripts (Vercel / Render)

🤝 Contributing

Feel free to:

Open issues

Submit pull requests

Suggest features

💬 Contact

Created by Rohit Mali
⭐ Enjoyed the project? Star the repository!

📜 License

This project is open-source and available under the MIT License.