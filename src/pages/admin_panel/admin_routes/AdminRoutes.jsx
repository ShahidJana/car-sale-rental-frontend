import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "../AdminDashboard";
import CarManagementRoutes from "../routes/CarManagementRoutes";
import UserManager from "../pages/ActiveUsersDetail";
import SoldCarDetails from "../pages/SoldCarsDetail";
import RentCarDetails from "../pages/RentedCarsDetail";
import { Dashboard } from "../pages/MainDashboard";
import Reviews from "../pages/ReviewsDetail";

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminDashboard />}>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="listed-cars/*" element={<CarManagementRoutes />} />
        <Route path="active-users" element={<UserManager />} />
        <Route path="sold-cars" element={<SoldCarDetails />} />
        <Route path="rented-cars" element={<RentCarDetails />} />
        <Route path="reviews" element={<Reviews />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
