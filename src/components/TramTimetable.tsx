import TfgmClient from "../data/TfgmApi/TfgmClient";
import TfgmAxiosClient from '../data/TfgmApi/TfgmAxiosClient';
import { useEffect, useState, useMemo } from "react";

function getDueTime(status: string, minutes: string): string 
{
    if (status === 'Due') {
        return `${minutes} mins`;
    }

    return status;
}

function TramTimetable() {
    const client = useMemo(() => new TfgmClient(TfgmAxiosClient), []);

    const [response, setResponse] = useState({
        tram_0_destination: 'Loading...',
        tram_0_arrival: '',
        tram_1_destination: '',
        tram_1_arrival: '',
        message: '',
    });

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('/stops/1') // set this to 127967 when done
            .then(async (response: any) => {
                const { data } = await response.json();
                
                setResponse({
                    tram_0_destination : data.tram_0_destination,
                    tram_0_arrival: data.tram_0_arrival,
                    tram_1_destination : data.tram_1_destination,
                    tram_1_arrival: data.tram_1_arrival,
                    message: data.message
                })
            });
        }, 5 * 1000);

        return () => clearInterval(interval);
    }, [client]);

  
    return (
        <div className="table">
            <div className="row">
                <p>{ response.tram_0_destination }</p>
                <p>{ response.tram_0_arrival }</p>
            </div>

            <div className="row">
                <p>{ response.tram_1_destination }</p>
                <p>{ response.tram_1_arrival }</p>
            </div>

            <div className="row">
                <p className="text-center mt-4">{ response.message }</p>
            </div>
        </div>
    )
}

export default TramTimetable