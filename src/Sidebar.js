import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaBars, FaTable, FaUserShield, FaLock, FaKey } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";

const SidebarComponent = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        collapsed={collapsed}
        width="260px"
        backgroundColor="#1e293b"
        rootStyles={{
          height: "100%",
          color: "#fff",
          borderRight: "none",
        }}
        style={{ 
          transition: "all 0.3s ease-in-out",
          boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)"
        }}
      >
        {/* Toggle Button */}
        <div
          style={{
            padding: "20px 16px",
            backgroundColor: "#0f172a",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            cursor: "pointer",
            borderBottom: "1px solid #334155",
            height: "64px"
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaBars style={{ fontSize: "18px" }} />
          {!collapsed && (
            <h4 style={{ 
              margin: 0, 
              fontSize: "18px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}>
              Project Tracker
            </h4>
          )}
        </div>

        {/* Menu Items */}
        <Menu
          menuItemStyles={{
            button: ({ active }) => ({
              backgroundColor: active ? "#2563eb" : "transparent",
              color: active ? "#ffffff" : "#e2e8f0",
              borderRadius: "8px",
              margin: "4px 8px",
              transition: "all 0.3s ease",
              padding: "10px 12px",
              fontSize: "14px",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#1e40af",
                color: "#ffffff",
              },
            }),
          }}
        >
          <MenuItem 
            icon={<FaTable style={{ fontSize: "16px" }} />} 
            component={<Link to="/app/tables" />}
          >
            {!collapsed && "Tracker"}
          </MenuItem>
          <MenuItem 
            icon={<FaUserShield style={{ fontSize: "16px" }} />} 
            component={<Link to="/app/roles" />}
          >
            {!collapsed && "Roles"}
          </MenuItem>
          <MenuItem 
            icon={<FaLock style={{ fontSize: "16px" }} />} 
            component={<Link to="/app/access" />}
          >
            {!collapsed && "Access"}
          </MenuItem>
          <MenuItem 
            icon={<FaKey style={{ fontSize: "16px" }} />} 
            component={<Link to="/app/permission" />}
          >
            {!collapsed && "Permission"}
          </MenuItem>
          <MenuItem 
            icon={<IoDocument style={{ fontSize: "16px" }} />} 
            component={<Link to="/app/document" />}
          >
            {!collapsed && "Document"}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;