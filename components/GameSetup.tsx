import React, { useState, useCallback } from 'react';
import { AVATARS } from '../constants';
import type { Player, AvatarId } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface GameSetupProps {
  onStartGame: (players: Omit<Player, 'id' | 'position' | 'missNextTurn'>[]) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  const { language, setLanguage, t } = useLanguage();
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [players, setPlayers] = useState<Omit<Player, 'id' | 'position' | 'missNextTurn'>[]>(
    Array.from({ length: 2 }, () => ({ name: '', age: 10, avatarId: 'alien' }))
  );

  const handlePlayerCountChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value, 10);
    setPlayerCount(count);
    setPlayers(currentPlayers => {
      const newPlayers = [...currentPlayers];
      if (count > newPlayers.length) {
        for (let i = newPlayers.length; i < count; i++) {
          newPlayers.push({ name: '', age: 10, avatarId: AVATARS[i % AVATARS.length].id });
        }
      }
      return newPlayers.slice(0, count);
    });
  }, []);

  const handlePlayerChange = <K extends keyof Omit<Player, 'id' | 'position' | 'missNextTurn'>>(index: number, field: K, value: Omit<Player, 'id' | 'position' | 'missNextTurn'>[K]) => {
    setPlayers(current => {
      const newPlayers = [...current];
      newPlayers[index] = { ...newPlayers[index], [field]: value };
      return newPlayers;
    });
  };

  const handleStartGame = () => {
    const validPlayers = players.every(p => p.name.trim() !== '' && p.age > 0 && p.age < 120);
    if (validPlayers) {
      onStartGame(players);
    } else {
      alert(t.validationAlert);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-10 max-w-4xl mx-auto animate-fade-in relative">
      <div className="absolute top-4 right-4 flex gap-2">
        <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${language === 'en' ? 'bg-indigo-600 text-white shadow' : 'bg-white/50 text-indigo-700 hover:bg-white/80'}`}>EN</button>
        <button onClick={() => setLanguage('es')} className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${language === 'es' ? 'bg-indigo-600 text-white shadow' : 'bg-white/50 text-indigo-700 hover:bg-white/80'}`}>ES</button>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-700 mb-2 tracking-tight">{t.gameTitle}</h1>
      <p className="text-center text-gray-600 mb-8 text-lg">{t.gameSubtitle}</p>
      
      <div className="mb-6">
        <label htmlFor="player-count" className="block text-xl font-medium text-gray-700 mb-2">{t.playerCountLabel}</label>
        <select
          id="player-count"
          value={playerCount}
          onChange={handlePlayerCountChange}
          className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg text-gray-900"
        >
          {[2, 3, 4, 5, 6].map(num => <option key={num} value={num}>{num}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {players.map((player, index) => (
          <div key={index} className="bg-indigo-50 p-4 rounded-xl border-2 border-indigo-200">
            <h3 className="text-xl font-semibold text-indigo-800 mb-4">{t.playerHeader} {index + 1}</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder={t.playerNamePlaceholder}
                value={player.name}
                onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <div>
                <label htmlFor={`player-age-${index}`} className="block text-sm font-medium text-gray-700 mb-2">{t.playerAgePlaceholder}</label>
                <select
                  id={`player-age-${index}`}
                  value={player.age}
                  onChange={(e) => handlePlayerChange(index, 'age', parseInt(e.target.value, 10))}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                >
                  {Array.from({ length: 63 }, (_, i) => i + 3).map(age => (
                    <option key={age} value={age} className="text-black">{age < 65 ? age : '65+'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.avatarLabel}</label>
                <div className="flex flex-wrap gap-2">
                  {AVATARS.map(avatar => (
                    <button
                      key={avatar.id}
                      onClick={() => handlePlayerChange(index, 'avatarId', avatar.id)}
                      className={`w-12 h-12 p-1.5 rounded-full transition-all duration-200 ${player.avatarId === avatar.id ? 'bg-indigo-500 ring-4 ring-indigo-300' : 'bg-gray-200 hover:bg-indigo-200'}`}
                    >
                      <div className={avatar.color}>{avatar.component}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleStartGame}
        className="w-full mt-8 py-4 px-6 bg-green-500 text-white font-bold text-2xl rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transform hover:scale-105 transition-transform"
      >
        {t.startGameButton}
      </button>

      <footer className="text-center mt-8 text-sm text-gray-600">
        <p>Creado por Hector Fong</p>
      </footer>
    </div>
  );
};

export default GameSetup;