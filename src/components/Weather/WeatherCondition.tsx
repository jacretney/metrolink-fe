import './WeatherCondition.style.css';

const WeatherCondition = ({icon, text, rainChance}: {icon: string, text: string, rainChance: number}) => {
    return (
        <div id="weatherCondition">
            <img src={icon} alt={text}/>
            <p>{ rainChance }% 🌧️</p>
        </div>
    )
}

WeatherCondition.defaultProps = {
    icon: '',
    text: '',
    rainChance: 0,
}

export default WeatherCondition;