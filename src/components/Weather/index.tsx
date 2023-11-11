import {useEffect, useState} from "react";
import axios from 'axios';
import './index.style.css';

import {WeatherData} from "../../data/WeatherData";
import WeatherCondition from "./WeatherCondition";

const _formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = date.getHours();
    const minutes = '00';

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const Weather = () => {
    const [time, setTime] = useState<Date>(new Date());
    const [weatherData, setWeatherData] = useState<WeatherData>({
        temperature: 0,
        condition: {
            text: '',
            icon: '',
        }
    });

    // Every 15 minutes, fetch the current weather data
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000 * 15 * 60);

        return () => clearInterval(interval);
    })

    useEffect(() => {
        console.log('Fetching weather data');

        axios.get('/weather', {
            params: {
                date: encodeURIComponent(_formatDate(time)),
            }
        }).then(response => {
            setWeatherData(response.data.data);
        });
    }, [time]);

    return (
        <div id="weatherStickyWrapper">
            <div id="weather">
                <p id="weatherTemperature">{ weatherData.temperature }°c</p>
                <WeatherCondition text={weatherData.condition.text} icon={weatherData.condition.icon}/>
            </div>
        </div>
    )
}

export default Weather;