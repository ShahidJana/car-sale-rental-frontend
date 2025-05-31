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
import BuyandRentForm from "./components/common/BuyandRentForm";
import AdminRoutes from "./pages/admin_panel/admin_routes/AdminRoutes";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import UsedCarSell from "./pages/UsedCarSaleForm";

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
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Admin Route */}
        <Route
          path="/admin-dashboard/*"
          element={
            <RequireAuth roles={["admin"]}>
              <AdminRoutes />
            </RequireAuth>
          }
        />

        {/* Protected User/Admin Routes */}
        <Route
          path="/home"
          element={
            <RequireAuth roles={["user", "admin"]}>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/car-sale"
          element={
            <RequireAuth roles={["user", "admin"]}>
              <CarBuy />
            </RequireAuth>
          }
        />
        <Route
          path="/sell-a-car"
          element={
            <RequireAuth roles={["user", "admin"]}>
              <UsedCarSell />
            </RequireAuth>
          }
        />
        <Route
          path="/car-rent"
          element={
            <RequireAuth roles={["user", "admin"]}>
              <CarRental />
            </RequireAuth>
          }
        />
        <Route
          path="/car-sale/:id/detailed"
          element={
            <RequireAuth roles={["user", "admin"]}>
              <CarDetailPage />
            </RequireAuth>
          }
        />
        <Route
          path="/car-rent/:id/detailed"
          element={
            <RequireAuth roles={["user", "admin"]}>
              <CarDetailPage />
            </RequireAuth>
          }
        />
        <Route
          path="/detailcarform"
          element={
            <RequireAuth roles={["user", "admin"]}>
              <BuyandRentForm />
            </RequireAuth>
          }
        />
        <Route
          path="/contact-us"
          element={
            <RequireAuth roles={["user", "admin"]}>
              <Contact />
            </RequireAuth>
          }
        />
        <Route
          path="/about-us"
          element={
            <RequireAuth roles={["user", "admin"]}>
              <About />
            </RequireAuth>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <RequireAuth roles={["user", "admin"]}>
              <TermsOfService />
            </RequireAuth>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <RequireAuth roles={["user", "admin"]}>
              <PrivacyPolicy />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;

// import React, { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import CarBuy from "./pages/CarBuy";
// import CarRental from "./pages/CarRental";
// import RefreshHandler from "./RefreshHandler";
// import CarDetailPage from "./pages/CarDetailPage";
// import Contact from "./pages/Contact";
// import About from "./pages/About";
// import TermsOfService from "./pages/TermsOfService";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import BuyandRentForm from "./components/common/BuyandRentForm";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const PrivateRoute = ({ element }) => {
//     return isAuthenticated ? element : <Navigate to="/login" replace />;
//   };

//   return (
//     <>
//       <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

//       <Routes>
//         <Route path="/" element={<Navigate to="/home" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/home" element={<PrivateRoute element={<Home />} />} />
//         <Route
//           path="/car-sale"
//           element={<PrivateRoute element={<CarBuy />} />}
//         />
//         <Route
//           path="/car-rent"
//           element={<PrivateRoute element={<CarRental />} />}
//         />

//         <Route
//           path="/car-sale/:id/detailed"
//           element={<PrivateRoute element={<CarDetailPage />} />}
//         />
//         <Route
//           path="/car-rent/:id/detailed"
//           element={<PrivateRoute element={<CarDetailPage />} />}
//         />
//         <Route
//           path="/detailcarform"
//           element={<PrivateRoute element={<BuyandRentForm />} />}
//         />
//         <Route
//           path="/contact-us"
//           element={<PrivateRoute element={<Contact />} />}
//         />
//         <Route
//           path="/about-us"
//           element={<PrivateRoute element={<About />} />}
//         />
//         <Route
//           path="/terms-of-service"
//           element={<PrivateRoute element={<TermsOfService />} />}
//         />
//         <Route
//           path="/privacy-policy"
//           element={<PrivateRoute element={<PrivacyPolicy />} />}
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;
