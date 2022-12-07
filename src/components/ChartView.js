import { useEffect, useState } from "react";
import { TRAININGS_API } from "../Constants";
import { Bar, BarChart, CartesianGrid, Label, Legend, Tooltip, XAxis, YAxis } from 'recharts';

export default function ChartView() {
    const [charts, setCharts] = useState([]);
    const [result, setResult] = useState([]);

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch(TRAININGS_API)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Error fetching training data")
            }
        })
        .then((data) => setCharts(data.content))
        .catch((err) => console.error(err));
    };

    useEffect(() => {
        var _ = require('lodash');
        const sum = _(charts)
            .groupBy('activity')
            .map((activity, id) => ({
                activity: id,
                duration: _.sumBy(activity, 'duration'),
            }))
            .value()
        setResult(sum);
    }, [charts]);

    return (
        <>
        <div>
        <BarChart
          width={1000}
          height={600}
          data={result}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity"/>
          <YAxis> <Label
              value="Duration in minutes"
              angle={-90}
              position="left"
              dy="-10"
            /> </YAxis> 
          <Tooltip />
          <Legend />
          <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
        </div>
        </>
    )
}