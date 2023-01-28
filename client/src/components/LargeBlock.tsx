import { motion } from 'framer-motion';
import { WiTime4 } from 'react-icons/wi';
import { iconMap } from '../constants';
import { Weather } from '../types';

type LargeBlockProps = {
    currentWeather?: Weather;
};

const LargeBlock = ({ currentWeather }: LargeBlockProps) => {
    if (currentWeather) {
        const { temp, skies } = currentWeather;

        const [icon] = iconMap.filter(
            (icon) => icon.skies === skies.toLowerCase()
        );
        return (
            <motion.div
                key="lg-loaded"
                className="lg__block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <h2>Today</h2>
                <div className="lg__block__row">
                    {icon.icon({ fontSize: 92 })}
                    <div className="lg__block__text">
                        <span className="lg__block__temp">
                            {Math.round(temp)}°
                        </span>
                        <p className="lg__block__skies">{skies}</p>
                    </div>
                </div>
            </motion.div>
        );
    } else {
        return (
            <div className="lg__block">
                <h2>Today</h2>
                <div className="lg__block__row">
                    <WiTime4 fontSize={92} />
                    <div className="lg__block__text">
                        <p className="lg__block__skies">Loading...</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default LargeBlock;
