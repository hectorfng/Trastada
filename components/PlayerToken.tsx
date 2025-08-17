
import React from 'react';
import { Player } from '../types';
import { getAvatarById } from '../constants';

interface PlayerTokenProps {
  player: Player;
  tilePosition: { row: number; col: number };
  zIndex: number;
}

const PlayerToken: React.FC<PlayerTokenProps> = ({ player, tilePosition, zIndex }) => {
  const avatar = getAvatarById(player.avatarId);
  if (!avatar) return null;

  const offsetStyle = {
    transform: `translate(${player.id * 8}px, ${player.id * 8}px)`,
  };

  return (
    <div
      className="absolute transition-all duration-1000 ease-in-out"
      style={{
        top: `calc(${tilePosition.row * (100 / 7)}% + 4px)`,
        left: `calc(${tilePosition.col * (100 / 7)}% + 4px)`,
        width: 'calc((100%/7) - 8px)',
        height: 'calc((100%/7) - 8px)',
        zIndex: 10 + zIndex,
        ...offsetStyle
      }}
    >
      <div className={`w-full h-full p-1 rounded-full bg-white shadow-lg ring-2 ring-white ${avatar.color}`}>
        {avatar.component}
      </div>
    </div>
  );
};

export default PlayerToken;
