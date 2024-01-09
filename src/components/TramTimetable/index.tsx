import { useEffect, useState } from "react";
import axios from 'axios';
import './index.style.css';

import { TramStopResponse } from "../../data/TramStopResponse";
import { Tram } from "../../data/Tram";
import LoadingEllipsis from "../LoadingEllipsis";
import getUrl from "../../helpers/url";

function getDueTime(status: string, minutes: number): string 
{
    if (status === 'Due') {
        return `${minutes} mins`;
    }

    return status;
}

function TramTimetable() {
    const [stopId, setStopId] = useState(0);
    const [trams, setTrams] = useState<Tram[]>([]);
    const [message, setMessage] = useState('');
    const [errorCount, setErrorCount] = useState(0);

    useEffect(() => {
        if (stopId !== 0) {
            return;
        }

        axios.post<TramStopResponse>(getUrl('/stops/search'), {
            name: 'Cornbrook',
            direction: 'Incoming',
        })
            .then(response => {
                const { data } = response.data;
                setStopId(data.id);
            })
            .catch(error => {
                setErrorCount(prev => prev + 1);
            })
    }, [stopId]);

    useEffect(() => {
        if (stopId === 0) {
            return;
        }

        const interval = setInterval(() => {
            axios.get<TramStopResponse>(getUrl(`/stops/${stopId}`))
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
    }, [stopId]);

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
        <div id="tramTimetable">
            <div>
                {trams.map(tram => (
                    <div className="row">
                        <p>{ tram.destination }</p>
                        <p>{ getDueTime(tram.status, tram.wait) }</p>
                    </div>
                ))}
            </div>

            <p id="tramTimetableMessage" className="text-center mt-4">{message}</p>
        </div>
    )
}

export default TramTimetable;