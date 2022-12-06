import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { CUSTOMER_API } from "../Constants";

function Customerlist() {
    const [customers, setCustomers] = useState([]);

    const [columndefs] = useState([
        {field: "firstname", sortable: true, filter: true,},
        {field: "lastname", sortable: true, filter: true,},
        {field: "streetaddress", sortable: true, filter: true,},
        {field: "postcode", sortable: true, filter: true,},
        {field: "city", sortable: true, filter: true,},
        {field: "email", sortable: true, filter: true,},
        {field: "phone", sortable: true, filter: true,},
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

    return (
        <>
        <div
            className="ag-theme-material"
            style={{
                height: 650,
                width: "90%",
                margin: "auto",
            }}
        >
            <AgGridReact
                rowData={customers}
                columnDefs={columndefs}
                pagination={true}
                paginationPageSize={11}
            />{""}
        </div>
        </>
    )
}

export default Customerlist;