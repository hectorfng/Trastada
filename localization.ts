export type Language = 'en' | 'es';

const english = {
    // GameSetup
    gameTitle: "Mischief",
    gameSubtitle: "Setup your family challenge!",
    playerCountLabel: "Number of Players",
    playerNamePlaceholder: "Name",
    playerAgePlaceholder: "Age",
    avatarLabel: "Avatar",
    startGameButton: "Start Game!",
    validationAlert: "Please fill in a valid name and age for all players.",
    playerHeader: "Player",
    
    // Dice
    rollDice: 'Roll Dice',
    rolling: 'Rolling...',

    // GameBoard
    boardGameTitle: 'Mischief',
    currentPlayer: 'Current Player',
    space: 'Space',

    // Timer
    timerTitle: 'Timer',
    start: 'Start',
    pause: 'Pause',
    reset: 'Reset',

    // ChallengeModal
    challengeTime: 'Challenge Time!',
    generatingChallenge: 'Generating a fun challenge...',
    challengeComplete: 'Challenge Complete!',
    pleaseWait: 'Please wait...',

    // SpecialSpaceModal
    luckyYou: 'Lucky You!',
    ohNo: 'Oh No!',
    ok: 'OK',

    // WinnerModal
    winner: 'WINNER!',
    congratulations: 'Congratulations on conquering the domestic challenge!',
    playAgain: 'Play Again',

    // Reward messages
    reward1: "Lucky break! Move forward 3 spaces.",
    reward2: "You found a shortcut! Advance 2 spaces.",
    reward3: "Creative boost! Roll the dice again.",
    reward4: "Good karma! Move forward 1 space.",
    reward5: "Team up! Choose another player to move forward 1 space with you.",

    // Penalty messages
    penalty1: "Oops! A banana peel... Go back 2 spaces.",
    penalty2: "Brain freeze! Miss your next turn.",
    penalty3: "Oh no, a trap door! Go back 3 spaces.",
    penalty4: "You must speak like a pirate until your next turn!",
    penalty5: "A sudden gust of wind blows you back 1 space.",

    // Gemini Service
    geminiPrompt: (age: number) => `Generate a single, short, fun, and creative physical challenge for a ${age}-year-old person to perform indoors. The challenge should be safe and possible to complete in under a minute. It should not require any special props other than common household items. Make it one sentence and reply in English.`,
    fallbackChallenge1: "Pretend to be a T-Rex until your next turn.",
    fallbackChallenge2: "Do your best robot dance for 15 seconds!",
};

const spanish = {
    // GameSetup
    gameTitle: "Trastada",
    gameSubtitle: "¡Configura tu desafío familiar!",
    playerCountLabel: "Número de Jugadores",
    playerNamePlaceholder: "Nombre",
    playerAgePlaceholder: "Edad",
    avatarLabel: "Avatar",
    startGameButton: "¡Empezar Juego!",
    validationAlert: "Por favor, ingresa un nombre y edad válidos para todos los jugadores.",
    playerHeader: "Jugador",
    
    // Dice
    rollDice: 'Lanzar Dado',
    rolling: 'Lanzando...',

    // GameBoard
    boardGameTitle: 'Trastada',
    currentPlayer: 'Jugador Actual',
    space: 'Casilla',

    // Timer
    timerTitle: 'Cronómetro',
    start: 'Iniciar',
    pause: 'Pausar',
    reset: 'Reiniciar',

    // ChallengeModal
    challengeTime: '¡Hora del Reto!',
    generatingChallenge: 'Generando un reto divertido...',
    challengeComplete: '¡Reto Completado!',
    pleaseWait: 'Por favor espera...',

    // SpecialSpaceModal
    luckyYou: '¡Qué Suerte!',
    ohNo: '¡Oh No!',
    ok: 'OK',

    // WinnerModal
    winner: '¡GANADOR!',
    congratulations: '¡Felicidades por conquistar el reto doméstico!',
    playAgain: 'Jugar de Nuevo',

    // Reward messages
    reward1: "¡Golpe de suerte! Avanza 3 casillas.",
    reward2: "¡Encontraste un atajo! Avanza 2 casillas.",
    reward3: "¡Impulso creativo! Lanza el dado de nuevo.",
    reward4: "¡Buen karma! Avanza 1 casilla.",
    reward5: "¡En equipo! Elige a otro jugador para avanzar 1 casilla contigo.",
    
    // Penalty messages
    penalty1: "¡Uy! Una cáscara de plátano... Retrocede 2 casillas.",
    penalty2: "¡Cerebro congelado! Pierdes tu próximo turno.",
    penalty3: "¡Oh no, una trampilla! Retrocede 3 casillas.",
    penalty4: "¡Debes hablar como un pirata hasta tu próximo turno!",
    penalty5: "Una ráfaga de viento te empuja 1 casilla hacia atrás.",

    // Gemini Service
    geminiPrompt: (age: number) => `Genera un único, corto, divertido y creativo reto físico para una persona de ${age} años para realizar en interiores. El reto debe ser seguro y posible de completar en menos de un minuto. No debe requerir ningún accesorio especial que no sean objetos domésticos comunes. Hazlo en una sola frase y responde en Español.`,
    fallbackChallenge1: "Finge ser un T-Rex hasta tu próximo turno.",
    fallbackChallenge2: "¡Baila tu mejor baile de robot durante 15 segundos!",
};

const translations = {
  en: english,
  es: spanish,
};

export type Translations = typeof english;

export const getTranslations = (lang: Language): Translations => translations[lang];