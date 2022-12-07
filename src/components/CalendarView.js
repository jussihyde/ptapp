import React, { useEffect, useState } from "react";
import { TRAININGWITHCUSTOMER_API } from "../Constants";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

function CalendarView() {
    
    const [eventlist, setEventlist] = useState([]);
    var [json] = useState({});
    var [startTime] = useState(null);
    var [endTime] = useState(null);
    
    useEffect(() => {
        getTrainings();
    }, []);

    function getTrainings () {
        fetch(TRAININGWITHCUSTOMER_API)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Error fetching trainings data")
            }
        })
        .then(jsondata => {
            let data = [];
            json = Object.values(jsondata);
            for (var i = 0; i < json.length; i++) {
                  try {
                    startTime = new Date(json[i].date);
                    endTime = new Date(json[i].date);
                    endTime.setUTCMinutes(startTime.getUTCMinutes() + json[i].duration);
                    data.push({
                        title: json[i].activity + " / " + json[i].customer.firstname + " " +json[i].customer.lastname,
                        start: startTime,
                        end: endTime
                    });
                    setEventlist(data)
                }   catch (err) { console.error(err) }
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <div>
            <Calendar
                localizer={momentLocalizer(moment)}
                events={eventlist}
                style={{ height: 750, width: 1920 }} />
        </div>
    );
}

export default CalendarView;