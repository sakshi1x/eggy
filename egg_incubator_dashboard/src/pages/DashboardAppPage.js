import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';

import axios from 'axios';
import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Switch } from '@mui/material';
import {thermometer} from '../css/thermometer.css';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,


  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import Thermometer from "../sections/@dashboard/app/AppThermometer";
import  HumidityGraph from "../sections/@dashboard/app/AppHumidity";






// ----------------------------------------------------------------------


export default function DashboardAppPage() {
  const theme = useTheme();
  const [checkedRelay1, setCheckedRelay1] = useState(false);
  const [checkedRelay2, setCheckedRelay2] = useState(false);
  const [checkedRelay3, setCheckedRelay3] = useState(false);
  const [checkedRelay4, setCheckedRelay4] = useState(false);
  const [sensorData, setSensorData] = useState({});
  const [bulbStatus, setBulbStatus] = useState(false);
  const [fanStatus1, setFanStatus1] = useState(false);
  const [fanStatus2, setFanStatus2] = useState(false);
  const [humidifier, setHumidifier] = useState(false);
  const [result, setResult] = useState('Off');
  const [result1, setResult1] = useState('Off');

  const [result2, setResult2] = useState('Off');
  const [result3, setResult3] = useState('Off');

  const handleFanAData = async () => {
    // Define data to be sent

    setFanStatus1(!fanStatus1);
    setResult1(fanStatus1 ? 'On' : 'Off');
    const iconElement = document.querySelector('.MuiCard-root .StyledIcon');
    iconElement.classList.add('button-clicked');
    setTimeout(() => {
      iconElement.classList.remove('button-clicked');
    }, 300);
  };

  const handleFanBData = async () => {
    // Define data to be sent

    setFanStatus2(!fanStatus2);
    setResult2(fanStatus2 ? 'On' : 'Off');
  };
  const handleHumidifier = async () => {
    // Define data to be sent

    setHumidifier(!humidifier);
    setResult3(humidifier ? 'On' : 'Off');
  };
  const handleBulbData = async () => {
    // Define data to be sent

    setBulbStatus(!bulbStatus);
    setResult(bulbStatus ? 'On' : 'Off');
  };
  const getData = async () => {
    const response = await axios.get("http://localhost:5000/api/get-relay");
    setCheckedRelay1(response.data.relay1)
    setCheckedRelay2(response.data.relay2)
    setCheckedRelay3(response.data.relay3)
    setCheckedRelay4(response.data.relay4)
  }

  useEffect(() => {
    getData()
    setInterval(() => getSensorData(), 1000);
  }, [])
  const handleRelay1 = async () => {
    setFanStatus2(!fanStatus2);
    setResult2(fanStatus2 ? 'On' : 'Off');
    const response = await axios.post("http://localhost:5000/api/set-relay", {
      "relay1": !checkedRelay1,
      "relay2": checkedRelay2,
      "relay3": checkedRelay3,
      "relay4": checkedRelay4
    });
    getData()
  }
  const handleRelay2 = async () => {
    setFanStatus2(!fanStatus2);
    setResult2(fanStatus2 ? 'On' : 'Off');
    const response = await axios.post("http://localhost:5000/api/set-relay", {
      "relay1": checkedRelay1,
      "relay2": !checkedRelay2,
      "relay3": checkedRelay3,
      "relay4": checkedRelay4
    });
    getData()
  }
  const handleRelay3 = async () => {
    setHumidifier(!humidifier);
    setResult3(humidifier ? 'On' : 'Off');
    const response = await axios.post("http://localhost:5000/api/set-relay", {
      "relay1": checkedRelay1,
      "relay2": checkedRelay2,
      "relay3": !checkedRelay3,
      "relay4": checkedRelay4
    });
    getData()
  }
  const handleRelay4 = async () => {
    setBulbStatus(!bulbStatus);
    setResult(bulbStatus ? 'On' : 'Off');
    const response = await axios.post("http://localhost:5000/api/set-relay", {
      "relay1": checkedRelay1,
      "relay2": checkedRelay2,
      "relay3": checkedRelay3,
      "relay4": !checkedRelay4
    });
    getData()
  }

  const getSensorData = async () => {
    const response = await axios.get("http://localhost:5000/api/sensor-data");
    setSensorData(response.data.data);
  }

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hatch a smile!!!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
                onClick={handleFanAData}
                title="Fan A"
                condition={result1}
                total={0}
                icon={'fa-solid:fan'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
                title="Fan B"
                condition={result2}
                total={0}
                color="info"
                icon={'fa-solid:fan'}
                onClick={handleFanBData}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} >
            <AppWidgetSummary
                onClick={handleBulbData}
                title="Bulb"
                condition={result}
                total={0}
                color="warning"
                icon={'ion:bulb'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
                title="Humidifier"
                condition={result3}
                total={0}
                color="error"
                icon={'carbon:humidity-alt'}
                onClick={handleHumidifier}
            />
          </Grid>
          <Switch
              checked={checkedRelay1}
              onChange={
                () => handleRelay1()
              }
              inputProps={{ 'aria-label': 'controlled' }}
          />

          <Switch
              checked={checkedRelay2}
              onChange={
                () => handleRelay2()
              }
              inputProps={{ 'aria-label': 'controlled' }}
          />

          <Switch
              checked={checkedRelay3}
              onChange={
                () => handleRelay3()
              }
              inputProps={{ 'aria-label': 'controlled' }}
          />

          <Switch
              checked={checkedRelay4}
              onChange={
                () => handleRelay4()
              }
              inputProps={{ 'aria-label': 'controlled' }}
          />




          <Grid item xs={12} md={6} lg={4} container>


          <div>
              Humidity:
              {sensorData.hum ?? 60}
              <HumidityGraph sensorData={sensorData.hum ?? 60} />
            </div>

          </Grid>


          <Grid item xs={12} md={6} lg={4}container justifyContent="right" alignItems="right">

            <div >
              <Thermometer temperature={sensorData.temp ?? 98} />
            </div>
          </Grid>

        </Grid>
      </Container>
    </>
  );
}