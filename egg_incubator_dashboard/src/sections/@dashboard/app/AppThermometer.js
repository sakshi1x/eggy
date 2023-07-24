import React from 'react';



const Thermometer = ({ temperature }) => {
    const getTemperatureColor = () => {
        // Define your logic to determine the color based on temperature range
        // Example logic: Blue for low temperature, Red for high temperature
        if (temperature <= 10) {
            return 'blue';
        } if (temperature >= 30) {
            return 'red';
        }
        return 'red';

    };

    const temperatureColor = getTemperatureColor();

    return (
        <div className="thermometer">
            <div className="mercury" style={{ height: `${ 250}px`, backgroundColor:  '#FF0000 '}} />
            <div className="bulb" style={{ backgroundColor: temperatureColor }} />
            <div className="temperature">{temperature}°C</div>
        </div>
    );
};

export default Thermometer;
