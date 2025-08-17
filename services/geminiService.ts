// services/geminiService.ts

// La ruta '../challenges' es para subir de 'services' a la raíz
import { challenges } from '../challenges';

// Esta función elige el catálogo correcto basado en la edad
function getChallengeCategory(age: number) {
  if (age <= 4) return challenges.toddlers;
  if (age <= 12) return challenges.kids;
  if (age <= 17) return challenges.teens;
  return challenges.adults;
}

// La única función que necesitamos: tomar un reto al azar
export function getChallengeFromCatalog(age: number): string {
  const category = getChallengeCategory(age);
  const randomIndex = Math.floor(Math.random() * category.length);
  return category[randomIndex];
}
