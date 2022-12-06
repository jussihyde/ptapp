import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import format from 'date-fns/format';
import { TRAININGWITHCUSTOMER_API } from "../Constants";
import { fi } from "date-fns/locale";

function Trainingslist() {
    const [trainings, setTrainings] = useState([]);

    const [columndefs] = useState([
        {field: "date", sortable: true, filter: true,
            valueFormatter: params => format(new Date(params.value), "dd.MM.yyyy p", {locale: fi}) },
        {field: "duration", sortable: true, filter: true,},
        {field: "activity", sortable: true, filter: true,},
        {field: "customer.firstname", sortable: true, filter: true,},
        {field: "customer.lastname", sortable: true, filter: true,},
    ]);

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch(TRAININGWITHCUSTOMER_API)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Error fetching training data")
            }
        })
        .then((data) => setTrainings(data))
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
                rowData={trainings}
                columnDefs={columndefs}
                pagination={true}
                paginationPageSize={10}
            />{""}
        </div>
        </>
    )
}

export default Trainingslist;