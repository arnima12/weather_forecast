import React, { useEffect, useState } from 'react';

const Condition = ({ latitude, longitude }) => {
    const [feelsLike, setFeelsLike] = useState(null);
    const [windSpeed, setWindSpeed] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [sunriseTime, setSunriseTime] = useState(null);
    const [sunsetTime, setSunsetTime] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            getCurrentTemperature();
        }
    }, [latitude, longitude]);
    const getCurrentTemperature = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e875b2456b21efcc5ff9c06e6a3155c2`);
            const data = await response.json();
            if (response.ok) {
                console.log("data", data)
                const feelsLikeKelvin = data.main.feels_like;
                const feelsLikeCelsius = (feelsLikeKelvin - 273.15).toFixed(2);
                const windSpeed = data.wind.speed;
                const humidity = data.main.humidity;
                const sunriseTime = data.sys.sunrise;
                const sunrise = new Date(sunriseTime * 1000);
                const localSunriseTime = sunrise.toLocaleString().split(' ')[1] + " " + sunrise.toLocaleString().split(' ')[2];
                const sunsetTime = data.sys.sunset;
                const sunset = new Date(sunsetTime * 1000);
                const localSunsetTime = sunset.toLocaleString().split(' ')[1] + " " + sunset.toLocaleString().split(' ')[2];
                setFeelsLike(parseFloat(feelsLikeCelsius));
                setWindSpeed(windSpeed);
                setHumidity(humidity);
                setSunriseTime(localSunriseTime);
                setSunsetTime(localSunsetTime);
            } else {
                console.error('Failed to fetch temperature:', data.message);
                setFeelsLike(null);
                setWindSpeed(null);
                setHumidity(null);
                setSunriseTime(null);
                setSunsetTime(null);
            }
        } catch (error) {
            console.error('Error fetching temperature:', error);
            setFeelsLike(null);
            setWindSpeed(null);
            setHumidity(null);
            setSunriseTime(null);
            setSunsetTime(null);
        } finally {
            setLoading(false)
        }
    };
    return (
        <div>
            {
                loading ?
                    <div
                        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                        role="status">
                        <span
                            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span>
                    </div>
                    :
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-left ml-16">
                            <h3>Feels Like </h3>
                            <h3>Wind Speed</h3>
                            <h3>Humidity</h3>
                            <h3>Sunrise</h3>
                            <h3>Sunset</h3>
                        </div>
                        <div className="text-left ml-16">
                            <h3>{feelsLike} &deg;C</h3>
                            <h3>{windSpeed}</h3>
                            <h3>{humidity}</h3>
                            <h3>{sunriseTime}</h3>
                            <h3>{sunsetTime}</h3>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Condition;