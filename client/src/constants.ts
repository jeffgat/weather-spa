import {
    WiCloudy,
    WiDayHaze,
    WiDaySunny,
    WiDust,
    WiFog,
    WiRain,
    WiSandstorm,
    WiShowers,
    WiSmoke,
    WiSnow,
    WiStrongWind,
    WiThunderstorm,
    WiTornado
} from 'react-icons/wi';

export const TEMP_UNITS = 'metric';
export const FORECAST_DAYS = 4;
export const cities = [
    {
        name: 'ottawa',
        lat: 45.42,
        lon: -75.69
    },
    {
        name: 'moscow',
        lat: 55.75,
        lon: 37.61
    },

    {
        name: 'tokyo',
        lat: 35.68,
        lon: 139.75
    }
];
export const iconMap = [
    {
        skies: 'thunderstorm',
        icon: WiThunderstorm
    },
    {
        skies: 'drizzle',
        icon: WiShowers
    },
    {
        skies: 'rain',
        icon: WiRain
    },
    {
        skies: 'snow',
        icon: WiSnow
    },
    {
        skies: 'clear',
        icon: WiDaySunny
    },
    {
        skies: 'clouds',
        icon: WiCloudy
    },
    {
        skies: 'mist',
        icon: WiFog
    },
    {
        skies: 'smoke',
        icon: WiSmoke
    },
    {
        skies: 'haze',
        icon: WiDayHaze
    },
    {
        skies: 'dust',
        icon: WiDust
    },
    {
        skies: 'fog',
        icon: WiFog
    },
    {
        skies: 'sand',
        icon: WiSandstorm
    },
    {
        skies: 'squall',
        icon: WiStrongWind
    },
    {
        skies: 'tornado',
        icon: WiTornado
    }
];
