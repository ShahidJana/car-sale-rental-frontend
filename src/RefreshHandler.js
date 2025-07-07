import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = "http://localhost:8080/api";

function RefreshHandler({ setIsAuthenticated, setUserRole }) {
  const location = useLocation();
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const loggedInUsername = localStorage.getItem("loggedInUser");
    if (!loggedInUsername) return;

    try {
      const { data: users } = await axios.get(
        `${API_URL}/user_auth/getAllUsers`
      );
      const currentUser = users.find((user) => user.name === loggedInUsername);
      setUserRole(currentUser.role === "admin" ? "admin" : "user");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      fetchUserData();
      if (location.pathname === "/login" || location.pathname === "/signup") {
        navigate("/", { replace: false });
      }
    }
  }, [location, navigate, setIsAuthenticated, setUserRole]);

  return null;
}

export default RefreshHandler;
