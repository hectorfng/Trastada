
import React, { useState, useCallback, useEffect } from 'react';
import { GameState, Player } from './types';
import GameSetup from './components/GameSetup';
import GameBoard from './components/GameBoard';
import WinnerModal from './components/WinnerModal';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Setup);
  const [players, setPlayers] = useState<Player[]>([]);
  const [winner, setWinner] = useState<Player | null>(null);

  const startGame = useCallback((newPlayers: Omit<Player, 'id' | 'position' | 'missNextTurn'>[]) => {
    const initializedPlayers = newPlayers.map((p, index) => ({
      ...p,
      id: index,
      position: 0,
      missNextTurn: false,
    }));
    setPlayers(initializedPlayers);
    setGameState(GameState.Playing);
    setWinner(null);
  }, []);

  const handleGameEnd = useCallback((winningPlayer: Player) => {
    setWinner(winningPlayer);
    setGameState(GameState.GameOver);
  }, []);

  const handlePlayAgain = useCallback(() => {
    setPlayers([]);
    setWinner(null);
    setGameState(GameState.Setup);
  }, []);
  
  return (
    <LanguageProvider>
      <div className="bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-400 min-h-screen w-full flex items-center justify-center font-sans p-4">
        <div className="w-full max-w-7xl mx-auto">
          {gameState === GameState.Setup && <GameSetup onStartGame={startGame} />}
          {gameState === GameState.Playing && <GameBoard players={players} onGameEnd={handleGameEnd} />}
          {gameState === GameState.GameOver && winner && (
            <WinnerModal winner={winner} onPlayAgain={handlePlayAgain} />
          )}
        </div>
      </div>
    </LanguageProvider>
  );
};

export default App;