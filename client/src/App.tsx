import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LargeBlock from './components/LargeBlock';
import { Forecast, Weather } from './types';
import './App.less';
import { cities, FORECAST_DAYS, TEMP_UNITS } from './constants';
import SmallBlocks from './components/SmallBlocks';

interface AppState {
    activeTab: string;
    currentWeather: Weather | undefined;
    forecasts: Forecast[] | undefined;
    fetchWeatherDisabled: boolean;
}

class App extends Component<{}, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeTab: cities[0].name,
            fetchWeatherDisabled: false,
            currentWeather: undefined,
            forecasts: undefined
        };
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange(val: string) {
        this.setState({
            activeTab: val
        });
    }

    fetchWeather = async () => {
        try {
            for (const city of cities) {
                if (city.name === this.state.activeTab) {
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

                    // Set state
                    this.setState({
                        currentWeather: {
                            temp: data[0].main.temp,
                            skies: data[0].weather[0].main
                        },
                        forecasts: filteredDays
                    });
                }
            }
        } catch (err) {
            console.log('Error fetching weather', err);
        }
    };

    componentDidMount() {
        // Resetting state here to show loading state, and to prevent stale data
        // Would cache the results server-side in production with something like Redis
        // to prevent the loading flashes for better UX
        this.setState({
            currentWeather: undefined,
            forecasts: undefined
        });
        this.fetchWeather();
    }

    componentDidUpdate(_: any, prevState: AppState) {
        if (prevState.activeTab !== this.state.activeTab) {
            this.setState({
                currentWeather: undefined,
                forecasts: undefined
            });
            this.fetchWeather();
        }
    }
    render() {
        return (
            <div className="root">
                <div className="tabs">
                    {cities.map((city) => (
                        <button
                            className={`tab ${
                                this.state.activeTab === city.name
                                    ? 'active'
                                    : ''
                            }`}
                            onClick={() => this.handleTabChange(city.name)}
                            key={city.name}
                        >
                            {city.name}
                        </button>
                    ))}
                </div>

                <div className="card">
                    <LargeBlock currentWeather={this.state.currentWeather} />
                    <SmallBlocks
                        forecasts={this.state.forecasts}
                        forecastDays={FORECAST_DAYS}
                    />
                </div>
            </div>
        );
    }
}

export default App;
