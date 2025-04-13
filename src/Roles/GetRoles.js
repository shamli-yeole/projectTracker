import React, { useState, useEffect } from "react";
import { Card, Button, Form, Container, Row, Col, Modal, Table } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import verifyToken from "../utils/verifyToken";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { Pagination } from "react-bootstrap";


function Roles() {
    const [roles, setRoles] = useState([]);
    const [roleName, setRoleName] = useState("");
    const [status, setStatus] = useState("");
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [viewMode, setViewMode] = useState(false); // New state for view mode
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const totalPages = 10;
    const handlePageChange = (number) => {
        setCurrentPage(number);
        fetchRoles(number, itemsPerPage)


        console.log("fetch pagination data:", roles);
    };

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
        fetchRoles(currentPage, itemsPerPage); {

        }
    }, []);


    const fetchRoles = async (pageNumber, itemsPerPage) => {
        console.log('pageNumber',pageNumber);
        console.log('itemsPerPage',itemsPerPage);
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
            setErrorMessage("Network error: Server is  unreachable. Please try again later.");
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
                <Row className="align-items-center justify-content-between mb-3">
                    <Col xs="auto">
                        <h4 className="text-primary fw-bold m-0">Role Management</h4>
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
                            + Create Role
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
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>Role Name</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>Status</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }} colSpan={3} className="text-center">Actions</th>
                        </tr>

                    </thead>
                    <tbody>
                        {roles.map((role, index) => (
                            <tr key={role.id}>
                                <td>{index + 1}</td>
                                <td>{role.name}</td>
                                {/* //   <td>{role.status}</td> */}
                                <td>
                                    <span
                                        className={`badge rounded-pill ${role.status === "Active"
                                            ? "bg-success"
                                            : "bg-secondary"
                                            }`}
                                    >
                                        {role.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="d-flex justify-content-center gap-3">
                                        <Button
                                            variant="link"
                                            className="text-warning p-0 fs-5"
                                            onClick={() => {
                                                setRoleName(role.name);
                                                setStatus(role.status);
                                                setSelectedRoleId(role.id);
                                                setEditMode(true);
                                                setShow(true);
                                            }}

                                            title="Edit">
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            variant="link"
                                            onClick={() => deleteRole(role.id)}
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
             {totalPages > 1 && (
                            <div className="d-flex justify-content-end mt-3">
                                <Pagination>
                                    <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                                    <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                                    {[...Array(totalPages)].map((_, index) => (
                                        <Pagination.Item
                                            key={index + 1}
                                            active={index + 1 === currentPage}
                                            onClick={() => handlePageChange(index + 1)}
                                        >
                                            {index + 1}
                                        </Pagination.Item>
                                    ))}
                                    <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
                                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                                </Pagination>
                            </div>
                        )}
        </div>
    );
}

export default Roles;
