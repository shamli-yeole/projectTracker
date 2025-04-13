import React, { useState, useEffect } from "react";
import { Card, Button, Form, Container, Row, Col, Modal, Table } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { Checkbox } from "@mui/material";
import verifyToken from "../utils/verifyToken";


function GetUserAccess() {
    const [users, setUsers] = useState([]);
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setuserLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [usertype, setUserType] = useState("");
    const [roleid, setRoleID] = useState("");
    const [isdeleted, setIsdeleted] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedAccessId, setselectedAccessId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [viewMode, setViewMode] = useState(false); // New state for view mode
    const [roles, setRoles] = useState([]);

    const handleClose = () => {
        setShow(false);
        setViewMode(false);
        setRoleID(""); 
    };
    const handleShow = () => {
        setUserFirstName("");
        setuserLastName("");
        setStatus("");
        setRoleID("");
        setEditMode(false);
        setShow(true);
    };

    useEffect(() => {
        FetchUsers(); {

        }
    }, []);

    // const handleCheckboxChange = (id, isChecked) => {
    //     // Example: update local state or make an API call
    //     console.log(`Permission ID ${id} set to ${isChecked ? 1 : 0}`);
    //     // update your state or send a PATCH request to update permission
    // };

    const limit = 10;
    const page = 1;

    const FetchUsers = async () => {
        const token = localStorage.getItem("token");
        const userverify = verifyToken();
        console.log('userverify', userverify);


        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/users/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log('Users`s &&&', data);
            if (data.status_code === 200 || data.status_code === 201) {
                setUsers(data.data);
                fetchRoles();
                setErrorMessage(""); // Clear any previous errors

            } else {
                setErrorMessage(data.detail || "Something went wrong");
                console.error("Error fetching Users:", data.detail || "Unknown error");

            }
        } catch (error) {
            console.error("Error fetching Users:", error);
            setErrorMessage("Network error: Server is  unreachable. Please try again later.");
            alert("Network error: Unable to fetch Users. Please try again later.");
        }
    };
    const fetchRoles = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/roles/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log('Fetctch Roles ****', data)
            if (data.status_code === 200 || data.status_code === 201) {
                setRoles(data.data);

                setErrorMessage(""); // Clear any previous errors

            } else {
                setErrorMessage(data.detail || "Something went wrong");

                console.error("Error fetching roles:", data.detail || "Unknown error");

            }
        } catch (error) {
            console.error("Error fetching roles:", error);
            setErrorMessage("Network error: Server is  unreachable. Please try again later.");
            alert("Network error: Unable to fetch roles. Please try again later.");
        }
    };




    const addOrEditRole = async () => {
        const token = localStorage.getItem("token");
        const url = editMode
            ? `http://127.0.0.1:8000/api/v1/users/update/${selectedAccessId}`
            : "http://127.0.0.1:8000/api/v1/users/users/";
        const method = editMode ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: userFirstName,
                    last_name: userLastName,
                    email: email,
                    phone_number: phonenumber,
                    user_type: usertype,
                    role_id: roleid,
                    is_deleted: isdeleted ? 1 : 0,
                    password: password,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()

                }),
            });

            if (response.ok) {
                console.log('response ADD or EDIT', response);
                FetchUsers();
                handleClose();
                toast.success(editMode ? "User Updated Successfully" : "User Created Successfully");
            } else {
                console.error("Failed to save User");
            }
        } catch (error) {
            console.error("Error saving role:", error);
        }
    };

    const deleteRole = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify({ _method: "DELETE" })
            });

            if (response.ok) {
                FetchUsers();
                toast.success("User Deleted Successfully");

            } else {
                console.error("Failed to delete User");
            }
        } catch (error) {
            console.error("Error deleting User:", error);
        }
    };

    return (
        <div>
            <ToastContainer />

            <Container
                className="mt-4 p-4"
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                }}
            >
                <Row className="align-items-center justify-content-between mb-3">
                    <Col xs="auto">
                        <h4 className="text-primary fw-bold m-0">User Management</h4>
                    </Col>
                    <Col xs="auto">
                        <Button
                            variant="outline-primary"
                            onClick={handleShow}
                            style={{
                                borderRadius: "8px",
                                fontWeight: "500",
                                padding: "8px 16px",
                                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            Register New User
                        </Button>
                    </Col>
                </Row>

                {errorMessage && (
                    <p className="text-danger fw-semibold mb-3">{errorMessage}</p>
                )}


                {/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}
                {/* Table for Role Management */}
                <Table striped bordered hover responsive className="shadow-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>Sr.No.</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>First Name</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>Last Name</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>Email</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>Phone Number</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }} colSpan={3} className="text-center">Actions</th>
                        </tr>

                    </thead>
                    <tbody>
                        {users.map((userlist, index) => (
                            <tr key={userlist.id}>
                                <td>{index + 1}</td>
                                <td>{userlist.first_name}</td>
                                <td> {userlist.last_name}</td>
                                <td>{userlist.email}</td>
                                <td>{userlist.phone_number}</td>


                                <td>
                                    <div className="d-flex justify-content-center gap-3">
                                        <Button
                                            variant="link"
                                            className="text-warning p-0 fs-5"
                                            onClick={() => {
                                                setUserFirstName(userlist.first_name);
                                                setuserLastName(userlist.last_name);
                                                setEmail(userlist.email);
                                                setPhoneNumber(userlist.phone_number);
                                                setUserType(userlist.user_type);
                                                setIsdeleted(userlist.is_deleted === 1);
                                                setPassword(userlist.password);
                                                setselectedAccessId(userlist.id);
                                                setEditMode(true);
                                                setShow(true);
                                            }}

                                            title="Edit">
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            variant="link"
                                            onClick={() => deleteRole(userlist.id)}
                                            title="Delete"
                                            className="text-danger p-0 fs-5"
                                        >
                                            <FaTrashAlt />
                                        </Button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>


            </Container>

            <Container className="mt-4">


                {/* Add/Edit(Update) Role Modal */}
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{editMode ? "Edit User" : "Register New User"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter user name"
                                    value={userFirstName}
                                    onChange={(e) => setUserFirstName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Last name"
                                    value={userLastName}
                                    onChange={(e) => setuserLastName(e.target.value)}
                                />
                            </Form.Group><Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Phone Number"
                                    value={phonenumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Role ID</Form.Label>
                                <Form.Select value={roleid} onChange={(e) => setRoleID(e.target.value)}>

                                    <option value="" disabled>Select a role</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}

                                   

                                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Is Deleted</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter role name"
                                    value={isdeleted}
                                    onChange={(e) => setIsdeleted(e.target.value)}
                                />
                            </Form.Group>

                            <td>
                                <Form.Check
                                    type="checkbox"
                                    // checked={userlist.is_deleted === 1}
                                    readOnly // prevents user interaction, remove if you want it editable
                                />
                            </td>
                            {/* <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="" disabled>Select Status</option>  
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </Form.Select>
                            </Form.Group> */}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" onClick={addOrEditRole}>
                            {editMode ? "Update Role" : "Save Role"}
                        </Button>
                    </Modal.Footer>
                </Modal>


                {/* View Role Modal (Read-Only) */}
                {/* <Modal show={viewMode} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>View Role</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Role Name</Form.Label>
                                <Form.Control type="text" value={userName} readOnly />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Control type="text" value={status} readOnly />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal> */}
            </Container>
        </div>
    );
}

export default GetUserAccess;
