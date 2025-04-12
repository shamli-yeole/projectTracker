import React, { useState, useEffect } from "react";
import { Card, Button, Form, Container, Row, Col, Modal, Table } from "react-bootstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";


import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import verifyToken from "../utils/verifyToken";
import { borderRadius } from "@mui/system";
import { Backdrop } from "@mui/material";

// baseurl :- http://127.0.0.1:8000/api/v1

function AccessData() {
    const [accessDataAll, setAccessDataAll] = useState([]);
    const [name, setname] = useState("");
    const [access, setaccess] = useState("");
    const [status, setStatus] = useState("");
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selecteAccessId, setselecteAccessId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [viewMode, setViewMode] = useState(false); // New state for view mode


    const handleClose = () => {
        setShow(false);
        setViewMode(false);
    };
    const handleShow = () => {
        setname("");
        setaccess("");
        setStatus("");
        setEditMode(false);
        setShow(true);
    };

    useEffect(() => {
        fetchaccess();



    }, []);

    const fetchaccess = async () => {

        const token = localStorage.getItem("token");
        const isvalid = await verifyToken();
        if (!isvalid.valid === true) {
            toast.error("Invalid token! Please login again");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/access/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();

            if (data.status_code === 200 || data.status_code === 201) {
                setAccessDataAll(data.data);
                setErrorMessage(""); // Clear any previous errors

            } else {
                setErrorMessage(data.detail || "Something went wrong");

                console.error("Error fetching access:", data.detail || "Unknown error");

            }
        } catch (error) {
            console.error("Error fetching Access:", error);
            setErrorMessage("Network error: Unable to fetch data access.");
            alert("Network error: Unable to fetch Access. Please try again later.");
        }
    };

    // REPLACE your `addOrEditAccess` function with this version
    const addOrEditAccess = async () => {
        // Simple Validation


        const token = localStorage.getItem("token");
        const url = editMode
            ? `http://127.0.0.1:8000/api/v1/access/update/${selecteAccessId}`
            : "http://127.0.0.1:8000/api/v1/access/";
        const method = editMode ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    access: access,
                    status: status,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                }),
            });

            const data = await response.json();
            if (response.ok) {
                fetchaccess();
                handleClose();
                toast.success(editMode ? "Access Updated Successfully" : "Access Created Successfully");
            } else {
                console.error(data.detail || "Failed to save Access");
                toast.error(data.detail || "Something went wrong");
                setShow(false);
            }
        } catch (error) {
            console.error("Error saving Access:", error);
        }
    };


    const deleteAccess = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/access/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify({ _method: "DELETE" })
            });
            const data = await response.json();
            console.log('datadelteAccess', data);

            if (response.ok) {
                fetchaccess();
                toast.success("access Deleted Successfully");

            } else {
                console.error("Failed to delete access");
                toast.error(data.detail || "Failed to delete access");
                setShow(false);
            }
        } catch (error) {
            console.error("Error deleting access:", error);
        }
    };




    return (
        <div>
            <ToastContainer />

            <Container className="mt-4 p-4 rounded bg-white shadow-sm">
                <Row className="align-items-center justify-content-between mb-3">
                    <Col xs="auto">
                        <h4 className="text-primary fw-bold m-0">Access Management</h4>
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
                            + Create Access
                        </Button>
                    </Col>
                </Row>

                {errorMessage && (
                    <p className="text-danger fw-semibold mb-3">{errorMessage}</p>
                )}

                <Table striped bordered hover responsive className="shadow-sm" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>Sr.No.</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>Name</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>Access</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>Status</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }} className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accessDataAll.map((accessData, index) => (
                            <tr key={accessData.id}>
                                <td>{index + 1}</td>
                                <td>{accessData.name}</td>
                                <td>{accessData.access}</td>
                                <td>
                                    <span
                                        className={`badge rounded-pill ${
                                            accessData.status === "Active"
                                                ? "bg-success"
                                                : "bg-secondary"
                                        }`}
                                    >
                                        {accessData.status}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <div className="d-flex justify-content-center gap-3">
                                        <Button
                                            variant="link"
                                            onClick={() => {
                                                setname(accessData.name);
                                                setaccess(accessData.access);
                                                setStatus(accessData.status);
                                                setselecteAccessId(accessData.id);
                                                setEditMode(true);
                                                setShow(true);
                                                setViewMode(true);
                                            }}
                                            title="Edit"
                                            className="text-warning p-0 fs-5"
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            variant="link"
                                            onClick={() => deleteAccess(accessData.id)}
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

            {/* Modal for Add/Edit */}
            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Formik
                    initialValues={{
                        name: name || "",
                        access: access || "",
                        status: status || "",
                    }}
                    enableReinitialize
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .matches(/^[A-Za-z0-9\s]+$/, "Name must be alphanumeric only ")
                            .required("Name is required"),
                        access: Yup.string()
                            .matches(/^[A-Za-z0-9_]+$/, "Access must be alphanumeric or underscore only")
                            .required("Access is required"),
                        status: Yup.string().required("Status is required"),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        // Submit logic (unchanged)
                        const token = localStorage.getItem("token");
                        const url = editMode
                            ? `http://127.0.0.1:8000/api/v1/access/update/${selecteAccessId}`
                            : "http://127.0.0.1:8000/api/v1/access/";
                        const method = editMode ? "PUT" : "POST";

                        try {
                            const response = await fetch(url, {
                                method,
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    name: values.name,
                                    access: values.access,
                                    status: values.status,
                                    created_at: new Date().toISOString(),
                                    updated_at: new Date().toISOString(),
                                }),
                            });

                            const data = await response.json();

                            if (response.ok) {
                                fetchaccess();
                                handleClose();
                                toast.success(editMode ? "Access Updated Successfully" : "Access Created Successfully");
                            } else {
                                toast.error(data.detail || "Something went wrong");
                                setShow(false);
                            }
                        } catch (error) {
                            console.error("Error saving access:", error);
                            toast.error("Error saving access");
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <FormikForm>
                            <Modal.Header closeButton className="bg-light">
                                <Modal.Title>
                                    {editMode ? "Edit Access" : "Add New Access"}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Field
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter name"
                                    />
                                    <div className="text-danger">
                                        <ErrorMessage name="name" />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Access</Form.Label>
                                    <Field
                                        name="access"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter access"
                                        readOnly={viewMode}
                                        style={viewMode ? { cursor: "not-allowed", backgroundColor: "#e9ecef" } : {}}
                                    />
                                    <div className="text-danger">
                                        <ErrorMessage name="access" />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Field
                                        as="select"
                                        name="status"
                                        className="form-select"
                                    >
                                        <option value="" disabled>
                                            Select Status
                                        </option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </Field>
                                    <div className="text-danger">
                                        <ErrorMessage name="status" />
                                    </div>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="outline-secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {editMode ? "Update Access" : "Save Access"}
                                </Button>
                            </Modal.Footer>
                        </FormikForm>
                    )}
                </Formik>
            </Modal>
        </div>
    );
}

export default AccessData;

