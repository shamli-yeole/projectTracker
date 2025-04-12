import React, { useState, useEffect } from "react";
import { Card, Button, Form, Container, Row, Col, Modal, Table } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import verifyToken from "../utils/verifyToken";
import { useLocation } from "react-router-dom";



function DocumentUser() {


    const location = useLocation();
    const opportunityId = location.state?.opportunityId;
 
    
    return (
        <div>

            <ToastContainer />
            <p>Opportunity ID: {opportunityId}</p>
          







        </div>
    );
}

export default DocumentUser;
