import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarComponent from "./Sidebar";
import { toast, ToastContainer } from "react-toastify";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Avatar, Box } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "./features/auth/userSlice";



const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // Open dropdown menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close dropdown menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Logout function
  const handleLogout = () => {
    toast.success("Logout Successful", {
      autoClose: 1500, // Delay before redirect
      onClose: () => {
        dispatch(logoutUser()) // Clear token
        navigate("/sign-in");
      }
    });
  };


  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header with Dropdown */}
        <AppBar position="static" sx={{ backgroundColor: "#1e293b" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Logo */}
          
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img src="/assets/logo_esds.png" alt="Logo" style={{ width: "40px", height: "40px" }} />
            </Box>
            <Typography variant="h6">Project Tracker</Typography>

            {/* Profile Dropdown */}
            <div>
              <IconButton onClick={handleMenuOpen} color="inherit">
                <Avatar sx={{ bgcolor: "white", color: "#1e293b" }}>
                  <FaUserCircle size={24} />
                </Avatar>
              </IconButton>

              {/* Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={() => navigate("/app/profile")}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>

        {/* Dynamic Content */}
        <main style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
          <ToastContainer />
          <Outlet /> {/* Renders the nested route content */}
        </main>

        {/* Footer */}
        {/* <footer style={{ backgroundColor: "#1e293b", color: "white", padding: "3px", textAlign: "center" }}>
         <p>© 2025 Project Tracker</p>
        </footer> */}
      </div>
    </div>
  );
};

export default Layout;
