import { useState } from 'react';
import './App.less';
import { BsFillCloudFill } from 'react-icons/bs';
import axios from 'axios';

const cities = [
    {
        ottawa: {
            lat: 45.42,
            lon: -75.69
        }
    },
    {
        moscow: {
            lat: 55.75,
            lon: 37.61
        }
    },
    {
        tokyo: {
            lat: 35.68,
            lon: 139.75
        }
    }
];
console.log(cities);

const LargeBlock = () => (
    <div className="card__highlight">
        <h2>Today</h2>
        <div className="highlight__row">
            <BsFillCloudFill fontSize={60} />
            <div>
                <span className="highlight__temp">19°</span>
                <p className="highlight__skies">clouds</p>
            </div>
        </div>
    </div>
);

const SmallBlock = (
    { day, temp }: any // type this
) => (
    <div className="row__item">
        <h3 className="row__item__day">{day}</h3>
        <BsFillCloudFill fontSize={24} />
        <p className="row__item__temp">{temp}</p>
    </div>
);

// -75.69
// 45.42

// convert to a class component
function App() {
    const [count, setCount] = useState(0);

    const handleTabChange = () => {
        console.log('clicked');
    };

    console.log(import.meta.env.VITE_WEATHER_API_KEY);
    const fetchCoords = async () => {
        try {

            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=35.68&lon=139.76&units=metric&appid=${
                    import.meta.env.VITE_WEATHER_API_KEY
                }`
            );
            console.log('res', res.data);
        } catch (err) {
            console.log('axios err', err);
        }
    };

    fetchCoords();

    return (
        <div className="root">
            <div className="tabs">
                <button className="tab active" onClick={handleTabChange}>
                    Ottawa
                </button>
                <button className="tab" onClick={handleTabChange}>
                    Moscow
                </button>
                <button className="tab" onClick={handleTabChange}>
                    Tokyo
                </button>
            </div>

            <div className="card">
                <LargeBlock />
                <div className="card__row">
                    <SmallBlock day="Wed" temp="18°" />
                    <SmallBlock day="Thurs" temp="19°" />
                    <SmallBlock day="Fri" temp="20°" />
                    <SmallBlock day="Sat" temp="21°" />
                </div>
            </div>
        </div>
    );
}

export default App;
