import { useEffect, useState } from 'react';
import axios from 'axios';
import LargeBlock from './components/LargeBlock';
import { Forecast, Weather } from './types';
import './App.less';
import { cities, FORECAST_DAYS, TEMP_UNITS } from './constants';
import SmallBlocks from './components/SmallBlocks';

// convert to a class component
function App() {
    const [activeTab, setActiveTab] = useState<string>(cities[0].name);
    const [currentWeather, setCurrentWeather] = useState<Weather>();
    const [forecasts, setForecasts] = useState<Forecast[]>();

    const handleTabChange = (val: string) => {
        // Resetting state here to show loading state, and to prevent stale data
        // Would likely cache the results server-side in production with something like Redis
        // to prevent the loading flashes for better UX
        setCurrentWeather(undefined);
        setForecasts(undefined);
        setActiveTab(val);
    };

    const fetchWeather = async () => {
        try {
            for (const city of cities) {
                if (city.name === activeTab) {
                    // Fetch weather data
                    const res = await Promise.all([
                        axios.get(
                            `https://api.openweathermap.org/data/2.5/weather?lat=${
                                city.lat
                            }&lon=${city.lon}&units=${TEMP_UNITS}&appid=${
                                import.meta.env.VITE_WEATHER_API_KEY
                            }`
                        ),
                        axios.get(
                            `https://api.openweathermap.org/data/2.5/forecast?lat=${
                                city.lat
                            }&lon=${
                                city.lon
                            }&units=${TEMP_UNITS}&cnt=34&appid=${
                                import.meta.env.VITE_WEATHER_API_KEY
                            }`
                        )
                    ]);

                    const data = res.map((res) => res.data);

                    // Set state
                    setCurrentWeather({
                        temp: data[0].main.temp,
                        skies: data[0].weather[0].main
                    });
                    const filteredDays = [];
                    for (const day of data[1].list) {
                        if (day.dt_txt.includes('15:00:00')) {
                            filteredDays.push({
                                date: day.dt_txt,
                                temp: day.main.temp,
                                skies: day.weather[0].main
                            });
                        }
                    }
                    setForecasts(filteredDays);
                }
            }
        } catch (err) {
            console.log('Error fetching weather', err);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [activeTab]);

    return (
        <div className="root">
            <div className="tabs">
                {cities.map((city) => (
                    <button
                        className={`tab ${
                            activeTab === city.name ? 'active' : ''
                        }`}
                        onClick={() => handleTabChange(city.name)}
                        key={city.name}
                    >
                        {city.name}
                    </button>
                ))}
            </div>

            <div className="card">
                <LargeBlock currentWeather={currentWeather} />
                <SmallBlocks
                    forecasts={forecasts}
                    forecastDays={FORECAST_DAYS}
                />
            </div>
        </div>
    );
}

export default App;
