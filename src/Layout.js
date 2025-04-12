import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarComponent from "./Sidebar";
import { toast, ToastContainer } from "react-toastify";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Avatar, Box } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "./features/auth/userSlice";
import image from "./assets/logo_esds.png"
const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    toast.success("Logout Successful", {
      autoClose: 1500,
      onClose: () => {
        dispatch(logoutUser())
        navigate("/sign-in");
      }
    });
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f1f5f9" }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding:20 }}>
        {/* Header with Dropdown */}
        <AppBar position="static" sx={{
          backgroundColor: "#1e293b", // slate-800
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <Toolbar sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 24px"
          }}>
            {/* Logo and Title */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img
                src={image}
                alt="Logo"
                style={{ width: "85px", height: "75px", borderRadius: "8px" }}
              />
              <Typography variant="h6" sx={{
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "1.25rem"
              }}>
                Project Tracker
              </Typography>
            </Box>

            {/* Profile Icon with Menu */}
            <IconButton
              onClick={handleMenuOpen}
              color="inherit"
              sx={{
                padding: "8px",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" }
              }}
            >
              <Avatar sx={{
                bgcolor: "#ffffff",
                color: "#1e293b",
                width: 36,
                height: 36
              }}>
                <FaUserCircle size={20} />
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
            >
              <MenuItem onClick={() => { navigate("/app/profile"); handleMenuClose(); }}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>



        {/* Dynamic Content */}
        <main style={{
          flex: 1,
          padding: "24px",
          overflowY: "auto",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          margin: "16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;