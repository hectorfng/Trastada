
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface DiceProps {
  onRoll: (value: number) => void;
  disabled: boolean;
  isRolling: boolean;
  value: number | null;
}

const Dice: React.FC<DiceProps> = ({ onRoll, disabled, isRolling, value }) => {
  const { t } = useLanguage();
  const [displayValue, setDisplayValue] = useState(1);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRolling) {
      interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 6) + 1);
      }, 50);
    } else if (value !== null) {
      setDisplayValue(value);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRolling, value]);

  const handleRoll = () => {
    if (!disabled) {
      const rollValue = Math.floor(Math.random() * 6) + 1;
      onRoll(rollValue);
    }
  };

  const DieFace = ({ val }: { val: number }) => {
    return (
        <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg shadow-lg flex items-center justify-center transition-all">
            <span className="text-4xl md:text-5xl font-bold text-indigo-700">{val}</span>
        </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <DieFace val={displayValue} />
      <button
        onClick={handleRoll}
        disabled={disabled}
        className="px-6 py-2 md:px-8 md:py-3 bg-indigo-600 text-white font-bold text-lg md:text-xl rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none transition-all duration-200"
      >
        {isRolling ? t.rolling : t.rollDice}
      </button>
    </div>
  );
};

export default Dice;