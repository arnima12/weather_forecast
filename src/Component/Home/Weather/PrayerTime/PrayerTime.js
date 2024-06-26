import React, { useEffect, useState } from 'react';

const PrayerTime = ({ latitude, longitude }) => {
    console.log("latitude", latitude)
    console.log("longitude", longitude)
    const [prayerTime, setPrayerTime] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            getPrayerTime();
        }
    }, [latitude, longitude]);
    const getPrayerTime = async () => {
        try {

            const currentDate = new Date();
            const months = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];
            const day = currentDate.getDate();
            const apiMonth = currentDate.getMonth() + 1;
            const month = months[currentDate.getMonth()];
            const year = currentDate.getFullYear();
            const formattedDate = `${day} ${month} ${year}`;
            console.log("formattedDate", formattedDate);
            const response = await fetch(`https://api.aladhan.com/v1/calendar/${year}/${apiMonth}?latitude=${latitude}&longitude=${longitude}`);
            const data = await response.json();
            if (response.ok) {
                const todayTiming = data.data.map(date => {
                    const matchingDateObject = data.data.find(date => date.date.readable === formattedDate);
                    console.log("matchingDateObject", matchingDateObject)
                    if (matchingDateObject) {
                        const timings = matchingDateObject.timings;
                        const localTimings = {};
                        Object.keys(timings).forEach(key => {
                            const timeParts = timings[key].split(':');
                            const hours = parseInt(timeParts[0]);
                            const minutes = parseInt(timeParts[1].split(' ')[0]);
                            const ampm = timeParts[1].split(' ')[1];
                            let localHours = hours;
                            if (ampm === 'PM' && hours !== 12) {
                                localHours += 12;
                            }
                            localTimings[key] = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), localHours, minutes).toLocaleTimeString();
                        });
                        console.log(timings.Asr)
                        setPrayerTime(localTimings);
                    } else {
                        console.log("No timings found for", formattedDate);
                    }
                });

            } else {
                console.error('Failed to fetch prayer time:', data.message);

            }
        } catch (error) {
            console.error('Error fetching prayer time:', error);

        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            {loading ?
                <div
                    class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status">
                    <span
                        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                </div>
                :
                <div className="grid grid-cols-2">
                    {prayerTime &&
                        <>
                            <div className="text-left ml-16">
                                <h3>Fajr</h3>
                                <h3>Dhuhr</h3>
                                <h3>Asr</h3>
                                <h3>Maghrib</h3>
                                <h3>Isha</h3>
                            </div>
                            <div className="text-left ml-16">
                                <h3>{prayerTime.Fajr}</h3>
                                <h3>{prayerTime.Dhuhr}</h3>
                                <h3>{prayerTime.Asr}</h3>
                                <h3>{prayerTime.Maghrib}</h3>
                                <h3>{prayerTime.Isha}</h3>
                            </div>
                        </>}

                </div>}
        </div>
    );
};

export default PrayerTime;