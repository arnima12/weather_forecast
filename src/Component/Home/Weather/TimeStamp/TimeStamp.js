import React, { useEffect, useState } from 'react';

const TimeStamp = ({ onTimeCategoryChange }) => {
    const [time, setTime] = useState(null);
    const [textColor, setTextColor] = useState('');
    useEffect(() => {
        getTime();
        const intervalId = setInterval(() => {
            getTime();
        }, 1000);

        // Clean up the interval to avoid memory leaks
        return () => clearInterval(intervalId);
    }, []);

    const getTime = () => {
        const currentTime = new Date();
        const hour = currentTime.getHours();
        console.log("hour", hour)
        let timeCategory = '';

        if (hour >= 6 && hour < 12) {
            timeCategory = 'Morning';
        } else if (hour >= 12 && hour < 18) {
            timeCategory = 'Afternoon';
        } else if (hour >= 18 && hour < 19) {
            timeCategory = 'Evening';
        } else {
            timeCategory = 'Night'
        }
        const formattedTime = currentTime.toLocaleString().split(' ')[1] + " " + currentTime.toLocaleString().split(' ')[2];
        setTime(formattedTime);
        onTimeCategoryChange(timeCategory)
        setTextColor(timeCategory === 'Morning' || timeCategory === 'Afternoon' ? 'black' : 'white');
    };

    return (
        <div>
            {time &&
                <p className="text-2xl font-semibold" style={{ color: textColor }}>
                    {time}
                </p>
            }
        </div>
    );
};
export default TimeStamp;