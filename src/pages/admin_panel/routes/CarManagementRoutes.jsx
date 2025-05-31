import React from "react";
import { Routes, Route } from "react-router-dom";
import CarDashboard from "../pages/Car_Management/CarDashboard";
import ListedCarDetails from '../pages/ListedCarsDetail'
import CarListingandEditingForm from "../pages/Car_Management/CarListingandEditingForm";

function CarManagementRoutes() {
  return (
    <Routes>
      <Route element={<CarDashboard />}>
        <Route path="/" element={<ListedCarDetails />} />
        <Route path="/new" element={<CarListingandEditingForm isEdit={false} />} />
        <Route path="/:id/edit" element={<CarListingandEditingForm isEdit={true} />} />
      </Route>
    </Routes>
  );
}

export default CarManagementRoutes;
