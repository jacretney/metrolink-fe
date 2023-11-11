export interface WeatherData
{
    temperature: number;
    condition: Condition;
}

interface Condition
{
    text: string;
    icon: string;
}