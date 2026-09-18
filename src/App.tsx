import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";
import Dashboard from "./pages/Dashboard";
import SalesAnalytics from "./pages/SalesAnalytics";
import Products from "./pages/Products";
import Notifications from "./pages/Notifications";
import Login from "./pages/login";
import Orders from "./pages/Orders";

function ProtectedLayout() {
  const admin = localStorage.getItem("admin");

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar />

      <MobileSidebar />

      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/SalesAnalytics" element={<SalesAnalytics />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  const admin = localStorage.getItem("admin");

  return (
    <Routes>
      <Route
        path="/login"
        element={
          admin ? <Navigate to="/" replace /> : <Login />
        }
      />

      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  );
}