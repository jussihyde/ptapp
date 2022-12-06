import React, { useState, useEffect, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { CUSTOMER_API, TRAININGS_API } from "../Constants";

import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import { Button } from "@mui/material";

function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();

    const [columndefs] = useState([
        {field: "firstname", sortable: true, filter: true, width: 150,},
        {field: "lastname", sortable: true, filter: true, width: 150,},
        {field: "streetaddress", sortable: true, filter: true, width: 240,},
        {field: "postcode", sortable: true, filter: true, width: 120,},
        {field: "city", sortable: true, filter: true, width: 120,},
        {field: "email", sortable: true, filter: true, width: 240,},
        {field: "phone", sortable: true, filter: true, width: 160,},
        {   width: 200,  hide: true,
            cellRenderer: (params) => (
            <EditCustomer data={params.data} updateCustomer={updateCustomer} />
        ),},
        {   width: 140,  hide: true,
            cellRenderer: (params) => (
            <AddTraining data={params.data} addTraining={addTraining} />
        ),},
        {   width: 200, hide: true,
            cellRenderer: (params) => (
            <Button color="error" variant="contained" onClick={() => deleteCustomer(params.data)}>
                {""} Delete{""}
            </Button>
        ),},
    ]);

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        fetch(CUSTOMER_API)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Error fetching customer data")
            }
        })
        .then((data) => setCustomers(data.content))
        .catch((err) => console.error(err));
    };

    const addCustomer = (customer) => {
        fetch(CUSTOMER_API, {
            method: "POST", headers: { "Content-type": "application/json" },
            body: JSON.stringify(customer), 
        })
        .then((response) => {
            if (response.ok) {
                getCustomers();
            } else {
                alert("Error adding customer")
            }
        })
        .catch((err) => console.log(err));
    };

    const deleteCustomer = (data) => {
        if (window.confirm("Do you want to delete?")) {
            fetch(data.links[1].href, {
                method: "DELETE",
            })
            .then((response) => {
                if (response.ok) {
                    getCustomers();
                } else {
                    alert("Error with delete")
                }
            })
            .catch((err) => console.log(err));
        }
    };

    const updateCustomer = (customer, url) => {
        fetch(url, {
            method: "PUT", headers: { "Content-type": "application/json" },
            body: JSON.stringify(customer),
        })
        .then((response) => {
            if (response.ok) {
                getCustomers();
            } else {
                alert("Error updating table edited data")
            }
        })
        .catch((err) => console.log(err));
    };

    const addTraining = (training) => {
        fetch(TRAININGS_API, {
            method: "POST", headers: { "Content-type": "application/json" },
            body: JSON.stringify(training),
        })
        .then((response) => {
            if (response.ok) {
                getCustomers();
            } else {
                alert("Error adding trainings to customer")
            }
        })
        .catch((err) => console.log(err));
    };
      
      const getParams = () => {
        return {
            fileName:"customers-ptapp.csv",
        };
      };

    const onButtonExport = useCallback(() => {
        gridRef.current.api.exportDataAsCsv(getParams());
    }, []);

    return (
        <>
        <AddCustomer addCustomer={addCustomer} />
        <div
            className="ag-theme-material"
            style={{
                height: 650,
                width: "90%",
                margin: "auto",
            }}
        >
            <AgGridReact
                ref={gridRef}
                rowData={customers}
                columnDefs={columndefs}
                pagination={true}
                paginationPageSize={11}
            />{""}
        </div>
        <Button onClick={onButtonExport}>Export to CSV</Button>
        </>
    )
}

export default Customerlist;