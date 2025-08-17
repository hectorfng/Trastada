
import React from 'react';
import { SpaceType, BoardSpace, Avatar, AvatarId } from './types';

export const BOARD_SIZE = 43; // 42 spaces + start

// Space type definitions
const C = SpaceType.Challenge;
const R = SpaceType.Reward;
const P = SpaceType.Penalty;

export const SPACE_DEFINITIONS: SpaceType[] = [
  SpaceType.Start,
  C, C, R, C, P, C, C, R, C, C, // 1-10
  P, C, C, R, C, C, C, P, C, R, // 11-20
  C, C, P, C, R, C, C, C, P, C, // 21-30
  C, R, C, C, P, C, C, R, C, C, // 31-40
  P, C, SpaceType.Finish // 41-42
];

export const REWARD_DEFINITIONS: { messageKey: string; action: BoardSpace['action'] }[] = [
    { messageKey: "reward1", action: (p) => ({ position: p.position + 3 }) },
    { messageKey: "reward2", action: (p) => ({ position: p.position + 2 }) },
    { messageKey: "reward3", action: () => ({ extraEffect: 'rollAgain' }) },
    { messageKey: "reward4", action: (p) => ({ position: p.position + 1 }) },
    { messageKey: "reward5", action: () => ({}) }, // Special handling in component
];

export const PENALTY_DEFINITIONS: { messageKey: string; action: BoardSpace['action'] }[] = [
    { messageKey: "penalty1", action: (p) => ({ position: p.position - 2 < 0 ? 0 : p.position - 2 }) },
    { messageKey: "penalty2", action: () => ({ missNextTurn: true }) },
    { messageKey: "penalty3", action: (p) => ({ position: p.position - 3 < 0 ? 0 : p.position - 3 }) },
    { messageKey: "penalty4", action: () => ({}) }, // Flavor text
    { messageKey: "penalty5", action: (p) => ({ position: p.position - 1 < 0 ? 0 : p.position - 1 }) },
];

// Pre-calculated coordinates for a snaking path on a 7x7 grid
export const TILE_POSITIONS = [
  { row: 6, col: 0 }, { row: 6, col: 1 }, { row: 6, col: 2 }, { row: 6, col: 3 }, { row: 6, col: 4 }, { row: 6, col: 5 }, { row: 6, col: 6 },
  { row: 5, col: 6 }, { row: 5, col: 5 }, { row: 5, col: 4 }, { row: 5, col: 3 }, { row: 5, col: 2 }, { row: 5, col: 1 }, { row: 5, col: 0 },
  { row: 4, col: 0 }, { row: 4, col: 1 }, { row: 4, col: 2 }, { row: 4, col: 3 }, { row: 4, col: 4 }, { row: 4, col: 5 }, { row: 4, col: 6 },
  { row: 3, col: 6 }, { row: 3, col: 5 }, { row: 3, col: 4 }, { row: 3, col: 3 }, { row: 3, col: 2 }, { row: 3, col: 1 }, { row: 3, col: 0 },
  { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }, { row: 2, col: 5 }, { row: 2, col: 6 },
  { row: 1, col: 6 }, { row: 1, col: 5 }, { row: 1, col: 4 }, { row: 1, col: 3 }, { row: 1, col: 2 }, { row: 1, col: 1 }, { row: 1, col: 0 },
  { row: 0, col: 0 }
];


const AlienAvatar = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 0 0-9-9zm-4 12c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-4-5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>
);
const DinoAvatar = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M19.43 11.5c-1.32.22-2.43.9-3.26 1.95-.51.65-.9 1.4-1.17 2.25H9v-2H7v2H5v2h2v2h2v-2h2.2c.28.85.66 1.6 1.17 2.25.83 1.05 1.94 1.73 3.26 1.95 2.13.35 4.14-.98 4.57-3.15.43-2.17-.9-4.2-3-4.6zM6 9h4V7H8V5H6v2H4v2h2v2zm11-1c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/></svg>
);
const RobotAvatar = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M19 5h-2V3h-2v2H9V3H7v2H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-7 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm-4-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>
);
const UnicornAvatar = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M15.5 4.5c-1.07 0-2.09.43-2.83 1.17-.46-.35-.97-.64-1.52-.85C10.27 4.34 9.42 4 8.5 4c-1.85 0-3.53.88-4.58 2.34-.3.42-.56.88-.75 1.37C2.5 8.9 2 10.4 2 12c0 2.21 1.04 4.14 2.65 5.39C6.54 18.91 9.17 20 12 20s5.46-1.09 7.35-2.61C20.96 16.14 22 14.21 22 12c0-1.6-.5-3.1-1.17-4.29-.19-.49-.45-.95-.75-1.37C19.03 5.38 17.35 4.5 15.5 4.5zm-3.37 3.37L11 9l-1.13-1.13L8.75 9l-1.12-1.13L6.5 9l-1.13-1.13L4.25 9 4 7.5l1.5-1 1 1.5 1.5-1.5 1.5 1.5 1.5-1.5 1.13 1.13z"/></svg>
);
const GhostAvatar = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2C7.58 2 4 5.58 4 10v6h16v-6c0-4.42-3.58-8-8-8zm-3 12c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-3-5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
);
const RocketAvatar = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2L9.4 8.5 2 9.22l5.45 4.73L6.2 21 12 17.27 17.8 21l-1.65-7.05L22 9.22l-7.4-.72L12 2z"/></svg>
);

export const AVATARS: Avatar[] = [
    { id: 'alien', component: <AlienAvatar />, color: 'text-green-500' },
    { id: 'dino', component: <DinoAvatar />, color: 'text-red-500' },
    { id: 'robot', component: <RobotAvatar />, color: 'text-gray-500' },
    { id: 'unicorn', component: <UnicornAvatar />, color: 'text-pink-500' },
    { id: 'ghost', component: <GhostAvatar />, color: 'text-indigo-400' },
    { id: 'rocket', component: <RocketAvatar />, color: 'text-blue-500' },
];

export const getAvatarById = (id: AvatarId): Avatar | undefined => AVATARS.find(a => a.id === id);