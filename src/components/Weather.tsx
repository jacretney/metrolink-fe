import {useEffect, useState} from "react";
import axios from 'axios';
import {WeatherData} from "../data/WeatherData";

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
        <>
            <p>{ weatherData.temperature }°c</p>
            <img src={weatherData.condition.icon}  alt={weatherData.condition.text}/>
            <p>{weatherData.condition.text}</p>
        </>
    )
}

export default Weather;