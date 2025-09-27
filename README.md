# 📌 Square Loyalty Challenge

A full-stack implementation of the **Square Loyalty API Challenge**.  
The project includes:

- **Frontend:** Next.js + TypeScript + TailwindCSS  
- **Backend:** Node.js (Express) with in-memory cache (Node Cache) to simulate/mimic Square API  

---

## 🚀 Features

- 🔑 **Login** using phone number (E.164 format, e.g. `+14155551234`)  
- 📊 **Dashboard** displaying loyalty balance and activity history  
- ➕ **Earn Points** by entering an order ID  
- 🎁 **Redeem Points** either by entering points **or** selecting a reward  
- 📜 **Activity Table** showing **EARN**, **REDEEM**, and **ADJUSTMENT** history (scrollable with sticky headers)  
- 🔒 **Protected Routes** (Dashboard requires login) using Next.js middleware  
- 🚪 **Logout** (clears session and cookie)  

---

## 📁 Project Structure
```
square-loyalty/
├── backend/             # Express server (mock/proxy API)
│   ├── index.js
│   ├── package.json
│   ├── .env             # Backend secrets (ignored in git)
│   └── .gitignore
├── frontend/            # Next.js app (TypeScript, Tailwind)
│   ├── app/
│   ├── components/
│   ├── package.json
│   ├── .env.local       # Frontend config (ignored in git)
│   └── .gitignore
└── README.md

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
npm run dev
````

### 🔑 Environment Variables (backend/.env)

```
PORT=5000
```

* Backend will serve **mock data** using Node Cache.

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 🔑 Environment Variables (frontend/.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🖥️ Running Locally

1. Start the backend:

   ```bash
   cd backend
   npm run dev
   ```

   Runs at [http://localhost:5000](http://localhost:5000)

2. Start the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

   Runs at [http://localhost:3000](http://localhost:3000)

---

## 🔒 Authentication & Middleware

* On login → backend returns a `loyalty_account_id`.
* Frontend stores it in **localStorage** and a **cookie**.
* Middleware (`middleware.ts` in frontend root) checks the cookie to protect `/dashboard`.
* On logout → cookie + localStorage are cleared → user is redirected to `/`.

---

## 📊 Mock Data

* Example Loyalty Account:

  ```json
  {
    id: 'acc-123',
    phone_number: '+14155551234',
    balance: 10,
    program_id: 'program-1',
  }
  ```

* Example Activity History:

  ```json
  [
    {
      "id": "act-1",
      "type": "EARN",
      "points": 10,
      "created_at": "2025-09-01T10:00:00Z",
      "order_id": "ord-1234",
      "program_id": "program-1"
    },
    {
      "id": "act-2",
      "type": "REDEEM",
      "points": -5,
      "created_at": "2025-09-05T09:30:00Z",
      "reward_id": "reward-1"
    },
    {
      "id": "3",
      "type": "ADJUSTMENT",
      "points": 5,
      "created_at": "2025-09-15T19:30:00Z",
      "description": "Manual balance correction"
    }
  ]

  ```
---

## 🧑‍💻 Development Notes

* Built with **React functional components + hooks**
* API requests via **Axios** or native **fetch**
* **Loading states** + **error handling** implemented
* UI styled with **TailwindCSS** for rapid prototyping
* **Lucide Icons** used for a modern look

---

## 🚀 Deployment

* **Frontend:** Vercel / Netlify (optimized for Next.js)
* **Backend:** Render / Railway / Heroku

Update your frontend `.env.local`:

```
NEXT_PUBLIC_API_URL=https://your-deployed-backend.com/api
```

---

## 📌 License

This project is for **coding challenge purposes**.
Not intended for production use with real customer data.

---
