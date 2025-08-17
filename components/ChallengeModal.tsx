
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ChallengeModalProps {
  challenge: string;
  isLoading: boolean;
  onClose: () => void;
}

const ChallengeModal: React.FC<ChallengeModalProps> = ({ challenge, isLoading, onClose }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center transform transition-all animate-scale-in">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">{t.challengeTime}</h2>
        <div className="min-h-[100px] flex items-center justify-center p-4 bg-blue-50 rounded-lg my-6">
          {isLoading ? (
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
                <p className="mt-4 text-lg text-gray-600">{t.generatingChallenge}</p>
            </div>
          ) : (
            <p className="text-2xl font-medium text-gray-800">{challenge}</p>
          )}
        </div>
        <button
          onClick={onClose}
          disabled={isLoading}
          className="w-full mt-4 py-3 px-6 bg-green-500 text-white font-bold text-xl rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:bg-gray-400 disabled:cursor-wait transform hover:scale-105 transition-transform"
        >
          {isLoading ? t.pleaseWait : t.challengeComplete}
        </button>
      </div>
    </div>
  );
};

export default ChallengeModal;