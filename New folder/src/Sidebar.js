import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaBars, FaTable, FaUserShield, FaLock, FaKey } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";

const SidebarComponent = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh", marginLeft:"px" }}>
      {/* Sidebar with Toggle */}
      <Sidebar
        collapsed={collapsed}
        width="260px"
        backgroundColor="#1e293b"
        rootStyles={{
          height: "100%",
          padding: "px",
          color: "#fff",
          boxShadow: "2px 0 10px rgba(0, 0, 0, 0.2)",
        }}
        style={{ transition: "all 0.3s ease-in-out" }}
      >
        {/* Toggle Button */}
        <div
          style={{
            padding: "15px",
            backgroundColor: "#0f172a",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaBars />
          {!collapsed && <h4 style={{ margin: "0", fontSize: "22px" }}>Project Tracker</h4>}
        </div>

        {/* Menu Items */}
        <Menu
          menuItemStyles={{
            button: ({ active }) => ({
              backgroundColor: active ? "#2563eb" : "transparent",
              color: active ? "#ffffff" : "#cbd5e1",
              borderRadius: "8px",
              margin: "8px 0",
              transition: "background 0.3s ease-in-out",
              padding: "10px",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#1e40af",
                color: "#ffffff",
              },
            }),
          }}
        >
          <MenuItem icon={<FaTable />} component={<Link to="/app/tables" />}>{!collapsed && "Tracker"}</MenuItem>
          <MenuItem icon={<FaUserShield />} component={<Link to="/app/roles" />}>{!collapsed && "Roles"}</MenuItem>
          <MenuItem icon={<FaLock />} component={<Link to="/app/access" />}>{!collapsed && "Access"}</MenuItem>
          <MenuItem icon={<FaKey />} component={<Link to="/app/permission" />}>{!collapsed && "Permission"}</MenuItem>
          <MenuItem icon={<IoDocument />} component={<Link to="/app/document" />}>{!collapsed && "Document"}</MenuItem>
          
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
