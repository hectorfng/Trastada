
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Timer: React.FC = () => {
  const { t } = useLanguage();
  const [time, setTime] = useState(0); // time in seconds
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-100 p-4 rounded-xl text-center">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{t.timerTitle}</h3>
      <div className="text-5xl font-mono text-gray-900 tracking-wider mb-4">
        {formatTime(time)}
      </div>
      <div className="flex justify-center gap-2">
        <button
          onClick={handleStartPause}
          className={`px-4 py-2 w-24 text-white font-semibold text-base rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${isActive ? 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-400' : 'bg-green-500 hover:bg-green-600 focus:ring-green-400'}`}
        >
          {isActive ? t.pause : t.start}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 w-24 bg-red-500 text-white font-semibold text-base rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all duration-200"
        >
          {t.reset}
        </button>
      </div>
    </div>
  );
};

export default Timer;