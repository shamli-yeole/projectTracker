import Grid from "@mui/material/Grid";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import verifyToken from '../utils/verifyToken';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Timeline } from "rsuite";
import CreditCardIcon from "@rsuite/icons/legacy/CreditCard";
import PlaneIcon from "@rsuite/icons/legacy/Plane";
import TruckIcon from "@rsuite/icons/legacy/Truck";
import UserIcon from "@rsuite/icons/legacy/User";
import CheckIcon from "@rsuite/icons/legacy/Check";


// timeline vertical
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { ToastContainer, toast } from 'react-toastify';

import 'rsuite/styles/index.less'; // or 'rsuite/dist/rsuite.min.css'
import Project_timeline from './Timeline/project_timeline'


function Tables() {
  const navigate = useNavigate();
  const [leadData, setLeadData] = useState([]); // state for leadData // CRM Portal 
  const [opportunityData, setOpportunityData] = useState([]); // State for opportunity data
  const [opportunityStage, setOpportunityStage] = useState([]); // state for opportunityStage
  const [enqData, setEnqData] = useState([]); // state for Enquiry Data // ENQUIRY Portal 
  const [sdInfo, setSDInfo] = useState([]); // state for SD Data   // SD Portal
  const [sdlog, setSDLog] = useState([]);
  const [dataFetched, setDataFetched] = useState(true); // ✅ Track data fetch status
  const [newOrder, setNewOrder] = useState([]);  // Billing  Portal 
  const [orderInfo, setOrderInfo] = useState([]);
  const [invoiceInfo, setInvoiceInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [itemPR, setItemPR] = useState([]);
  const [itemPO, setItemPO] = useState([]);
  const [allData, setAllData] = useState([]);
   const [errorMessage, setErrorMessage] = useState("");
  const enq = [];

  const formik = useFormik({
    initialValues: {
      id: "",
      idType: "",
    },
    validationSchema: Yup.object({
      id: Yup.string().required("ID is required"),
      idType: Yup.string().required("Please select an option"),
    }),
    onSubmit: async (values) => {
      setDataFetched(false); // ✅ Reset before fetching new data
      console.log('setDataFetched****', dataFetched);
      const token = localStorage.getItem("token");

      const isvalid = await verifyToken();
      console.log("Token verification status:", isvalid.valid);

      if (!isvalid.valid === true) {
        toast.error("Invalid token! Please login again");
        return;
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1//tracker/tracker?id=${encodeURIComponent(
            values.id
          )}&id_type=${encodeURIComponent(values.idType)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log("API Response:", data);
        // setDataFetched(true);

        if (data.status_code === 200) {

          // setEnqData(Array.isArray(data.data.ENQ?.["1"]) ? data.data.ENQ["1"] : []);
          // console.log("enquiry Data:", enqData);
          const enq = data.data.ENQ;
          Object.values(data.data.ENQ).flat();

          console.log('enq!!!!!!', enq);

          setEnqData(Array.isArray(data.data.ENQ?.["1"]) ? data.data.ENQ["1"] : []);
          console.log("enquiry Data:", enq);

          const leads = Object.values(data.data.LEAD).flat(); // Flatten all leads
          console.log("Parsed Leads:", leads);
          setLeadData(leads);

          // Handling OPPORTUNITY data
          const opportunity = Object.values(data.data.OPPORTUNITY).flat(); // Flatten all leads
          console.log("Opportunity:", opportunity);
          setOpportunityData(opportunity);

          // setOpportunityData(Array.isArray(data.data.OPPORTUNITY?.["1"]) ? data.data.OPPORTUNITY["1"] : []);
          // console.log("Opportunity Data:", opportunityData);

          setOpportunityStage(Array.isArray(data.data.OPPORTUNITY_STAGE?.["1"]) ? data.data.OPPORTUNITY_STAGE["1"] : []);
          console.log("Opportunity Stage:", opportunityStage)
          console.log("Opportunity Stage Data:", data.data.OPPORTUNITY_STAGE);

          // Handling ENQ data ... another way t handle and you can use like lead and opportunity data.



          // setSDInfo(Array.isArray(data.data.SD_INFO?.["1"]) ? data.data.SD_INFO["1"] : []);
          // console.log("SD_INFO:", sdInfo)
          // console.log("SD_INFO1>>>>>>>>>:", data.data.SD_INFO);

          setSDInfo(Array.isArray(data.data.SD_INFO) ? data.data.SD_INFO : []);
          console.log("SDINFO :", sdInfo);

          setSDLog(Array.isArray(data.data.SD_LOG) ? data.data.SD_LOG : []);
          console.log("SDLOG:", sdlog);


          setNewOrder(Array.isArray(data.data.NEW_ORDER) ? data.data.NEW_ORDER : []);
          console.log("newOrder:", newOrder);


          setOrderInfo(Array.isArray(data.data.ORDER_INFO) ? data.data.ORDER_INFO : []);
          console.log("orderInfo:", orderInfo);

          setInvoiceInfo(Array.isArray(data.data.INVOICE_INFO) ? data.data.INVOICE_INFO : []);
          console.log("invoiceInfo:", invoiceInfo);

          setPaymentInfo(Array.isArray(data.data.PAYMENT_INFO) ? data.data.PAYMENT_INFO : []);
          console.log("paymentInfo:", paymentInfo);

          setItemPR(Array.isArray(data.data.ITEM_PR) ? data.data.ITEM_PR : []);
          console.log("ItemPR:", itemPR);

          setItemPO(Array.isArray(data.data.ITEM_PO) ? data.data.ITEM_PO : []);
          console.log("ItemPR:", itemPO);


          setDataFetched(true); // ✅ Mark as fetched successfully



        } else {
          setEnqData([]);
          setLeadData([]); // Reset leadData if no valid data is found
          setOpportunityData([]);
          setItemPR([]);
          setItemPO([]);
          // setSDInfo([]);
          setDataFetched(false);

        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setEnqData([]);
        setLeadData([]); // Reset on error
        setOpportunityData([]);
        setOpportunityStage([]);
        setItemPR([]);
        setItemPO([]);
        // setSDInfo([]);
        setDataFetched(false);

      }
    },
  });

  useEffect(() => {
    // ✅ Merge and Sort All Data by Date
    const mergedData = [
      ...(Array.isArray(enqData) ? enqData.map((item) => ({ ...item, type: "enquiry", color: "purple", date: new Date(item.date) })) : []),
      ...(Array.isArray(leadData) ? leadData.map((item) => ({ ...item, type: "lead", color: "blue", date: new Date(item.date) })) : []),
      ...(Array.isArray(opportunityData) ? opportunityData.map((item) => ({ ...item, type: "opportunity", color: "green", date: new Date(item.date) })) : []),
      ...(Array.isArray(opportunityStage) ? opportunityStage.map((item) => ({ ...item, type: "opportunityStage", color: "orange", date: new Date(item.updated_on) })) : []),
      ...(Array.isArray(sdInfo) ? sdInfo.map((item) => ({ ...item, type: "sdinfo", color: "purple", date: new Date(item.converted_at) })) : []),
      ...(Array.isArray(sdlog) ? sdlog.map((item) => ({ ...item, type: "sdlog", color: "red", date: new Date(item.converted_at) })) : []),
      ...(Array.isArray(newOrder) ? newOrder.map((item) => ({ ...item, type: "newOrder", color: "red", date: new Date(item.created_at) })) : []),
      ...(Array.isArray(orderInfo) ? orderInfo.map((item) => ({ ...item, type: "orderInfo", color: "red", date: new Date(item.created_at) })) : []),
      ...(Array.isArray(invoiceInfo) ? invoiceInfo.map((item) => ({ ...item, type: "invoiceInfo", color: "red", date: new Date(item.created_at) })) : []),
      ...(Array.isArray(paymentInfo) ? paymentInfo.map((item) => ({ ...item, type: "paymentInfo", color: "red", date: new Date(item.created_at) })) : []),
    ];

    // ✅ Sort data by date (latest first)
    // mergedData.sort((a, b) => b.date - a.date);

    setAllData(mergedData);
  }, [leadData, opportunityData, opportunityStage, enqData, sdInfo, sdlog, newOrder, orderInfo, invoiceInfo, paymentInfo,]);


  return (

    <div>
      <ToastContainer></ToastContainer>
      <div style={{ background: "#fff", borderRadius: "12px", padding: "20px" }}>
        <h3>Project Timeline</h3>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", justifyContent: "center", p: 2, width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                p: 3,
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: 2,
                backgroundColor: "#fff",
                width: "fit-content",
              }}
            >
              {/* ID Input */}
              <TextField
                label="Enter ID"
                variant="outlined"
                size="medium"
                name="id"
                value={formik.values.id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.id && Boolean(formik.errors.id)}
                helperText={formik.touched.id && formik.errors.id}
                sx={{ width: 250 }}
              />

              {/* Dropdown */}
              <Select
                name="idType"
                value={formik.values.idType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                displayEmpty
                size="medium"
                renderValue={(value) => (!value ? <em>Select ID Type</em> : value)}
                IconComponent={ExpandMoreIcon}
                sx={{
                  width: 200,
                  height: 55,
                  border: formik.touched.idType && formik.errors.idType ? "1px solid red" : "",
                }}
              >
                <MenuItem value="">

                </MenuItem>
                {/* <MenuItem value="Pot ID">Pot ID</MenuItem> */}
                <MenuItem value="Enquiry-Email-ID">Enquiry-Email-ID</MenuItem>

                <MenuItem value="Lead-ID">Lead ID</MenuItem>
                <MenuItem value="Opportunity-ID">Opportunity ID</MenuItem>


              </Select>
              {formik.touched.idType && formik.errors.idType && (
                <Box sx={{ color: "red", fontSize: "12px", mt: 1 }}>{formik.errors.idType}</Box>
              )}

              {/* Submit Button */}
              <Button type="submit" variant="contained" color="primary" sx={{ color: "white! important", height: 55, px: 3 }}>
                Go
              </Button>
            </Box>
          </Box>
        </form>
     
        <text>{enq}</text>
        <Box pt={6} pb={3}>
          <Grid container spacing={6}>
            {/* ✅ Show message if no data is fetched yet */}
            {!dataFetched && <p style={{ marginLeft: 50 }}></p>}
            {dataFetched && (

              <Timeline mode="left" style={{ justifyContent: 'center', marginLeft: 100, alignItems: 'center', alignContent: 'center' }}>
              </Timeline>

            )}

            <Project_timeline leadData={leadData}
              opportunityData={opportunityData}
              opportunityStage={opportunityStage}
              enqData={enqData}
              dataFetched={dataFetched}
              sdInfo={sdInfo}
              sdlog={sdlog}
              newOrder={newOrder}
              orderInfo={orderInfo}
              invoiceInfo={invoiceInfo}
              paymentInfo={paymentInfo}
              itemPR={itemPR}
              itemPO={itemPO}


            />

          </Grid>

        </Box>

      </div>
    </div>
  );
}

export default Tables;
