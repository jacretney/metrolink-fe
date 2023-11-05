import { useEffect, useState } from "react";
import axios from 'axios';

import { TramStopResponse } from "../data/TramStopResponse";
import { Tram } from "../data/Tram";
import LoadingEllipsis from "./LoadingEllipsis";

function getDueTime(status: string, minutes: number): string 
{
    if (status === 'Due') {
        return `${minutes} mins`;
    }

    return status;
}

function TramTimetable() {
    const [trams, setTrams] = useState<Tram[]>([]);
    const [message, setMessage] = useState('');
    const [errorCount, setErrorCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get<TramStopResponse>('/stops/129036')
                .then(async response => {
                    const { data } = response.data;
                    
                    setErrorCount(0);
                    setTrams(data.trams);
                    setMessage(data.message ?? '');
                })
                .catch(error => {
                    setErrorCount(prev => prev + 1);
                })
        }, 5 * 1000);

        return () => clearInterval(interval);
    }, []);

    if (errorCount > 0) {
        return (
            <p>There was an error fetching tram stop data, retrying ({errorCount})<LoadingEllipsis /></p>
        )
    }

    if (! trams.length) {
        return (
            <p>Fetching tram stop data<LoadingEllipsis /></p>
        )
    }
  
    return (
        <div className="table">
            {trams.map(tram => (
                <div className="row">
                    <p>{ tram.destination }</p>
                    <p>{ getDueTime(tram.status, tram.wait) }</p>
                </div>
            ))}

            <div className="row">
                <p className="text-center mt-4">{message}</p>
            </div>
        </div>
    )
}

export default TramTimetable