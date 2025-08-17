
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SpecialSpaceModalProps {
  message: string;
  onClose: () => void;
}

const SpecialSpaceModal: React.FC<SpecialSpaceModalProps> = ({ message, onClose }) => {
  const { t } = useLanguage();
  const isReward = message.includes(t.reward1.split('!')[1]) || message.includes(t.reward2.split('!')[1]) || message.includes(t.reward3.split('!')[1]) || message.includes(t.reward4.split('!')[1]) || message.includes(t.reward5.split('!')[1]);
  const title = isReward ? t.luckyYou : t.ohNo;
  const titleColor = isReward ? "text-purple-600" : "text-red-600";
  const buttonColor = isReward ? "bg-purple-500 hover:bg-purple-600 focus:ring-purple-300" : "bg-red-500 hover:bg-red-600 focus:ring-red-300";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all animate-scale-in">
        <h2 className={`text-3xl font-bold ${titleColor} mb-4`}>{title}</h2>
        <div className="p-4 bg-gray-100 rounded-lg my-6">
          <p className="text-2xl font-medium text-gray-800">{message}</p>
        </div>
        <button
          onClick={onClose}
          className={`w-full mt-4 py-3 px-6 text-white font-bold text-xl rounded-lg shadow-lg focus:outline-none focus:ring-4 ${buttonColor} transform hover:scale-105 transition-transform`}
        >
          {t.ok}
        </button>
      </div>
    </div>
  );
};

export default SpecialSpaceModal;