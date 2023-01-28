import { motion } from 'framer-motion';
import { WiTime4 } from 'react-icons/wi';
import { iconMap } from '../constants';
import { Forecast } from '../types';

type SmallBlocksProps = {
    forecasts?: Forecast[];
    forecastDays: number;
};

const SmallBlocks = ({ forecasts, forecastDays }: SmallBlocksProps) => {
    if (forecasts) {
        return (
            <motion.div
                className="card__row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                key="sm-loaded"
            >
                {forecasts.map((forecast) => {
                    const { date, temp, skies } = forecast;
                    const [icon] = iconMap.filter(
                        (icon) => icon.skies === skies.toLowerCase()
                    );
                    return (
                        <div className="sm__block" key={forecast.date}>
                            <h3 className="sm__block__day">
                                {new Date(date).toDateString().slice(0, 3)}
                            </h3>
                            {icon.icon({ fontSize: 48 })}
                            <p className="sm__block__temp">
                                {Math.round(temp)}°
                            </p>
                        </div>
                    );
                })}
            </motion.div>
        );
    } else {
        return (
            <div className="card__row">
                {[...Array(forecastDays).keys()].map((key) => (
                    <div className="sm__block" key={key}>
                        <h3 className="sm__block__day">Loading</h3>
                        <WiTime4 fontSize={48} />
                        <p className="sm__block__temp">°</p>
                    </div>
                ))}
            </div>
        );
    }
};

export default SmallBlocks;
