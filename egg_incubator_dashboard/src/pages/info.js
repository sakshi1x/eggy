import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InfoPage = () => {
    const [enrollment, setEnrollment] = useState(0);
    const [hatched, setHatched] = useState(0);

    const handleEnrollmentChange = (event) => {
        const value = event.target.value;
        setEnrollment(Number(value));
    };

    const handleEnrollmentSubmit = () => {
        // Calculate the number of hatched chickens based on the enrollment
        // For simplicity, assume 80% of the enrolled chickens hatched (you can adjust this logic)
        const hatchedChickens = Math.floor(enrollment * 0.8);
        setHatched(hatchedChickens);
    };

    const chickenData = [
        { date: 'Day 1', chickens: 0 },
        { date: 'Day 2', chickens: hatched },
        // Add more data points for other days if needed
    ];

    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ mb: 3 }}>
                Chicken Enrollment and Hatched Data
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="Enroll Chickens"
                        type="number"
                        value={enrollment}
                        onChange={handleEnrollmentChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="primary" onClick={handleEnrollmentSubmit}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
            <Typography variant="h6" sx={{ mt: 3 }}>
                Number of Hatched Chickens: {hatched}
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chickenData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="chickens" name="Chickens Hatched" stroke="#FF5722" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </Container>
    );
};

export default InfoPage;
