import { Route, Routes, Navigate } from "react-router-dom";
import Basic from "./authentication/sign-in";
import PrivateRoute from "./PrivateRoute";
import Tables from "./Tracker/Tracker";
import SidebarComponent from "./Sidebar";
import PermissionData from "./Permission/Permission";
import AccessData from "./Access/Access";
import GetRoles from "./Roles/GetRoles";
import Layout from "./Layout"; // ✅ Import Layout
import DocumentData from "./Document/DocumentData";
import DocumentUser from "./Document/DocumentUser";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/sign-in" element={<Basic />} />
      <Route path="/" element={<Navigate to="/sign-in" />} />

      {/* Protected Routes (with Sidebar, Header, and Footer) */}
      <Route
        path="/app/*"
        element={
          // <PrivateRoute>
            <Layout />
          // {/* </PrivateRoute> */}
        }
      >
        <Route index element={<Tables />} />
        <Route path="tables" element={<Tables />} />
        <Route path="permission" element={<PermissionData />} />
        <Route path="roles" element={<GetRoles />} />
        <Route path="access" element={<AccessData />} />
        <Route path="document" element={<DocumentData />} />
       
     
        <Route path="userdocument" element={<DocumentUser />} />
      </Route>

      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to="/sign-in" />} />
    </Routes>
  );
}
