import {useEffect, useState} from "react";
import axios from 'axios';
import './index.style.css';

import {WeatherData} from "../../data/WeatherData";
import WeatherCondition from "./WeatherCondition";

const Weather = () => {
    const [weatherData, setWeatherData] = useState<WeatherData>({
        temperature: 0,
        condition: {
            text: '',
            icon: '',
        }
    });

    useEffect(() => {
        axios.get('/weather').then(response => {
            setWeatherData(response.data.data);
        });
    }, []);

    if (Object.keys(weatherData).length === 0) {
        return null;
    }

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