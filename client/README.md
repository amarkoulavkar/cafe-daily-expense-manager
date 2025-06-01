# Cafe Daily Expense Manager

A full-stack application to manage daily expenses for a cafe.

## Project Structure

```
client/   # React frontend
server/   # Node.js/Express backend
```

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm
- MongoDB

---

## Setup Instructions

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd cafe-daily-expense-manager
```

---

### 2. Client Setup

```sh
cd client
npm install
npm run start
```

- The React app will start on [http://localhost:3000](http://localhost:3000) by default.

---

### 3. Server Setup

Open a new terminal window/tab:

```sh
cd server
npm install
```

#### Start MongoDB

Make sure MongoDB is running locally. You can start it with:

```sh
mongod
```

#### Start the server

```sh
npm run dev
```

- The backend server will start on [http://localhost:5000](http://localhost:5000) by default.

---

## Environment Variables

Create a `.env` file in the `server/` directory with the following content:

```
MONGO_URI=mongodb://localhost:27017/your-db-name
PORT=5000
```

Replace `your-db-name` with your desired MongoDB database name.

---

## Scripts

### Client

- `npm start` - Start the React development server
- `npm run build` - Build the React app for production

### Server

- `npm run dev` - Start the server with nodemon (auto-restarts on changes)
- `npm start` - Start the server normally

---

## License

MIT