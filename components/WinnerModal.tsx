
import React from 'react';
import { Player } from '../types';
import { getAvatarById } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface WinnerModalProps {
  winner: Player;
  onPlayAgain: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onPlayAgain }) => {
  const { t } = useLanguage();
  const avatar = getAvatarById(winner.avatarId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-yellow-200 to-orange-300 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all animate-scale-in border-4 border-yellow-400">
        <h2 className="text-5xl font-extrabold text-orange-600 mb-4 drop-shadow-lg">{t.winner}</h2>
        
        <div className="flex flex-col items-center my-6">
            <div className="w-32 h-32 p-2 rounded-full bg-white shadow-lg ring-4 ring-yellow-500">
                {avatar && <div className={`${avatar.color} w-full h-full`}>{avatar.component}</div>}
            </div>
            <p className="text-4xl font-bold text-gray-800 mt-4">{winner.name}</p>
        </div>

        <p className="text-xl text-gray-700 mb-8">{t.congratulations}</p>

        <button
          onClick={onPlayAgain}
          className="w-full mt-4 py-4 px-6 bg-green-500 text-white font-bold text-2xl rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transform hover:scale-105 transition-transform"
        >
          {t.playAgain}
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;