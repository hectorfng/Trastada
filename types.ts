
import { ReactElement } from 'react';

export enum GameState {
  Setup = 'SETUP',
  Playing = 'PLAYING',
  GameOver = 'GAME_OVER',
}

export enum SpaceType {
  Start,
  Challenge,
  Reward,
  Penalty,
  Finish,
}

export interface BoardSpace {
  type: SpaceType;
  message?: string;
  action?: (player: Player) => Partial<Player> & { extraEffect?: 'rollAgain' | 'missTurn' };
}

export type AvatarId = 'alien' | 'dino' | 'robot' | 'unicorn' | 'ghost' | 'rocket';

export interface Avatar {
    id: AvatarId;
    component: ReactElement;
    color: string;
}

export interface Player {
  id: number;
  name: string;
  age: number;
  avatarId: AvatarId;
  position: number;
  missNextTurn: boolean;
}
