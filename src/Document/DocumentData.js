import React, { useState, useEffect } from "react";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DocumentUser from "./DocumentUser"; 
import searchLogs from './document.json';

function DocumentData() {
    const [documents, setDocuments] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [opportunityId, setOpportunityID] = useState("");
    const [loading, setLoading] = useState(false); // changed to boolean
    const navigate = useNavigate();

    // ✅ Correct function name
    const handleUserDocument = (doc) => {
        setOpportunityID(doc.opportunity_id);
        // navigate happens in useEffect
    };
 
    // ✅ Navigate when opportunityId is set
    useEffect(() => { 
        console.log(opportunityId); 
        
        if (opportunityId) {
            navigate('/app/userdocument', { state: { opportunityId } });

        }
    }, [opportunityId]); 

    // ✅ Fetch data on mount
    useEffect(() => {
        FetchDocument();
    }, []);

    const FetchDocument = async () => {
        try {
            setLoading(true);

            // Simulate API delay if needed
            // await new Promise(resolve => setTimeout(resolve, 1000));

            const data = searchLogs.search_logs;
            console.log("Fetched Documents:", data);
            setDocuments(data);
            setErrorMessage("");
        } catch (error) {
            console.error("Error fetching document:", error);
            setErrorMessage("Unable to fetch documents.");
        } finally {
            setLoading(false);
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
                                            <Button
                                                variant="info"
                                                style={{ padding: "6px 12px", minWidth: "70px" }}
                                                onClick={() => handleUserDocument(doc)}
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
                )}
            </Container>
        </div>
    );
}

export default DocumentData;
