import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CarBuy from "./pages/CarBuy";
import CarRental from "./pages/CarRental";
import RefreshHandler from "./RefreshHandler";
import CarDetailPage from "./pages/CarDetailPage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RequestForm from "./components/common/RequestForm";
import AdminRoutes from "./pages/admin_panel/admin_routes/AdminRoutes";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import UsedCarSell from "./pages/UsedCarSaleForm";
import MainLayout from "./components/layout/MainLayout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const RequireAuth = ({ children, roles }) => {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (roles && !roles.includes(userRole))
      return <Navigate to="/home" replace />;
    return children;
  };

  return (
    <>
      <RefreshHandler
        setIsAuthenticated={setIsAuthenticated}
        setUserRole={setUserRole}
      />

      <Routes>
        <Route
          path="/admin-dashboard/*"
          element={
            <RequireAuth roles={["admin"]}>
              <AdminRoutes />
            </RequireAuth>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/car-sale" element={<CarBuy />} />
          <Route path="/car-rent" element={<CarRental />} />
          <Route path="/car-sale/:id/detailed" element={<CarDetailPage />} />
          <Route path="/car-rent/:id/detailed" element={<CarDetailPage />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/sell-a-car"
            element={
              <RequireAuth roles={["user", "admin"]}>
                <UsedCarSell />
              </RequireAuth>
            }
          />
          <Route
            path="/detailcarform"
            element={
              <RequireAuth roles={["user", "admin"]}>
                <RequestForm />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
