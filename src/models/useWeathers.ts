import { useState } from 'react';

const useWeathers = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState('');

  return {
    city,
    setCity,
    weather,
    setWeather,
    temperature,
    setTemperature,
  };
};

export default useWeathers;
