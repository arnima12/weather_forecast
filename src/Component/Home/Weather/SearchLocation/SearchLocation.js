import React, { useEffect, useState } from 'react';

const SearchLocation = ({ onAddressChange, onLatitudeChange, onLongitudeChange }) => {
    const [location, setLocation] = useState(null);
    useEffect(() => {
        getLocation();
    }, []);
    const getLocation = () => {
        if (navigator.geolocation.getCurrentPosition(showPosition)) {

        }
        else {
            setLocation("Geolocation is not supported by this browser.")
        }
    }
    const showPosition = async (position) => {
        const latitude = position.coords.latitude;
        console.log(latitude)
        const longitude = position.coords.longitude;
        try {
            const url = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
            const data = await url.json();
            if (url.ok) {
                const address = data.display_name;
                const country = data.address.city;
                setLocation(address);
                onAddressChange(country);
                onLatitudeChange(latitude);
                onLongitudeChange(longitude);
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
            setLocation("Error fetching data");
        }
    }
    return (
        <div>
            <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow text-red-600 font-semibold" placeholder="Search" value={location || ''} readOnly />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
        </div>
    );
};

export default SearchLocation;