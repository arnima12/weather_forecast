import React, { useEffect, useState } from 'react';
import { BsCloudDrizzleFill } from 'react-icons/bs';
import { FaCloud, FaCloudSun } from 'react-icons/fa';
import { IoIosRainy, IoMdSunny } from 'react-icons/io';
import { RiMistFill } from 'react-icons/ri';

const Temperature = ({ latitude, longitude }) => {
    console.log("latitude", latitude)
    console.log("longitude", longitude)
    const [temperature, setTemperature] = useState(null);
    const [weatherDescription, setWeatherDescription] = useState(null);
    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            getCurrentTemperature();
        } else (
            console.log("error")
        )
    }, [latitude, longitude]);
    const getCurrentTemperature = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e875b2456b21efcc5ff9c06e6a3155c2`);
            const data = await response.json();
            if (response.ok) {
                const kelvin = data.main.temp;
                console.log(kelvin)
                const celsius = (kelvin - 273.15).toFixed(2);
                const weatherDescription = data.weather.map((weather) => weather.main);
                setTemperature(parseFloat(celsius));
                setWeatherDescription(weatherDescription)
            } else {
                console.error('Failed to fetch temperature:', data.message);
                setTemperature(null);
                setWeatherDescription(null);
            }
        } catch (error) {
            console.error('Error fetching temperature:', error);
            setTemperature(null);
            setWeatherDescription(null);
        }
    };
    return (
        <div>
            <div className="flex justify-center gap-2">
                <p>
                    {weatherDescription && (
                        <>
                            {weatherDescription.includes("Haze") && <FaCloudSun />}
                            {weatherDescription.includes("Rain") && <IoIosRainy />}
                            {weatherDescription.includes("Clouds") && <FaCloud />}
                            {weatherDescription.includes("Drizzle") && <BsCloudDrizzleFill />}
                            {weatherDescription.includes("Mist") && <RiMistFill />}
                            {weatherDescription.includes("Clear") && <IoMdSunny />}
                        </>
                    )}
                </p>
                <p> {temperature}&deg;C</p>
            </div>
            <div className="font-semibold capitalize">
                {weatherDescription}
            </div>
        </div>
    );
};

export default Temperature;