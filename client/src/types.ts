export type Weather = {
    temp: number;
    skies: string;
};
export type Forecast = Weather & {
    date: string;
};
