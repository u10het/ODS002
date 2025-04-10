#!/bin/bash

echo "🛠️  Rebuilding clean frontend folder..."

# Remove existing frontend folder if it exists
rm -rf frontend

# Create frontend and move into it
mkdir frontend && cd frontend

# Initialize Vite + React
npm create vite@latest . -- --template react
npm install

# Install required dependencies
npm install react-redux @reduxjs/toolkit react-router-dom

# Create folder structure
mkdir -p src/components/ui
mkdir -p src/pages
mkdir -p src/screens
mkdir -p src/redux/slices

# Create index.css
cat > src/index.css <<EOF
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

# Setup Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Add Tailwind config
cat > tailwind.config.js <<EOF
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# Overwrite main.jsx
cat > src/main.jsx <<EOF
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
EOF

# App.jsx
cat > src/App.jsx <<EOF
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppointmentBookingPage from "./pages/AppointmentBookingPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/book" element={<AppointmentBookingPage />} />
    </Routes>
  );
};

export default App;
EOF

# Redux Store
cat > src/redux/store.js <<EOF
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
EOF

# Auth Slice
cat > src/redux/slices/authSlice.js <<EOF
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, logout } = authSlice.actions;
export default authSlice.reducer;
EOF

# UI Components
cat > src/components/ui/button.jsx <<EOF
export const Button = ({ children, ...props }) => {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded" {...props}>
      {children}
    </button>
  );
};
EOF

cat > src/components/ui/card.jsx <<EOF
export const Card = ({ children }) => {
  return <div className="border p-4 rounded shadow">{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div className="mt-2">{children}</div>;
};
EOF

cat > src/components/ui/input.jsx <<EOF
export const Input = ({ ...props }) => {
  return <input className="border px-2 py-1 rounded w-full" {...props} />;
};
EOF

cat > src/components/ui/label.jsx <<EOF
export const Label = ({ children }) => {
  return <label className="block text-sm font-medium mb-1">{children}</label>;
};
EOF

cat > src/components/ui/select.jsx <<EOF
export const Select = ({ children, ...props }) => {
  return <select className="border px-2 py-1 rounded w-full" {...props}>{children}</select>;
};
EOF

# Pages
cat > src/pages/HomePage.jsx <<EOF
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Welcome to Online Doctor App</h1>
      <Link to="/book" className="text-blue-500 underline">Book Appointment</Link>
    </div>
  );
};

export default HomePage;
EOF

cat > src/pages/AppointmentBookingPage.jsx <<EOF
import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const AppointmentBookingPage = () => {
  return (
    <div className="p-8 max-w-md mx-auto">
      <Card>
        <h2 className="text-xl font-semibold">Book Appointment</h2>
        <CardContent>
          <Label>Name</Label>
          <Input placeholder="Enter name" />
          <Label className="mt-2">Date</Label>
          <Input type="date" />
          <Button className="mt-4">Submit</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentBookingPage;
EOF

# Sample screen
cat > src/screens/BookAppointmentScreen.jsx <<EOF
import React from "react";

const BookAppointmentScreen = () => {
  return <div>Book Appointment Screen</div>;
};

export default BookAppointmentScreen;
EOF

echo "✅ All files created!"
echo "📦 Installing final dependencies..."
npm install

echo "🚀 Starting development server..."
npm run dev
