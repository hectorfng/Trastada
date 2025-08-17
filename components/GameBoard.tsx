import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Player, SpaceType, BoardSpace } from '../types';
import { BOARD_SIZE, SPACE_DEFINITIONS, TILE_POSITIONS, REWARD_DEFINITIONS, PENALTY_DEFINITIONS, getAvatarById } from '../constants';
import PlayerToken from './PlayerToken';
import Dice from './Dice';
import ChallengeModal from './ChallengeModal';
import SpecialSpaceModal from './SpecialSpaceModal';
import { getChallengeFromCatalog } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';
import { Translations } from '../localization';
import Timer from './Timer';

interface GameBoardProps {
  players: Player[];
  onGameEnd: (winner: Player) => void;
}

interface CoreGameState {
    players: Player[];
    currentPlayerIndex: number;
    diceValue: number | null;
    turnState: 'start' | 'rolled' | 'acting' | 'end';
}

const GameBoard: React.FC<GameBoardProps> = ({ players: initialPlayers, onGameEnd }) => {
  const { t, language } = useLanguage();

  const [gameState, setGameState] = useState<CoreGameState>({
    players: initialPlayers,
    currentPlayerIndex: 0,
    diceValue: null,
    turnState: 'start',
  });

  // UI-only state can remain separate
  const [isRolling, setIsRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [challenge, setChallenge] = useState({ text: '', isLoading: false });
  const [showSpecialSpaceModal, setShowSpecialSpaceModal] = useState(false);
  const [specialMessage, setSpecialMessage] = useState('');

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];

  const boardSpaces = useMemo(() => {
    let rewardIndex = 0;
    let penaltyIndex = 0;
    return SPACE_DEFINITIONS.map(type => {
      if (type === SpaceType.Reward) {
        const reward = REWARD_DEFINITIONS[rewardIndex++ % REWARD_DEFINITIONS.length];
        return { type, message: t[reward.messageKey as keyof Translations], action: reward.action };
      }
      if (type === SpaceType.Penalty) {
        const penalty = PENALTY_DEFINITIONS[penaltyIndex++ % PENALTY_DEFINITIONS.length];
        return { type, message: t[penalty.messageKey as keyof Translations], action: penalty.action };
      }
      return { type };
    });
  }, [t]);

  const handleTurnEnd = useCallback(() => {
    setGameState(prev => {
      const currentPlayers = prev.players;
      let nextPlayerIndex = (prev.currentPlayerIndex + 1) % currentPlayers.length;
      const updatedPlayers = [...currentPlayers]; 
      const startIndex = nextPlayerIndex;

      while (updatedPlayers[nextPlayerIndex].missNextTurn) {
        updatedPlayers[nextPlayerIndex] = { ...updatedPlayers[nextPlayerIndex], missNextTurn: false };
        nextPlayerIndex = (nextPlayerIndex + 1) % updatedPlayers.length;
        if (nextPlayerIndex === startIndex) break;
      }

      return {
        players: updatedPlayers,
        currentPlayerIndex: nextPlayerIndex,
        diceValue: null,
        turnState: 'start',
      };
    });
  }, []);

  const handleDiceRoll = useCallback((value: number) => {
    setIsRolling(true);
    setGameState(prev => ({ ...prev, diceValue: value }));
    
    setTimeout(() => {
      setIsRolling(false);
      setIsMoving(true);

      setTimeout(() => {
        setGameState(prev => {
          const currentPlayer = prev.players[prev.currentPlayerIndex];
          const newPosition = Math.min(currentPlayer.position + value, BOARD_SIZE - 1);
          const newPlayers = prev.players.map(p => p.id === currentPlayer.id ? { ...p, position: newPosition } : p);
          return { ...prev, players: newPlayers, turnState: 'acting' };
        });
        setIsMoving(false);
      }, 1000); // Animation duration
    }, 1000); // Rolling animation
  }, []);

  useEffect(() => {
    if (gameState.turnState !== 'acting' || isMoving) return;

    const player = gameState.players[gameState.currentPlayerIndex];
    const currentSpace = boardSpaces[player.position];

    const processAction () => {
        if (player.position >= BOARD_SIZE - 1) {
            onGameEnd(player);
            return;
        }

        switch (currentSpace.type) {
            // --- CÓDIGO NUEVO ---
case SpaceType.Challenge:
  const newChallenge = getChallengeFromCatalog(player.age);
  setChallenge({ text: newChallenge, isLoading: false });
  setShowChallengeModal(true);
  break;
            case SpaceType.Reward:
            case SpaceType.Penalty:
                if (typeof currentSpace.message === 'string') {
                    setSpecialMessage(currentSpace.message);
                }
                setShowSpecialSpaceModal(true);
                const result = currentSpace.action!(player);

                setGameState(prev => {
                    const newPlayers = prev.players.map(p => p.id === player.id ? { ...p, ...result } : p);
                    const turnStateAfterAction = result.extraEffect === 'rollAgain' ? 'start' : prev.turnState;
                    return { ...prev, players: newPlayers, turnState: turnStateAfterAction };
                });
                break;
            default:
                handleTurnEnd();
        }
    };

    processAction();
  }, [gameState, isMoving, boardSpaces, language, onGameEnd, handleTurnEnd]);

  const getSpaceColor = (type: SpaceType) => {
    switch (type) {
      case SpaceType.Start: return 'bg-green-500';
      case SpaceType.Finish: return 'bg-yellow-400';
      case SpaceType.Challenge: return 'bg-blue-400';
      case SpaceType.Reward: return 'bg-purple-500';
      case SpaceType.Penalty: return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6">
      {showChallengeModal && <ChallengeModal challenge={challenge.text} isLoading={challenge.isLoading} onClose={() => { setShowChallengeModal(false); handleTurnEnd(); }} />}
      {showSpecialSpaceModal && <SpecialSpaceModal message={specialMessage} onClose={() => { setShowSpecialSpaceModal(false); if(gameState.turnState !== 'start') handleTurnEnd(); }} />}
      
      {/* Game Board */}
      <div className="flex-grow bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-2 sm:p-4 aspect-square max-w-2xl mx-auto lg:max-w-none">
        <div className="relative grid grid-cols-7 grid-rows-7 gap-1 h-full">
          {TILE_POSITIONS.slice(0, BOARD_SIZE).map((pos, index) => (
            <div key={index} className="absolute transition-all duration-300" style={{ top: `calc(${pos.row * (100/7)}%)`, left: `calc(${pos.col * (100/7)}%)`, width: 'calc(100%/7)', height: 'calc(100%/7)' }}>
              <div className={`w-full h-full ${getSpaceColor(boardSpaces[index].type)} rounded-md flex items-center justify-center text-white font-bold text-lg shadow-inner`}>
                {index === 0 ? 'START' : index === BOARD_SIZE - 1 ? '🏆' : index}
              </div>
            </div>
          ))}
          {gameState.players.map((player, idx) => (
            <PlayerToken key={player.id} player={player} tilePosition={TILE_POSITIONS[player.position]} zIndex={idx + 1} />
          ))}
        </div>
      </div>
      
      {/* Game Controls */}
      <div className="lg:w-80 flex-shrink-0 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-indigo-800 mb-4 border-b-2 pb-2">{t.boardGameTitle}</h2>
          <div className="space-y-2 mb-6">
            {gameState.players.map(p => {
              const avatar = getAvatarById(p.avatarId);
              return (
                <div key={p.id} className={`p-2 rounded-lg flex items-center transition-all duration-300 ${p.id === currentPlayer.id ? 'bg-yellow-200 ring-2 ring-yellow-400' : 'bg-gray-100'}`}>
                  <div className={`w-6 h-6 mr-3 ${avatar?.color}`}>{avatar?.component}</div>
                  <span className="font-semibold text-sm md:text-base">{p.name}</span>
                  <span className="ml-auto text-gray-600 text-sm md:text-base">{t.space} {p.position}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="text-center space-y-4">
            <div className="bg-indigo-100 p-4 rounded-xl">
                <h3 className="text-lg md:text-xl font-bold text-indigo-900">{t.currentPlayer}</h3>
                <p className="text-xl md:text-2xl font-semibold text-indigo-600">{currentPlayer.name}</p>
            </div>
            
            <Timer />

            <Dice onRoll={handleDiceRoll} disabled={gameState.turnState !== 'start' || isRolling} isRolling={isRolling} value={gameState.diceValue} />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
