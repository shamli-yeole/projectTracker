import React, { useState, useEffect } from "react";
import { Container, Table, Button , Spinner} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DocumentUser from "./DocumentUser"; // ✅ Correct spelling


function DocumentData() {
    const [documents, setDocuments] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [opportunityId, setOpportunityID] = useState("");
    const [loading, setLoading] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        FetchDocument();
    }, [opportunityId]);

    const FetchDocument = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/v1//Searched-Opportunity-Docs/searched_opportunities",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched Documents:", data);

            setDocuments(data);  

            setErrorMessage(""); // Clear previous errors
        } catch (error) {
            console.error("Error fetching document:", error);
            setErrorMessage("Network error: Unable to fetch document.");
        }
    };

    return (
        <div>
            <ToastContainer />
            <Container className="mt-4 p-4 bg-white rounded shadow">
                <h4 className="mb-3 text-primary">Document List</h4>

                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                        <p>Loading documents...</p>
                    </div>
                ) : (


                    <Table striped bordered hover responsive>
                        <thead style={{ backgroundColor: "blue", color: "#ffffff" }}>
                            <tr>
                                <th>#</th>
                                <th>Opportunity ID</th>
                                <th>Opportunity Code</th>

                                <th>Searched By</th>
                                <th>Searched At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.length > 0 ? (
                                documents.map((doc, index) => (
                                    <tr key={doc.id}>
                                        <td>{index + 1}</td>
                                        <td>{doc.opportunity_id}</td>
                                        <td>{doc.opportunity_code}</td>

                                        <td>{doc.searched_by}</td>
                                        <td>{new Date(doc.searched_at).toLocaleString()}</td>
                                        <td className="text-center">
                                            <Button variant="info" className="p-2" style={{ padding: "6px 12px", minWidth: "70px" }}
                                                onClick={() => {
                                                    setOpportunityID(doc.opportunity_id)
                                                    console.log('opportunity id:', doc.opportunity_id);
                                                    navigate('/app/userdocument', { state: { opportunityId: doc.opportunity_id } });


                                                }
                                                }

                                            >
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center text-muted">
                                        No documents available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                )



                }


            </Container>
        </div>
    );
}

export default DocumentData;
