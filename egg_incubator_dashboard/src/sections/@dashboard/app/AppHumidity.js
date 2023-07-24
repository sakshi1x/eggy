import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HumidityGraph = ({ sensorData }) => {
    const humidityData = [
        { date: '01/01/2003', humidity: 45 },
        { date: '02/01/2003', humidity: 50 },
        { date: '03/01/2003', humidity: 55 },
        { date: '04/01/2003', humidity: 58 },
        { date: '05/01/2003', humidity: 60 },
        { date: '06/01/2003', humidity: 62 },
        { date: '07/01/2003', humidity: 65 },
        { date: '08/01/2003', humidity: 68 },
        { date: '09/01/2003', humidity: 70 },
        { date: '10/01/2003', humidity: 75 },
        { date: '11/01/2003', humidity: sensorData || 60 },
    ];

    return (
        <LineChart width={500} height={400} data={humidityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            {/* Customize the appearance of the Line */}
            <Line type="monotone" dataKey="humidity" name="Humidity" stroke="#FF5722" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
    );
};

export default HumidityGraph;
