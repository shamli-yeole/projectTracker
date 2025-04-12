import React, { useState, useEffect } from "react";
import { Card, Button, Form, Container, Row, Col, Modal, Table } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import verifyToken from "../utils/verifyToken";



function Roles() {
    const [roles, setRoles] = useState([]);
    const [roleName, setRoleName] = useState("");
    const [status, setStatus] = useState("");
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [viewMode, setViewMode] = useState(false); // New state for view mode


    const handleClose = () => {
        setShow(false);
        setViewMode(false);
    };
    const handleShow = () => {
        setRoleName("");
        setStatus("");
        setEditMode(false);
        setShow(true);
    };

    useEffect(() => {
        fetchRoles(); {

        }
    }, []);



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
            console.log('dataFETCHROLES::::::', data)
            if (data.status_code === 200 || data.status_code === 201) {
                setRoles(data.data);
                setErrorMessage(""); // Clear any previous errors

            } else {
                setErrorMessage(data.detail || "Something went wrong");

                console.error("Error fetching roles:", data.detail || "Unknown error");

            }
        } catch (error) {
            console.error("Error fetching roles:", error);
            setErrorMessage("Network error: Unable to fetch roles.");
            alert("Network error: Unable to fetch roles. Please try again later.");
        }
    };

    const addOrEditRole = async () => {
        const token = localStorage.getItem("token");
        const url = editMode
            ? `http://127.0.0.1:8000/api/v1/roles/update/${selectedRoleId}`
            : "http://127.0.0.1:8000/api/v1/roles/";
        const method = editMode ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: roleName,
                    status: status,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),

                }),
            });

            if (response.ok) {
                fetchRoles();
                handleClose();
                toast.success(editMode ? "Role Updated Successfully" : "Role Created Successfully");
            } else {
                console.error("Failed to save role");
            }
        } catch (error) {
            console.error("Error saving role:", error);
        }
    };

    const deleteRole = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/roles/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify({ _method: "DELETE" })
            });

            if (response.ok) {
                fetchRoles();
                toast.success("Role Deleted Successfully");

            } else {
                console.error("Failed to delete role");
            }
        } catch (error) {
            console.error("Error deleting role:", error);
        }
    };
    // const viewRole = async (selectedRoleId) => {
    //     const token = localStorage.getItem("token");
    //     try {
    //         const response = await fetch(`http://127.0.0.1:8000/api/v1/roles/id/${selectedRoleId}`, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //         const data = await response.json();
    //         if (response.ok) {
    //             fetchRoles();
    //             setRoleName(data.name);
    //             setStatus(data.status);
    //             setViewMode(true);
    //             console.log('viewrole####', roleName, status)
    //         } else {
    //             console.error("Error fetching role details:", data.detail || "Unknown error");
    //         }
    //     } catch (error) {
    //         console.error("Error fetching role details:", error);
    //     }
    // };


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
                <Row
                    className="d-flex align-items-center justify-content-between mb-3 p-3"
                    style={{
                        background: "linear-gradient(90deg, #007bff, #0056b3)",
                        borderRadius: "8px",
                        padding: "15px 20px"
                    }}
                >
                    <h4
                        className="mb-0"
                        style={{
                            color: "#ffffff",
                            fontSize: "22px",
                            fontWeight: "600",
                            letterSpacing: "1px"
                        }}
                    >
                        Role Management
                    </h4>
                    <Button
                        variant="light"
                        onClick={handleShow}
                        className="ms-auto"
                        style={{
                            width: "200px",
                            height: "50px",
                            fontSize: "16px",
                            fontWeight: "500",
                            borderRadius: "8px",
                            boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
                            transition: "0.3s",
                            border: "2px solid #ffffff",
                            color: "#007bff"
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#ffffff")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#cce5ff")}
                    >
                        + Create Role
                    </Button>
                </Row>


                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                {/* Table for Role Management */}
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Role Name</th>
                            <th>Status</th>
                            <th colSpan={3} className="text-center">Options</th>
                        </tr>
                        <tr>
                            {/* <th></th>
                            <th></th>
                            <th></th> */}
                            {/* <th>View</th>
                            <th>Edit</th>
                            <th>Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role, index) => (
                            <tr key={role.id}>
                                <td>{index + 1}</td>
                                <td>{role.name}</td>
                                <td>{role.status}</td>
                                <td>
                                    <Button variant="warning" className="me-2 mb-1" onClick={() => {
                                        setRoleName(role.name);
                                        setStatus(role.status);
                                        setSelectedRoleId(role.id);
                                        setEditMode(true);
                                        setShow(true);
                                    }}>Edit</Button>
                                    <Button variant="danger" onClick={() => deleteRole(role.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Add/Edit Role Modal */}

                {/* <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{editMode ? "Edit Role" : "Add New Role"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Role Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter role name" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Control type="text" placeholder="Enter status" value={status} onChange={(e) => setStatus(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" onClick={addOrEditRole}>
                            {editMode ? "Update Role" : "Save Role"}
                        </Button>
                    </Modal.Footer>
                </Modal> */}

                {/* View Role Modal (Read-Only) */}
                {/* <Modal show={viewMode} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>View Role</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Role Name</Form.Label>
                                <Form.Control type="text" value={roleName} readOnly />
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




            <Container className="mt-4">

                {/* <Row className="justify-content-center mb-3">
                    <Button variant="primary" onClick={handleShow}>Create Role</Button>
                </Row> */}

                {/* <h4 className="text-center font-weight-bold mb-4">Role Management</h4> */}

                {/* <Row>
                    {roles.map((role) => (
                        <Col xs={12} sm={6} md={4} key={role.id} className="mb-3">
                            <Card className="text-center shadow-sm">
                                <Card.Body>
                                    <Card.Title>{role.name}</Card.Title>



                                    
                                    <Form.Control type="text" value={role.status} readOnly className="mb-2" />
                                 
                                    <Button variant="info" className="me-2"
                                        onClick={() => viewRole(role.id)}>
                                        View
                                    </Button>
                                    <Button variant="outline-primary" className="me-2"
                                        onClick={() => {
                                            setRoleName(role.name);
                                            setStatus(role.status);
                                            setSelectedRoleId(role.id);
                                            setEditMode(true);
                                            setShow(true);
                                        }}>
                                        Edit
                                    </Button>
                                    
                                    <Button variant="danger" onClick={() => deleteRole(role.id)}>Delete</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row> */}

                {/* Add/Edit(Update) Role Modal */}
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{editMode ? "Edit Role" : "Add New Role"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Role Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter role name"
                                    value={roleName}
                                    onChange={(e) => setRoleName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="" disabled>Select Status</option>  {/* Placeholder option */}
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </Form.Select>
                            </Form.Group>
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
                <Modal show={viewMode} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>View Role</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Role Name</Form.Label>
                                <Form.Control type="text" value={roleName} readOnly />
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
                </Modal>
            </Container>
        </div>
    );
}

export default Roles;
