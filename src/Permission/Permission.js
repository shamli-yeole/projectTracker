import React, { useState, useEffect } from "react";
import { Card, Button, Form, Container, Row, Col, Modal, Table } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import verifyToken from "../utils/verifyToken";
import { FaCheck, FaEdit, FaTimes } from "react-icons/fa";
import { Pagination } from "react-bootstrap";

// baseurl :- http://127.0.0.1:8000/api/v1

function PermissionData() {
    const [PermissionDataAll, setPermissionDataAll] = useState([]);
    // const [name, setname] = useState();
    const [Permission, setPermission] = useState("");
    const [status, setStatus] = useState("");
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectePermissionId, setselectePermissionId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [viewMode, setViewMode] = useState(false); // New state for view mode

    const [roleid, setRoleID] = useState("");
    const [RoleName, setRoleName] = useState("");
    const [accessid, setaccessID] = useState("");
    const [AccessName, setAccessName] = useState("");
    const [isview, setIsView] = useState("");
    const [isadd, setIsAdd] = useState("");
    const [isedit, setIsEdit] = useState("");
    const [isdelete, setIsDelete] = useState("");
    const [isEditable, setIsEditable] = useState("");
    const [roles, setRoles] = useState([]);
    const [Accesses, setAccesses] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const totalPages = 10;
    const handlePageChange = (number) => {
        setCurrentPage(number);
        fetchPermission(number, itemsPerPage)


        // console.log("accessed data:", accessDataAll);
    };

    // 422 (Unprocessable Entity)
    // 403 forbidden

    const handleClose = () => {
        setShow(false);
        setViewMode(false);
    };
    const handleShow = () => {
        setRoleID("");
        setaccessID("");
        setIsView("");
        setIsAdd("");
        setIsEdit("");
        setIsDelete("");
        // setPermission("");
        setStatus("");
        setEditMode(false);
        setShow(true);
    };

    useEffect(() => {
        fetchPermission(currentPage, itemsPerPage);
        GetRolesID();
        GetAccessID();
        console.log("Updated Selected Permission ID:", selectePermissionId);

    }, [selectePermissionId]);


    const GetRolesID = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/roles/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();
            console.log("FETCH ROLES****", data);

            if (data.data && Array.isArray(data.data)) {
                setRoles(data.data);
                setErrorMessage("");
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("Error fetching roles:", error);
            // setErrorMessage("Network error: Server is  unreachable. Please try again later.");
            alert("Unable to fetch permission. Please check your network connection.");
        }
    };


    const GetAccessID = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/access/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log("Fetched Accesses:", data);

            if (data.status_code === 200 || data.status_code === 201) {
                setAccesses(data.data);

                setErrorMessage("");
            } else {
                setErrorMessage(data.detail || "Something went wrong");
                console.error("Error fetching accesses:", data.detail || "Unknown error");
            }
        } catch (error) {
            console.error("Network error:", error);
            setErrorMessage("Network error: Unable to fetch accesses.");
            alert("Network error: Unable to fetch accesses. Please try again later.");
        }
    };




    // console.log(Accesses[0]?.id);  //based on this change bellow 
    // return ( 
    //     <>
    //         {Accesses.map((access) => (
    //             <option key={access.id} value={access.id}>
    //                 {access.name}
    //             </option>
    //         ))}

    //     </>

    // );

    const fetchPermission = async () => {

        const token = localStorage.getItem("token");
        const isvalid = await verifyToken();
        console.log('Token verification status:', isvalid.valid);
        if (!isvalid.valid === true) {
            toast.error("Invalid token! Please login again");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/permission/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log('fetchPermission::::::', data)

            if (data.status_code === 200 || data.status_code === 201) {
                setPermissionDataAll(data.data);
                console.log('data_Permission:', data);
                setErrorMessage(""); // Clear any previous errors

            } else {
                setErrorMessage(data.detail || "Something went wrong");

                console.error("Error fetching Permission:", data.detail || "Unknown error");

            }
        } catch (error) {
            console.error("Error fetching Permission:", error);
            setErrorMessage("Network error: Unable to fetch data Permission.");
            alert("Network error: Unable to fetch Permission. Please try again later.");
        }
    };

    const addOrEditPermission = async () => {
        console.log("Edit Mode:", editMode);
        console.log("Selected Permission ID Before API Call:", selectePermissionId);



        const token = localStorage.getItem("token");
        const url = editMode
            ? `http://127.0.0.1:8000/api/v1/Permission/${selectePermissionId}`
            : "http://127.0.0.1:8000/api/v1/permission/";
        const method = editMode ? "POST" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // name: name,
                    // Permission: Permission,

                    role_id: roleid,
                    access_id: accessid,
                    is_view: isview ? 1 : 0,
                    is_add: isadd ? 1 : 0,
                    is_edit: isedit ? 1 : 0,
                    is_delete: isdelete ? 1 : 0,
                    status: status,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),

                }),
            });

            if (response.ok) {
                fetchPermission();
                handleClose();
                toast.success(editMode ? "Permission Updated Successfully" : "Permission Created Successfully");
            } else {
                console.error("Failed to save Permission");
            }
        } catch (error) {
            console.error("Error saving Permission:", error);
        }
    };



    return (
        <div>
            <ToastContainer />

            <Container
                className="mt-4"
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                }}
            >
                <Row className="align-items-center justify-content-between mb-3">
                    <Col xs="auto">
                        <h4 className="text-primary fw-bold m-0">Permission</h4>
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
                            Add Permission
                        </Button>
                    </Col>
                </Row>


                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                {/* Table for Permission Management */}
                <Table striped bordered hover responsive className="shadow-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem" }}>
                    <thead>
                        <tr >
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>Sr.No</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>Role</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>Access</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>View</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>Add</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>Delete</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>Edit</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>Status</th>
                            <th style={{ backgroundColor: "#007bff", color: "#fff" }}>Action</th>
                        </tr>
                        <tr>

                        </tr>
                    </thead>
                    <tbody>

                        {PermissionDataAll?.filter(PermissionData => PermissionData.role?.name && PermissionData.role.name !== "N/A"
                        )
                            .map((PermissionData, index) => (
                                <tr key={PermissionData.id}>
                                    {/* {console.log("Permissions Data:", PermissionDataAll)} */}

                                    <td>{index + 1}</td>
                                    <td>{PermissionData.role?.name || "N/A"}</td>
                                    <td>{PermissionData.access?.name || "N/A"}</td>
                                    <td>{PermissionData.is_view === 1 ? <FaCheck color="green" /> : <FaTimes color="red" />}</td>
                                    <td>{PermissionData.is_add === 1 ? <FaCheck color="green" /> : <FaTimes color="red" />}</td>
                                    <td>{PermissionData.is_edit === 1 ? <FaCheck color="green" /> : <FaTimes color="red" />}</td>
                                    <td>{PermissionData.is_delete === 1 ? <FaCheck color="green" /> : <FaTimes color="red" />}</td>
                                    <td>
                                        <span
                                            className={`badge rounded-pill ${PermissionData.status === "Active"
                                                ? "bg-success"
                                                : "bg-secondary"
                                                }`}
                                        >
                                            {PermissionData.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Button variant="link" className="me-2 mb-1 text-warning p-0 fs-5"
                                            onClick={() => {
                                                console.log("Edit Button Clicked for ID:", PermissionData.id);
                                                //setname(PermissionData.name)
                                                // setPermission(PermissionData.Permission);
                                                // setRoleID("");
                                                // setaccessID("");
                                                // setIsView("");
                                                // setIsAdd("");
                                                // setIsEdit("");
                                                // setIsDelete("");
                                                // // setPermission("");
                                                // setStatus("");
                                                // setStatus(PermissionData.status);
                                                // setselectePermissionId(PermissionData.id);


                                                setselectePermissionId(PermissionData.id); // Store selected ID
                                                console.log(">>>>>>>>>ID PERMISSION>>>>", PermissionData.id);
                                                setRoleID(PermissionData.role?.id || ""); // Store Role ID
                                                setRoleName(PermissionData.role?.name || ""); // Store Role Name
                                                setaccessID(PermissionData.access?.id || ""); // Store Access ID
                                                setAccessName(PermissionData.access?.name || ""); // Store Access Name
                                                setIsView(PermissionData.is_view === 1);
                                                setIsAdd(PermissionData.is_add === 1);
                                                setIsEdit(PermissionData.is_edit === 1);
                                                setIsDelete(PermissionData.is_delete === 1);
                                                setStatus(PermissionData.status || "");
                                                setEditMode(true);
                                                setShow(true);

                                                console.log("Selected Permission ID:", PermissionData.id);
                                                console.log("Role ID:", PermissionData.role?.id, "Role Name:", PermissionData.role?.name);
                                                console.log("Access ID:", PermissionData.access?.id, "Access Name:", PermissionData.access?.name);


                                                setEditMode(true);
                                                setShow(true);
                                                console.log("Edit Mode:", editMode);
                                                console.log("Show Modal:", show);
                                            }}

                                            title="Edit"
                                        >

                                            <FaEdit />
                                        </Button>

                                    </td>
                                </tr>
                            ))
                        }


                        {/* {PermissionDataAll.map((PermissionData, index) =>
                        (
                            <tr key={PermissionData.id}>
                                {console.log("Permissions Data:", PermissionDataAll)}

                                <td>{index + 1}</td>

                                
                                <td>{PermissionData.role?.name || "N/A"}</td>
                                <td>{PermissionData.access?.name || "N/A"}</td>
                                <td>
                                    <input type="checkbox" checked={PermissionData.is_view === 1} readOnly />
                                </td>
                                <td>
                                    <input type="checkbox" checked={PermissionData.is_add === 1} readOnly />
                                </td>
                                <td>
                                    <input type="checkbox" checked={PermissionData.is_edit === 1} readOnly />
                                </td>
                                <td>
                                    <input type="checkbox" checked={PermissionData.is_delete === 1} readOnly />
                                </td>

                                <td>{PermissionData.status}</td>
                                <td>
                                    <Button variant="warning" className="me-2 mb-1" onClick={() => {

                                        //setname(PermissionData.name)
                                        // setPermission(PermissionData.Permission);
                                        setRoleID("");
                                        setaccessID("");
                                        setIsView("");
                                        setIsAdd("");
                                        setIsEdit("");
                                        setIsDelete("");
                                        // setPermission("");
                                        setStatus("");
                                        setStatus(PermissionData.status);
                                        setselectePermissionId(PermissionData.id);
                                        setEditMode(true);
                                        setShow(true);
                                    }}>Edit</Button>
                                   
                                </td>
                            </tr>
                        ))} */}



                    </tbody>
                </Table>


            </Container>

            <Container className="mt-4">

                {/* Add/Edit(Update) Permission Modal */}
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{editMode ? "Edit Permission" : "Add New Permission"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>

                                <Form.Select value={roleid} onChange={(e) => setRoleID(e.target.value)}>

                                    <option value="">Select a role</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}

                                    {/* <RoleDropdown setRoleID={setRoleID} /> */}

                                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                                </Form.Select>

                            </Form.Group>


                            <Form.Group className="mb-3">
                                <Form.Label>Access</Form.Label>
                                <Form.Select value={accessid} onChange={(e) => setaccessID(e.target.value)}>
                                    {Accesses.map((access) => (
                                        <option key={access.id} value={access.id}>
                                            {access.name}
                                        </option>
                                    ))}

                                    <option value="">Select a Access</option>

                                    {/* <AccessDropdown setaccessID={setaccessID} /> */}

                                </Form.Select>

                            </Form.Group>

                            {/* Checkboxes for permissions */}
                            <Form.Group className="mb-3">
                                <Form.Label>Permissions</Form.Label>
                                <div>
                                    <Form.Check
                                        type="checkbox"
                                        label="Is View"
                                        checked={isview}
                                        onChange={(e) => setIsView(e.target.checked)}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Is Add"
                                        checked={isadd}
                                        onChange={(e) => setIsAdd(e.target.checked)}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Is Edit"
                                        checked={isedit}
                                        onChange={(e) => setIsEdit(e.target.checked)}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Is Delete"
                                        checked={isdelete}
                                        onChange={(e) => setIsDelete(e.target.checked)}
                                    />
                                </div>
                            </Form.Group>

                            {/* Editable checkbox */}
                            {/* <Form.Group className="mb-3">
                                <Form.Label>Editable</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    label="Is Editable"
                                    checked={isEditable}
                                    onChange={(e) => setIsEditable(e.target.checked)}
                                />
                            </Form.Group> */}

                            {/* Status dropdown */}
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
                        <Button variant="primary" onClick={addOrEditPermission}>
                            {editMode ? "Update Permission" : "Save Permission"}
                        </Button>
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

export default PermissionData;
