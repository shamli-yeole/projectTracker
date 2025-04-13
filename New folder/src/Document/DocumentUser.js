import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


import { Card, Button, Form, Container, Row, Col, Modal, Table } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import verifyToken from "../utils/verifyToken";
import { FaEye, FaDownload } from "react-icons/fa"; // import icons


function DocumentUser() {
    const location = useLocation();
    const opportunityId = location.state?.opportunityId;



    const [roles, setRoles] = useState([]);
    const [roleName, setRoleName] = useState("");
    const [status, setStatus] = useState("");
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [viewMode, setViewMode] = useState(false); // New state for view mode

    const [docName, setDocName] = useState("");
    const [docID, setDocID] = useState("");
    const [docType, setDocType] = useState("");


    const [documentsUser, setDocumentsUser] = useState([]);

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
        DocumentByOpportunityId(); {

        }
    }, []);
    // View document in a new tab or modal
    const handleViewDocument = (doc) => {
        if (doc?.document_url) {
            window.open(doc.document_url, '_blank');
        } else {
            toast.warn("No URL available for this document.");
        }
    };

    // Download document
    const handleDownloadDocument = (doc) => {
        if (doc?.document_url) {
            const link = document.createElement("a");
            link.href = doc.document_url;
            link.download = doc.document_name || "document";
            link.click();
        } else {
            toast.warn("No downloadable link available.");
        }
    };



    const DocumentByOpportunityId = async () => {

        const token = localStorage.getItem("token");
        const url = "https://swayatta.esds.co.in:31199/production/document_api_rest.php";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Add Authorization header only if required by API
                    Authorization: `Basic Y3JtaWFwaWNsaWVudDo2QUc/eFIkczQ7UDkkPz8hSw==`,
                },
                body: JSON.stringify({
                    opportunity_id: opportunityId, // Make sure opportunityId is defined
                }),
            });

            const data = await response.json(); // Parse response body

            if (response.ok) {
                console.log("Response Data >>>", data);
                const documentDetail = data.result.documents_details;


                if (documentDetail && documentDetail.length > 0) {
                    setDocumentsUser(documentDetail); // assuming it's an array
                    const firstDoc = documentDetail[0];

                    setDocName(firstDoc.document_name || "N/A");
                    setDocID(firstDoc.document_id || "N/A");
                    setDocType(firstDoc.document_type || "N/A");
                } else {
                    setDocName("No document found");
                    setDocID("No document found");
                    setDocType("No document found");
                }
            } else {
                console.error("Failed to fetch document:", data.message || data);
                toast.error("Failed to fetch document");
            }
        } catch (error) {
            console.error("Error while fetching document:", error);
            toast.error("Something went wrong while fetching document");
        }


    };

    return (
        <div>

            <ToastContainer />
            {/* <h1>Document of User</h1>
            <p>Opportunity ID: {opportunityId || "No ID Passed"}</p> */}
            {/* <h1>{docName}</h1>
            <h1>{docID}</h1>
            <h1>{docType}</h1> */}

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
                    }}>
                    <h4
                        className="mb-0"
                        style={{
                            color: "#ffffff",
                            fontSize: "22px",
                            fontWeight: "600",
                            letterSpacing: "1px"
                        }}>
                        User Document
                    </h4>

                </Row>


                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                {/* Table for Role Management */}
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Document ID</th>
                            <th>Document Name</th>
                            <th>Document Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documentsUser.length > 0 ? (
                            documentsUser.map((doc, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{doc.documentid}</td>
                                    <td>{doc.document_name}</td>
                                    <td>{doc.document_type}</td>
                                    <td style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '15px', // spacing between icons
                                        height: '100%'
                                    }}  >
                                        {/* View Button */}
                                        <FaEye
                                            style={{ cursor: "pointer", marginRight: "15px", color: "#007bff", marginLeft: 10 }}
                                            onClick={() => handleViewDocument(doc)}
                                            title="View Document"
                                        />

                                        {/* Download Button */}
                                        <FaDownload
                                            style={{ cursor: "pointer", color: "#28a745", marginLeft: 10 }}
                                            onClick={() => handleDownloadDocument(doc)}
                                            title="Download Document"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No documents found for this opportunity ID.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>


            </Container>

            <Container className="mt-4">



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
                        {/* <Button variant="primary" onClick={addOrEditRole}>
                            {editMode ? "Update Role" : "Save Role"}
                        </Button> */}
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

export default DocumentUser;
