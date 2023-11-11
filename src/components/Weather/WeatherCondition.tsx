import './WeatherCondition.style.css';

const WeatherCondition = ({icon, text}: {icon: string, text: string}) => {
    if (!icon || !text) {
        return null;
    }

    return (
        <div id="weatherCondition">
            <img src={icon}  alt={text}/>
            <p>{text}</p>
        </div>
    )
}

export default WeatherCondition;