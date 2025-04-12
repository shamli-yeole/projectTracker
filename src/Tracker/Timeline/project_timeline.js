import React from 'react';
import ReactDOM from 'react-dom';
import Grid from "@mui/material/Grid";
import {  Button, MenuItem, Select, TextField } from "@mui/material";
import Box from "@mui/system/Box";

import './style.css';
// import '../timeline.less';
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";
import { FaBuilding } from "react-icons/fa";
import { FaCheckCircle, FaHourglassHalf } from 'react-icons/fa'; // Example icons
import './styles.css'
import { MdLeaderboard } from "react-icons/md";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";

import { GiDart } from "react-icons/gi";
import { MdArticle } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { Timeline } from 'rsuite';
import 'rsuite/dist/rsuite.min.css'; // Ensure RSuite styles are imported


function Project_timeline({ leadData, opportunityData, opportunityStage, enqData, dataFetched, sdInfo, sdlog, newOrder,
    orderInfo, invoiceInfo, paymentInfo, itemPO, itemPR }) {
    console.log('Item PO---->>>>', itemPO);


    return (

        <>
            <Box pt={6} pb={3}>
                {/* {console.log('dataFetched>>>>>>>>>', dataFetched)} */}
                <Grid container spacing={6}>
                    {!dataFetched ? (

                        <Grid item xs={12} style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "200px" }}>
                            <CircularProgress style={{ color: "#0496ff", justifyContent: "center", alignItems: "center", marginLeft: 150 }} />
                        </Grid>
                    ) :
                        (
                            <>

                                {dataFetched && (

                                    <Timeline className="custom-timeline">


                                        {/* ENQUIRY DATA */}

                                        {enqData.length > 0 ? (

                                            enqData.map((item, index) => (
                                                <>
                                                    <Timeline.Item dot={index === 0 ?


                                                        <div
                                                            style={{
                                                                width: "40px",
                                                                height: "40px",
                                                                borderRadius: "50%",  // Make it circular
                                                                backgroundColor: "#0077b6",  // Blue background
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                color: "#fff",  // White icon color
                                                                fontSize: "20px",
                                                                marginLeft: "-8px", // Shift icon slightly left
                                                                position: "relative", // Ensure correct positioning
                                                                left: "-5px" // Fine-tune alignment



                                                              

                                                            }}
                                                        >
                                                            <AiFillProduct /> {/* Icon inside the circle */}
                                                        </div> : null}>


                                                        <p><strong>Name:</strong> {item.Name || "N/A"}</p>
                                                        <p><strong>Company Name:</strong> {item.company_name || "N/A"}</p>
                                                        <p><strong>Request Services:</strong> {item.request_services || "N/A"}</p>
                                                        <p><strong>Message:</strong> {item.message || "N/A"}</p>
                                                        <p><strong>Date:</strong> {item.date ? new Date(item.date).toLocaleString() : "null"}</p>
                                                        <p><strong>Enquiry Status:</strong> {item.enquiry_status || "N/A"}</p>
                                                        <p><strong>Lead Status:</strong> {item.lead_status || "N/A"}</p>
                                                        <p><strong>Converted Lead ID:</strong> {item.converted_lead_id || "N/A"}</p>
                                                    </Timeline.Item>
                                                </>
                                            ))



                                        ) : (
                                            <></>
                                        )}



                                        {/* CRM DATA THis and ONWARD */}

                                        {leadData.length > 0 ? (

                                            leadData.map((item, index) => (
                                                <>
                                                    <Timeline.Item dot={index === 0 ? <div
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            borderRadius: "50%",  // Make it circular
                                                            backgroundColor: "#0077b6",  // Blue background
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            color: "#fff",  // White icon color
                                                            fontSize: "20px",
                                                            marginRight: "20px",
                                                            position: "relative", // Ensure correct positioning
                                                                left: "-14px" // Fine-tune alignment
                                                        }}
                                                    >
                                                        <MdLeaderboard /> {/* Icon inside the circle */}
                                                    </div> : null}>



                                                        <p><strong>Lead ID:</strong> {item.leadid || "N/A"}</p>
                                                        <p><strong>Lead Name:</strong> {item.leadidname || "N/A"}</p>
                                                        <p><strong>Status:</strong> {item.status_name || "N/A"}</p>
                                                        <p><strong>Action Performed:</strong> {item.action_performed || "N/A"}</p>
                                                        <p><strong>Username:</strong> {item.created_by || "N/A"}</p>
                                                        <p><strong>Date:</strong> {item.date ? new Date(item.date).toLocaleString() : "N/A"}</p>
                                                    </Timeline.Item>

                                                </>
                                            ))

                                        ) : (
                                            <></>
                                        )}

                                        {opportunityData.length > 0 ? (

                                            opportunityData.map((item, index) => (
                                                <>
                                                    <Timeline.Item dot={index === 0 ?
                                                        <div
                                                            style={{
                                                                width: "40px",
                                                                height: "40px",
                                                                borderRadius: "50%",  // Make it circular
                                                                backgroundColor: "#0077b6",  // Blue background
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                color: "#fff",  // White icon color
                                                                fontSize: "20px",
                                                                marginRight: "20px",
                                                                
                                                            position: "relative", // Ensure correct positioning
                                                            left: "-14px" // Fine-tune alignment
                                                            }}
                                                        >


                                                            <GiDart />
                                                        </div>
                                                        : null}>

                                                        {/* <p><strong>Opportunity ID:</strong> {item.opportunity_id || "N/A"}</p>
                            <p><strong>Lead ID:</strong> {item.leadid || "N/A"}</p> */}
                                                        <p><strong>Opportunity Code:</strong> {item.opportunity_code || "N/A"}</p>
                                                        {item.status && item.status !== "null" && item.status !== "N/A" ? (
                                                            <p><strong>Status: {item.status}</strong></p>
                                                        ) : null}
                                                        {item.status && item.status !== "null" && item.status !== "N/A" ? (
                                                            <p><strong>Status: {item.status_name}</strong></p>
                                                        ) : null}
                                                        <p><strong>Action Performed:</strong> {item.action_performed || "N/A"}</p>
                                                        <p><strong>User:</strong> {item.created_by || "null"}</p>
                                                        {
                                                            item.created_on && item.created_on != "null" ?
                                                                (
                                                                    <p><strong> Created On:</strong> {item.created_on ? new Date(item.created_on).toLocaleString() : "N/A"}</p>
                                                                ) : null
                                                        }

                                                        {item.date && item.date !== "null" && item.date !== "N/A" ? (
                                                            <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
                                                        ) : null}


                                                        {item.modified_by && item.modified_by != "null" ?
                                                            (
                                                                <p><strong>Modified By:</strong> {item.modified_by}</p>
                                                            )
                                                            : null}

                                                        {item.changed_on && item.changed_on != "null" ?
                                                            (
                                                                <p><strong> Changed On:</strong> {new Date(item.changed_on).toLocaleString()}</p>
                                                            )
                                                            : null}


                                                    </Timeline.Item>

                                                </>
                                            ))



                                        ) : (
                                            <></>
                                        )}


                                        {opportunityStage.length > 0 ? (

                                            opportunityStage.map((item, index) => (
                                                <>
                                                    <Timeline.Item dot={index === 0 ?
                                                        <div
                                                            style={{
                                                                width: "40px",
                                                                height: "40px",
                                                                borderRadius: "50%",  // Make it circular
                                                                backgroundColor: "#0077b6",  // Blue background
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                color: "#fff",  // White icon color
                                                                fontSize: "20px",
                                                                marginRight: "20px",
                                                                position: "relative", // Ensure correct positioning
                                                                left: "-14px" // Fine-tune alignment
                                                            }}
                                                        >


                                                            <GiDart />
                                                        </div>
                                                        : null}>
                                                        <p><strong>Stage ID:</strong> {item.stage_id || "N/A"}</p>
                                                        <p><strong>Opportunity ID:</strong> {item.opportunity_id}</p>
                                                        <p><strong>Stage :</strong> {item.stage_name}</p>
                                                        <p><strong>Process ID:</strong> {item.process_id || "N/A"}</p>
                                                        <p><strong>Probability:</strong> {item.probability}</p>
                                                        <p><strong>Updated On:</strong> {new Date(item.updated_on).toLocaleString()}</p>
                                                        <p><strong>Opportunity Code:</strong> {item.opportunity_code}</p>
                                                    </Timeline.Item>

                                                </>
                                            ))



                                        ) : (
                                            <></>
                                        )}


                                        {/* SD DATA  THis and ONWARD*/}

                                        {sdInfo.length > 0 ? (

                                            sdInfo.map((item, index) => (
                                                <>
                                                    <Timeline.Item dot={index === 0 ?




                                                        <div
                                                            style={{
                                                                width: "40px",
                                                                height: "40px",
                                                                borderRadius: "50%",  // Make it circular
                                                                backgroundColor: "#0077b6",  // Blue background
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                color: "#fff",  // White icon color
                                                                fontSize: "20px",
                                                                marginRight: "20px",
                                                                position: "relative", // Ensure correct positioning
                                                                left: "-14px" // Fine-tune alignment
                                                            }}
                                                        >


                                                            < MdArticle />
                                                        </div>
                                                        : null}>

                                                        <p><strong> ID :</strong> {item.id}</p>
                                                        <p><strong>customer Name:</strong> {item.customer_name}</p>
                                                        {/* <p><strong>Is Converted:</strong> {item.is_converted}</p>
                            <p><strong>Opportunity  Status:</strong> {item.opp_status}</p>  */}
                                                        <p><strong>Converted At:</strong>  {new Date(item.converted_at).toLocaleString()}</p>

                                                        {item.order_rejected_at && item.order_rejected_at != null ? (
                                                            <p><strong>Order Rejected At:</strong> {item.order_rejected_at}</p>)
                                                            : null}

                                                        {item.order_rejected_by != null ? (<p><strong>Order Rejected By:</strong> {item.order_rejected_by}</p>)
                                                            : null}

                                                        {item.opp_reject_remarks != null ? (
                                                            <p><strong>Opportunity Reject Remarks:</strong> {item.opp_reject_remarks}</p>)
                                                            : null}



                                                        <p><strong>Converted Project ID:</strong> {item.converted_project_id}</p>


                                                        <p><strong>Created At:</strong> {new Date(item.created_at).toLocaleString()}</p>

                                                    </Timeline.Item>

                                                </>
                                            ))



                                        ) : (
                                            <></>
                                        )}


                                        {sdlog.length > 0 ? (

                                            sdlog.map((item, index) => (
                                                <>

                                                    <Timeline.Item dot={index === 0 ?



                                                        <div
                                                            style={{
                                                                width: "40px",
                                                                height: "40px",
                                                                borderRadius: "50%",  // Make it circular
                                                                backgroundColor: "#0077b6",  // Blue background
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                color: "#fff",  // White icon color
                                                                fontSize: "20px",
                                                                marginRight: "20px",
                                                                position: "relative", // Ensure correct positioning
                                                                left: "-14px" // Fine-tune alignment
                                                            }}
                                                        >


                                                            <GiDart />
                                                        </div>
                                                        : null}>
                                                        {
                                                            item.project_id && item.project_id != "null" ?
                                                                (
                                                                    <p><strong>Project ID:</strong> {item.project_id}</p>

                                                                ) : null
                                                        }
                                                        {
                                                            item.customer_id && item.customer_id != "null" ?
                                                                (
                                                                    <p><strong>Customer ID:</strong> {item.customer_id}</p>

                                                                ) : null
                                                        }
                                                        {
                                                            item.opp_id && item.opp_id != "null" ?
                                                                (
                                                                    <p><strong>Opp ID:</strong> {item.opp_id}</p>

                                                                ) : null
                                                        }
                                                        {
                                                            item.lead_id && item.lead_id != "null" ?
                                                                (
                                                                    <p><strong>Lead ID:</strong> {item.lead_id}</p>

                                                                ) : null
                                                        }
                                                        <p><strong>customer Name:</strong> {item.customer_name}</p>
                                                        {
                                                            item.project_name && item.project_name != "null" ?
                                                                (
                                                                    <p><strong>Project Name:</strong> {item.project_name}</p>

                                                                ) : null
                                                        }


                                                        {
                                                            item.activity && item.activity != "null" ?
                                                                (
                                                                    <p><strong>Activity:</strong> {item.activity}</p>

                                                                ) : null
                                                        }
                                                        {
                                                            item.remarks && item.remarks != "null" ?
                                                                (
                                                                    <p><strong>Remarks:</strong> {item.remarks}</p>

                                                                ) : null
                                                        }
                                                        {
                                                            item.added_date && item.added_date != "null" ?
                                                                (
                                                                    <p><strong>Added Date:</strong> {new Date(item.added_date).toLocaleString()}</p>

                                                                ) : null
                                                        }
                                                        {
                                                            item.added_by && item.added_by != "null" ?
                                                                (
                                                                    <p><strong>Added By:</strong> {item.added_by}</p>

                                                                ) : null
                                                        }

                                                        {
                                                            item.converted_at && item.converted_at != "null" ?
                                                                (
                                                                    <p><strong>Converted At:</strong> {new Date(item.converted_at).toLocaleString()}</p>

                                                                ) : null
                                                        }
                                                        {
                                                            item.converted_at && item.converted_at != "null" ?
                                                                (
                                                                    <p><strong>Created At:</strong> {new Date(item.created_at).toLocaleString()}</p>

                                                                ) : null
                                                        }


                                                    </Timeline.Item>

                                                </>
                                            ))


                                        ) : (
                                            <></>
                                        )}

                                        {/* BILLING DATA THis and ONWARD */}

                                        {newOrder.length > 0 ? (

                                            newOrder.map((item, index) => (
                                                <>
                                                    <Timeline.Item dot={index === 0 ?



                                                        <div
                                                            style={{
                                                                width: "40px",
                                                                height: "40px",
                                                                borderRadius: "50%",  // Make it circular
                                                                backgroundColor: "#0077b6",  // Blue background
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                color: "#fff",  // White icon color
                                                                fontSize: "20px",
                                                                marginRight: "20px",
                                                                  position: "relative", // Ensure correct positioning
                                                                left: "-14px" // Fine-tune alignment
                                                            }}
                                                        >


                                                            <GiDart />
                                                        </div>
                                                        : null}>



                                                        <p><strong>Order ID:</strong> {item.order_id}</p>
                                                        <p><strong>OP ID:</strong> {item.op_id}</p>
                                                        <p><strong>OP Date:</strong> {new Date(item.op_date).toLocaleDateString()}</p>
                                                        {item.order_status && item.order_status != null ?
                                                            (
                                                                <p><strong>  Order Status:</strong> {item.order_status}</p>
                                                            )
                                                            : null}
                                                        {item.po_type != null ?
                                                            (
                                                                <p><strong> PO Type:</strong> {item.po_type}</p>
                                                            )
                                                            : null}

                                                        <p><strong>Added Date:</strong> {new Date(item.added_date).toLocaleDateString()}</p>

                                                        <p><strong>User:</strong> {item.user}</p>

                                                    </Timeline.Item>

                                                </>
                                            ))



                                        ) : (
                                            <></>
                                        )}

                                        {orderInfo.length > 0 ? (

                                            orderInfo.map((item, index) => (
                                                <>
                                                    <Timeline.Item dot={index === 0 ? <div
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            borderRadius: "50%",  // Make it circular
                                                            backgroundColor: "#0077b6",  // Blue background
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            color: "#fff",  // White icon color
                                                            fontSize: "20px",
                                                            marginRight: "20px",
                                                            position: "relative", // Ensure correct positioning
                                                            left: "-14px" // Fine-tune alignment
                                                        }}
                                                    >


                                                        <GiDart />
                                                    </div>
                                                        : null}>
                                                        <p><strong>ID:</strong> {item.id}</p>
                                                        <p><strong>Invoice ID:</strong> {item.invoiceid}</p>
                                                        <p><strong>Fixed Amount:</strong> {item.fixed_amount}</p>
                                                        {item.paymentmethod && item.paymentmethod != null ?
                                                            (
                                                                <p><strong>  Payment Method:</strong> {item.paymentmethod}</p>
                                                            )
                                                            : null}
                                                        <p><strong>Status:</strong> {item.status}</p>
                                                        <p><strong> Order Number:</strong> {item.ordernum}</p>
                                                        <p><strong> User:</strong> {item.user}</p>

                                                        <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>


                                                    </Timeline.Item>

                                                </>
                                            ))



                                        ) : (
                                            <></>
                                        )}


                                        {invoiceInfo.length > 0 ? (

                                            invoiceInfo.map((item, index) => (
                                                <>
                                                    <Timeline.Item dot={index === 0 ? <div
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            borderRadius: "50%",  // Make it circular
                                                            backgroundColor: "#0077b6",  // Blue background
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            color: "#fff",  // White icon color
                                                            fontSize: "20px",
                                                            marginRight: "20px",
                                                            position: "relative", // Ensure correct positioning
                                                            left: "-14px" // Fine-tune alignment
                                                        }}
                                                    >


                                                        <GiDart />
                                                    </div>
                                                        : null}>



                                                        <p><strong>ID:</strong> {item.id}</p>
                                                        <p><strong>Total:</strong> {item.total}</p>

                                                        <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
                                                        <p><strong> Due Date:</strong> {new Date(item.duedate).toLocaleString()}</p>
                                                        <p><strong>Status:</strong> {item.status}</p>
                                                        <p><strong> User:</strong> {item.user}</p>



                                                    </Timeline.Item>

                                                </>
                                            ))



                                        ) : (
                                            <></>
                                        )}

                                        {paymentInfo.length > 0 ? (
                                            paymentInfo.map((item, index) => (
                                                <>
                                                    <Timeline.Item dot={index === 0 ?
                                                        <div
                                                            style={{
                                                                width: "40px",
                                                                height: "40px",
                                                                borderRadius: "50%",  // Make it circular
                                                                backgroundColor: "#0077b6",  // Blue background
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                color: "#fff",  // White icon color
                                                                fontSize: "20px",
                                                                marginRight: "20px",
                                                                position: "relative", // Ensure correct positioning
                                                                left: "-14px" // Fine-tune alignment
                                                            }}
                                                        >

                                                            <GiDart />
                                                        </div>
                                                        : null}>
                                                        <p><strong>ID:</strong> {item.id}</p>
                                                        <p><strong>Amount In:</strong> {item.amountin}</p>
                                                        <p><strong>Description:</strong> {item.description}</p>
                                                        <p><strong>Fixed Amount:</strong> {item.fixed_amount}</p>
                                                        <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
                                                        <p><strong> User:</strong> {item.user}</p>
                                                    </Timeline.Item>
                                                </>
                                            ))

                                        )
                                            : (<> </>
                                            )}


                                        {itemPR.length > 0 ? (
                                            itemPR.map((item, index) => (
                                                <>
                                                    <Timeline.Item dot={index === 0 ?
                                                        <div
                                                            style={{
                                                                width: "40px",
                                                                height: "40px",
                                                                borderRadius: "50%",  // Make it circular
                                                                backgroundColor: "#0077b6",  // Blue background
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                color: "#fff",  // White icon color
                                                                fontSize: "20px",
                                                                marginRight: "20px",
                                                                position: "relative", // Ensure correct positioning
                                                                left: "-14px" // Fine-tune alignment
                                                            }}
                                                        >
                                                            <BiSolidPurchaseTagAlt />
                                                        </div>
                                                        : null}>

                                                        <p><strong>Pot ID:</strong> {item.POTID}</p>
                                                        <p><strong>Pr ID Hex:</strong> {item.pr_id_hex}</p>
                                                        <p><strong>Pr Status:</strong> {item.pr_status}</p>
                                                        <p><strong>Pr Created At :</strong> {new Date(item.pr_created_at).toLocaleString()}</p>
                                                        <p><strong>History Type:</strong> {item.history_type}</p>
                                                        <p><strong> action:</strong> {item.action}</p>
                                                        <p><strong> comment:</strong> {item.comment}</p>
                                                        <p><strong> Created At:</strong> {new Date(item.created_at).toLocaleString()}</p>
                                                        <p><strong> User:</strong> {item.created_by_name}</p>


                                                    </Timeline.Item>

                                                </>

                                            ))

                                        )
                                            : (

                                                <>
                                                </>
                                            )}

                                        {itemPO.length > 0 ? (
                                            itemPO.map((item, index) => (
                                                <>
                                                    <Timeline.Item dot={index === 0 ?
                                                        <div
                                                            style={{
                                                                width: "40px",
                                                                height: "40px",
                                                                borderRadius: "50%",  // Make it circular
                                                                backgroundColor: "#0077b6",  // Blue background
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                color: "#fff",  // White icon color
                                                                fontSize: "20px",
                                                                marginRight: "20px",
                                                                position: "relative", // Ensure correct positioning
                                                                left: "-14px" // Fine-tune alignment
                                                            }}
                                                        >
                                                            <BiSolidPurchaseTagAlt />
                                                        </div>
                                                        : null}>

                                                        <p><strong>History Type:</strong> {item.history_type}</p>
                                                        <p><strong>Details:</strong> {item.details}</p>
                                                        <p><strong>Action:</strong> {item.action}</p>
                                                        <p><strong>Comment:</strong> {item.comment}</p>
                                                        <p><strong>Created_at:</strong> {new Date(item.created_at).toLocaleString()}</p>
                                                        <p><strong>User:</strong> {item.created_by_name}</p>

                                                    </Timeline.Item>
                                                </>

                                            ))

                                        )
                                            : (
                                                <>

                                                    {/* <Timeline.Item dot={<CheckIcon style={{ background: "#15b215", color: "#fff" }} />}>
                                                </Timeline.Item> */}


                                                </>
                                            )}
                                    </Timeline>

                                )}
                            </>

                        )}


                </Grid >

            </Box >


        </>

    )
}
Project_timeline.propTypes = {
    leadData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    opportunityData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    opportunityStage: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    enqData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    dataFetched: PropTypes.bool, // ✅ Define as a boolean
    sdInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    sdlog: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    newOrder: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    orderInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    invoiceInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    paymentInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    itemPO: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    itemPR: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),


};


export default Project_timeline;
