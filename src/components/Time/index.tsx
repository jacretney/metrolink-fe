import {useEffect, useState} from "react";

import './index.style.css';

const Time = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    });

    return (
        <p id="time">
            {time.getHours()}
            <span>:</span>
            {time.getMinutes()}
            <span>:</span>
            {time.getSeconds().toString().padStart(2, '0')}
        </p>
    );
}

export default Time;