import React, { useState } from 'react';
import morning from "../../../images/morning-image.jpg";
import afternoon from "../../../images/afternoon-image.jpg";
import evening from "../../../images/evening-image.jpg";
import night from "../../../images/night-image.jpg";
import SearchLocation from './SearchLocation/SearchLocation';
import TimeStamp from './TimeStamp/TimeStamp';
import Temperature from './Temperature/Temperature';
import Condition from './Condition/Condition';
import PrayerTime from './PrayerTime/PrayerTime';

const Weather = () => {
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [timeCategory, setTimeCategory] = useState('');
    const handleAddressChange = (newAddress) => {
        setAddress(newAddress);
    };
    const handleLatitudeChange = (newLatitude) => {
        setLatitude(newLatitude)
    }
    const handleLongitudeChange = (newLongitude) => {
        setLongitude(newLongitude)
    }
    const handleTimeCategoryChange = (category) => {
        setTimeCategory(category);
    }
    let bgImage = '';
    if (timeCategory === 'Morning') {
        bgImage = morning;
    } else if (timeCategory === 'Afternoon') {
        bgImage = afternoon;
    } else if (timeCategory === 'Evening') {
        bgImage = evening;
    } else {
        bgImage = night;
    }
    return (
        <div className="hero min-h-screen pb-8" style={{ backgroundSize: 'cover', backgroundImage: `url(${bgImage})` }}>
            <div className="grid gap-12 md:grid-cols-2 md:gap-48 mt-8 overflow-hidden">
                <div className="flex flex-col justify-center gap-4">
                    <SearchLocation onAddressChange={handleAddressChange} onLatitudeChange={handleLatitudeChange} onLongitudeChange={handleLongitudeChange} />
                    <h1 className={`text-5xl font-bold ${timeCategory === 'morning' || timeCategory === 'afternoon' ? 'text-black' : 'text-white'}`}>Good {timeCategory}</h1>
                    <h3 className={`text-3xl font-bold ${timeCategory === 'morning' || timeCategory === 'afternoon' ? 'text-black' : 'text-white'}`}><Temperature latitude={latitude} longitude={longitude} /></h3>
                    <h2 className={`text-4xl font-semibold ${timeCategory === 'morning' || timeCategory === 'afternoon' ? 'text-black' : 'text-white'}`}>{address}</h2>
                    <TimeStamp onTimeCategoryChange={handleTimeCategoryChange}>
                        <div className={`text-2xl font-semibold ${timeCategory === 'morning' || timeCategory === 'afternoon' ? 'text-black' : 'text-white'}`}>
                        </div>
                    </TimeStamp>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className="w-96 shadow-2xl text-white pb-4" style={{ "backgroundColor": 'rgba(0, 0, 0, 0.5)' }}>
                        <h4>Today's weather condition</h4>
                        <hr />
                        <div className="mt-4">
                            <Condition latitude={latitude} longitude={longitude} />
                        </div>
                    </div>
                    <div className="w-96 shadow-2xl text-white pb-4" style={{ "backgroundColor": 'rgba(0, 0, 0, 0.5)' }}>
                        <h4>Prayer Time</h4>
                        <hr />
                        <div className="mt-4">
                            <PrayerTime latitude={latitude} longitude={longitude} />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Weather;