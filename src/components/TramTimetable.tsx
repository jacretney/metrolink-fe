import { useEffect, useState } from "react";
import axios from 'axios';
import { TramStopResponse } from "../data/TramStopResponse";
import { Tram } from "../data/Tram";

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

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get<TramStopResponse>('/stops/129036')
                .then(async response => {
                    const { data } = response.data;

                    setTrams(data.trams);
                    setMessage(data.message ?? '');
                });
        }, 5 * 1000);

        return () => clearInterval(interval);
    }, []);

  
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