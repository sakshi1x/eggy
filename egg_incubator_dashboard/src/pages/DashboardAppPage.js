import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Switch } from '@mui/material';
import Iconify from '../components/iconify';
import { AppWidgetSummary } from '../sections/@dashboard/app';
import Thermometer from '../sections/@dashboard/app/AppThermometer';
import HumidityGraph from '../sections/@dashboard/app/AppHumidity';

const RelayControlWidget = ({ title, condition, onToggle, checked }) => (
  <Grid item xs={12} sm={6} md={3}>
    <AppWidgetSummary onClick={onToggle} title={title} condition={condition} total={0} icon={'fa-solid:fan'} />
    <Switch checked={checked} onChange={onToggle} inputProps={{ 'aria-label': 'controlled' }} />
  </Grid>
);

const DashboardAppPage = () => {
  const theme = useTheme();
  const [sensorData, setSensorData] = useState({});
  const [relayStates, setRelayStates] = useState({
    relay1: false,
    relay2: false,
    relay3: false,
    relay4: false,
  });

  const handleRelayToggle = async (relayNumber) => {
    const updatedStates = {
      ...relayStates,
      [relayNumber]: !relayStates[relayNumber],
    };
    setRelayStates(updatedStates);

    const response = await axios.post('http://localhost:5000/api/set-relay', updatedStates);
    // Handle the response or any error if needed
  };

  const getData = async () => {
    const response = await axios.get('http://localhost:5000/api/get-relay');
    setRelayStates(response.data);
  };

  const getSensorData = async () => {
    const response = await axios.get('http://localhost:5000/api/sensor-data');
    setSensorData(response.data.data);
  };

  useEffect(() => {
    getData();
    const intervalId = setInterval(getSensorData, 1000);

    // Clean up the interval when the component unmounts to avoid memory leaks.
    return () => clearInterval(intervalId);
  }, []);

  const { relay1, relay2, relay3, relay4 } = relayStates;

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
          <RelayControlWidget
            title="Fan A"
            condition={relay1 ? 'On' : 'Off'}
            onToggle={() => handleRelayToggle('relay1')}
            checked={relay1}
          />

          <RelayControlWidget
            title="Fan B"
            condition={relay2 ? 'On' : 'Off'}
            onToggle={() => handleRelayToggle('relay2')}
            checked={relay2}
          />

          <RelayControlWidget
            title="Bulb"
            condition={relay3 ? 'On' : 'Off'}
            onToggle={() => handleRelayToggle('relay3')}
            checked={relay3}
          />

          <RelayControlWidget
            title="Humidifier"
            condition={relay4 ? 'On' : 'Off'}
            onToggle={() => handleRelayToggle('relay4')}
            checked={relay4}
          />

          <Grid item xs={12} md={6} lg={4} container>
            <div>
              Humidity: {sensorData.hum ?? 60}
              <HumidityGraph sensorData={sensorData.hum ?? 60} />
            </div>
          </Grid>

          <Grid item xs={12} md={6} lg={4} container justifyContent="right" alignItems="right">
            <div>
              <Thermometer temperature={sensorData.temp ?? 98} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DashboardAppPage;
