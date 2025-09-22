// Tutorial data
const tutorialSections = [
    {
        id: 1,
        title: "¡Bienvenido, Coach!",
        narration: "¡Hola, futuro coach de eSports! Soy tu entrenador y te voy a enseñar cómo cuidar la salud de tus gamers durante una final muy importante. En este juego, tú eres el responsable de mantener a 3 jugadores profesionales en perfecto estado físico y mental. ¿Estás listo para convertirte en el mejor coach del mundo?",
        animation: "welcome"
    },
    {
        id: 2,
        title: "Las 4 Reglas de Oro",
        narration: "Todo buen coach debe conocer las 4 reglas de oro del gamer de élite. Primera: Postura de Poder, mantener la espalda recta como un superhéroe. Segunda: Distancia Inteligente, no pegarse mucho a la pantalla. Tercera: Pausa Activa Mágica, levantarse y estirarse como un gato. Cuarta: Descanso Mental, cerrar los ojos y relajar el cerebro. Estas reglas son tu superpoder para cuidar a tu equipo.",
        animation: "rules"
    },
    {
        id: 3,
        title: "Conoce a tu Equipo",
        narration: "Estos son tus 3 gamers: Alex, Luna y Max. Cada uno tiene una barra verde de rendimiento que muestra qué tan bien está jugando, y 3 corazones rojos que son como sus vidas. Si la barra baja mucho o pierden los 3 corazones, ¡quedarán fuera del torneo! Tu trabajo es mantenerlos felices y saludables.",
        animation: "team"
    },
    {
        id: 4,
        title: "¡Alerta, Alerta!",
        narration: "Cuando tus gamers necesiten ayuda, aparecerá una burbuja de alerta sobre sus cabezas con un ícono especial. La burbuja tiene un timer circular que se pone rojo. Si no actúas rápido, ¡tu gamer perderá un corazón! Las alertas aparecen cuando tienen mala postura, están muy cerca de la pantalla, necesitan estirarse o su mente necesita descansar.",
        animation: "alerts"
    },
    {
        id: 5,
        title: "Tu Tableta Mágica",
        narration: "Esta es tu tableta de coach con 4 botones súper importantes. Cuando veas una alerta, primero haz clic en el botón correcto de tu tableta: el de postura, distancia, pausa o descanso. Luego haz clic en el gamer que necesita ayuda. ¡Es como ser un doctor súper rápido! Tienes que elegir el botón correcto para cada problema.",
        animation: "tablet"
    },
    {
        id: 6,
        title: "¡A Ganar el Torneo!",
        narration: "Tienes 90 segundos para cuidar a tu equipo durante la final. Si todos tus gamers sobreviven, ¡ganarás el trofeo de oro! Si solo algunos sobreviven, tendrás una medalla de plata. Si todos pierden, no te preocupes, aprenderás para la próxima vez. Recuerda: un buen coach siempre cuida la salud de su equipo primero. ¡Ahora estás listo para ser el mejor coach de eSports del mundo!",
        animation: "victory"
    }
];

// Game data
const gameData = {
    gameRules: [
        { icon: "🧘", title: "Postura de Poder", description: "Mantener la espalda recta y cuello alineado", action: "postura" },
        { icon: "👀", title: "Distancia Inteligente", description: "Mantenerse a distancia adecuada de la pantalla", action: "distancia" },
        { icon: "🕺", title: "Pausa Activa Mágica", description: "Levantarse y estirarse", action: "pausa" },
        { icon: "⏸️", title: "Descanso Mental", description: "Apartar la vista y relajar la mente", action: "descanso" }
    ],
    gamers: [
        { name: "Alex", id: "gamer1", performance: 80, hearts: 3 },
        { name: "Luna", id: "gamer2", performance: 80, hearts: 3 },
        { name: "Max", id: "gamer3", performance: 80, hearts: 3 }
    ],
    alertTypes: [
        { type: "postura", icon: "🤕", message: "¡Espalda recta!", color: "#ff6b6b" },
        { type: "distancia", icon: "👁️", message: "¡Aléjate!", color: "#4ecdc4" },
        { type: "pausa", icon: "🥱", message: "¡Estírate!", color: "#45b7d1" },
        { type: "descanso", icon: "🧠", message: "¡Relájate!", color: "#96ceb4" }
    ]
};

// Tutorial state
let tutorialState = {
    currentSection: 1,
    isPlaying: false,
    isMuted: false,
    isPaused: false,
    currentUtterance: null
};

// Game state
let gameState = {
    currentScreen: 'tutorial',
    gameTimer: 90,
    gameActive: false,
    selectedAction: null,
    gamers: [...gameData.gamers],
    activeGamers: 3,
    correctInterventions: 0,
    failedInterventions: 0,
    activeAlerts: {},
    alertIntervals: {},
    gameInterval: null,
    alertTimeouts: [],
    difficultyPhase: 1
};

// DOM elements - will be set after DOM loads
let screens = {};
let tutorialElements = {};
let gameElements = {};
let resultElements = {};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
});

function initializeApp() {
    // Initialize DOM element references
    screens = {
        tutorial: document.getElementById('tutorial-screen'),
        game: document.getElementById('game-screen'),
        results: document.getElementById('results-screen')
    };

    tutorialElements = {
        skipBtn: document.getElementById('skip-tutorial'),
        progress: document.getElementById('tutorial-progress'),
        title: document.getElementById('tutorial-title'),
        content: document.getElementById('tutorial-content'),
        text: document.getElementById('tutorial-text'),
        animation: document.getElementById('tutorial-animation'),
        continueBtn: document.getElementById('continue-btn'),
        muteBtn: document.getElementById('mute-btn'),
        pauseBtn: document.getElementById('pause-audio')
    };

    gameElements = {
        helpBtn: document.getElementById('help-button'),
        timer: document.getElementById('timer'),
        activeGamers: document.getElementById('active-gamers'),
        feedback: document.getElementById('feedback')
    };

    resultElements = {
        playAgain: document.getElementById('play-again'),
        resultTitle: document.getElementById('result-title'),
        resultTrophy: document.getElementById('result-trophy'),
        survivorsCount: document.getElementById('survivors-count'),
        correctInterventions: document.getElementById('correct-interventions'),
        failedInterventions: document.getElementById('failed-interventions'),
        finalMessage: document.getElementById('final-message')
    };

    console.log('DOM elements initialized');
    setupEventListeners();
    showScreen('tutorial');
    startTutorial();
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Tutorial events - with explicit checks
    if (tutorialElements.skipBtn) {
        tutorialElements.skipBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Skip tutorial clicked');
            skipTutorial();
        });
    }
    
    if (tutorialElements.continueBtn) {
        tutorialElements.continueBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Continue tutorial clicked');
            nextTutorialSection();
        });
    }
    
    if (tutorialElements.muteBtn) {
        tutorialElements.muteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Mute button clicked');
            toggleMute();
        });
    }
    
    if (tutorialElements.pauseBtn) {
        tutorialElements.pauseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Pause button clicked');
            togglePauseAudio();
        });
    }

    // Game events
    if (gameElements.helpBtn) {
        gameElements.helpBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Help button clicked');
            showTutorial();
        });
    }
    
    // Control button event listeners
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Control button clicked:', this.dataset.action);
            selectAction(this.dataset.action);
        });
    });
    
    // Gamer click event listeners
    document.querySelectorAll('.gamer').forEach(gamer => {
        gamer.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Gamer clicked:', this.dataset.gamer);
            handleGamerClick(this.dataset.gamer);
        });
    });

    // Results events
    if (resultElements.playAgain) {
        resultElements.playAgain.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Play again clicked');
            resetGame();
        });
    }
    
    console.log('Event listeners set up complete');
}

function showScreen(screenName) {
    console.log('Showing screen:', screenName);
    
    // Hide all screens
    Object.values(screens).forEach(screen => {
        if (screen) {
            screen.classList.remove('active');
        }
    });
    
    // Show selected screen
    if (screens[screenName]) {
        screens[screenName].classList.add('active');
        gameState.currentScreen = screenName;
        console.log('Screen switched to:', screenName);
    } else {
        console.error('Screen not found:', screenName);
    }
}

// Tutorial Functions
function startTutorial() {
    console.log('Starting tutorial');
    tutorialState.currentSection = 1;
    renderTutorialSection();
}

function renderTutorialSection() {
    const section = tutorialSections[tutorialState.currentSection - 1];
    console.log('Rendering tutorial section:', tutorialState.currentSection, section.title);
    
    if (tutorialElements.progress) {
        tutorialElements.progress.textContent = `${tutorialState.currentSection}/6`;
    }
    
    if (tutorialElements.title) {
        tutorialElements.title.textContent = section.title;
    }
    
    if (tutorialElements.text) {
        tutorialElements.text.textContent = section.narration;
    }
    
    renderTutorialAnimation(section.animation);
    
    // Start narration automatically after a short delay
    setTimeout(() => {
        if (!tutorialState.isMuted) {
            speakText(section.narration);
        }
    }, 500);
}

function renderTutorialAnimation(animationType) {
    console.log('Rendering animation:', animationType);
    let animationHTML = '';
    
    switch(animationType) {
        case 'welcome':
            animationHTML = '<div class="welcome-animation">🎮</div>';
            break;
        case 'rules':
            animationHTML = `
                <div class="rules-animation">
                    <div class="rule-demo">
                        <div class="rule-demo-icon">🧘</div>
                        <div>Postura</div>
                    </div>
                    <div class="rule-demo">
                        <div class="rule-demo-icon">👀</div>
                        <div>Distancia</div>
                    </div>
                    <div class="rule-demo">
                        <div class="rule-demo-icon">🕺</div>
                        <div>Pausa</div>
                    </div>
                    <div class="rule-demo">
                        <div class="rule-demo-icon">⏸️</div>
                        <div>Descanso</div>
                    </div>
                </div>
            `;
            break;
        case 'team':
            animationHTML = `
                <div class="team-animation">
                    <div class="mini-gamer">Alex</div>
                    <div class="mini-gamer">Luna</div>
                    <div class="mini-gamer">Max</div>
                </div>
            `;
            break;
        case 'alerts':
            animationHTML = `
                <div class="alert-animation">
                    <div class="demo-alert">🤕 ¡ALERTA!</div>
                </div>
            `;
            break;
        case 'tablet':
            animationHTML = `
                <div class="tablet-animation">
                    <div class="demo-tablet-btn">🧘</div>
                    <div class="demo-tablet-btn">👀</div>
                    <div class="demo-tablet-btn">🕺</div>
                    <div class="demo-tablet-btn">⏸️</div>
                </div>
            `;
            break;
        case 'victory':
            animationHTML = '<div class="victory-animation">🏆</div>';
            break;
        default:
            animationHTML = '<div class="welcome-animation">🎮</div>';
    }
    
    if (tutorialElements.animation) {
        tutorialElements.animation.innerHTML = animationHTML;
    }
}

function nextTutorialSection() {
    console.log('Next tutorial section called, current:', tutorialState.currentSection);
    stopCurrentSpeech();
    
    if (tutorialState.currentSection < 6) {
        tutorialState.currentSection++;
        console.log('Advancing to section:', tutorialState.currentSection);
        renderTutorialSection();
    } else {
        console.log('Tutorial complete, ending tutorial');
        endTutorial();
    }
}

function skipTutorial() {
    console.log('Skipping tutorial');
    stopCurrentSpeech();
    endTutorial();
}

function endTutorial() {
    console.log('Ending tutorial, starting game');
    showScreen('game');
    startGame();
}

function showTutorial() {
    console.log('Showing tutorial from help button');
    if (gameState.gameActive) {
        pauseGame();
    }
    
    tutorialState.currentSection = 1;
    showScreen('tutorial');
    renderTutorialSection();
}

function speakText(text) {
    if (tutorialState.isMuted || !('speechSynthesis' in window)) {
        console.log('Speech disabled or not available');
        return;
    }
    
    console.log('Speaking text:', text.substring(0, 50) + '...');
    stopCurrentSpeech();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    utterance.onend = () => {
        tutorialState.isPlaying = false;
        tutorialState.currentUtterance = null;
        console.log('Speech ended');
    };
    
    utterance.onerror = (event) => {
        tutorialState.isPlaying = false;
        tutorialState.currentUtterance = null;
        console.log('Speech error:', event.error);
    };
    
    tutorialState.currentUtterance = utterance;
    tutorialState.isPlaying = true;
    speechSynthesis.speak(utterance);
}

function stopCurrentSpeech() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        console.log('Speech stopped');
    }
    tutorialState.isPlaying = false;
    tutorialState.currentUtterance = null;
}

function toggleMute() {
    tutorialState.isMuted = !tutorialState.isMuted;
    console.log('Mute toggled:', tutorialState.isMuted);
    
    if (tutorialElements.muteBtn) {
        tutorialElements.muteBtn.textContent = tutorialState.isMuted ? '🔇' : '🔊';
    }
    
    if (tutorialState.isMuted) {
        stopCurrentSpeech();
    }
}

function togglePauseAudio() {
    console.log('Toggle pause audio called');
    if (tutorialState.isPlaying && speechSynthesis.speaking) {
        speechSynthesis.pause();
        if (tutorialElements.pauseBtn) {
            tutorialElements.pauseBtn.textContent = '▶️';
        }
        tutorialState.isPaused = true;
        console.log('Speech paused');
    } else if (tutorialState.isPaused && speechSynthesis.paused) {
        speechSynthesis.resume();
        if (tutorialElements.pauseBtn) {
            tutorialElements.pauseBtn.textContent = '⏸️';
        }
        tutorialState.isPaused = false;
        console.log('Speech resumed');
    }
}

// Game Functions
function startGame() {
    console.log('Starting game');
    gameState = {
        ...gameState,
        gameTimer: 90,
        gameActive: true,
        selectedAction: null,
        gamers: gameData.gamers.map(g => ({...g})),
        activeGamers: 3,
        correctInterventions: 0,
        failedInterventions: 0,
        activeAlerts: {},
        alertIntervals: {},
        difficultyPhase: 1
    };
    
    updateGameUI();
    startGameTimer();
    startAlertSystem();
}

function pauseGame() {
    console.log('Pausing game');
    gameState.gameActive = false;
    if (gameState.gameInterval) {
        clearInterval(gameState.gameInterval);
    }
}

function resumeGame() {
    console.log('Resuming game');
    gameState.gameActive = true;
    startGameTimer();
}

function startGameTimer() {
    if (gameElements.timer) {
        gameElements.timer.textContent = gameState.gameTimer;
    }
    
    gameState.gameInterval = setInterval(() => {
        gameState.gameTimer--;
        if (gameElements.timer) {
            gameElements.timer.textContent = gameState.gameTimer;
        }
        
        // Update difficulty phase
        if (gameState.gameTimer <= 60 && gameState.difficultyPhase === 1) {
            gameState.difficultyPhase = 2;
        } else if (gameState.gameTimer <= 30 && gameState.difficultyPhase === 2) {
            gameState.difficultyPhase = 3;
        }
        
        if (gameState.gameTimer <= 0) {
            endGame();
        }
    }, 1000);
}

function startAlertSystem() {
    scheduleNextAlert();
}

function scheduleNextAlert() {
    if (!gameState.gameActive) return;
    
    let minDelay, maxDelay;
    switch (gameState.difficultyPhase) {
        case 1:
            minDelay = 8000;
            maxDelay = 12000;
            break;
        case 2:
            minDelay = 5000;
            maxDelay = 8000;
            break;
        case 3:
            minDelay = 3000;
            maxDelay = 6000;
            break;
    }
    
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;
    
    const timeout = setTimeout(() => {
        createAlert();
        scheduleNextAlert();
    }, delay);
    
    gameState.alertTimeouts.push(timeout);
}

function createAlert() {
    if (!gameState.gameActive) return;
    
    const availableGamers = gameState.gamers.filter((gamer) => 
        gamer.hearts > 0 && !gameState.activeAlerts[gamer.id]
    );
    
    if (availableGamers.length === 0) return;
    
    const maxAlerts = gameState.difficultyPhase === 3 ? Math.min(2, availableGamers.length) : 1;
    const numAlerts = Math.random() < 0.3 && maxAlerts === 2 ? 2 : 1;
    
    for (let i = 0; i < numAlerts && availableGamers.length > 0; i++) {
        const randomGamerIndex = Math.floor(Math.random() * availableGamers.length);
        const selectedGamer = availableGamers[randomGamerIndex];
        availableGamers.splice(randomGamerIndex, 1);
        
        const alertType = gameData.alertTypes[Math.floor(Math.random() * gameData.alertTypes.length)];
        showAlert(selectedGamer.id, alertType);
    }
}

function showAlert(gamerId, alertType) {
    const alertElement = document.getElementById(`alert${gamerId.slice(-1)}`);
    if (!alertElement) return;
    
    const alertIcon = alertElement.querySelector('.alert-icon');
    const alertTimer = alertElement.querySelector('.alert-timer');
    
    if (alertIcon) alertIcon.textContent = alertType.icon;
    alertElement.style.backgroundColor = alertType.color;
    alertElement.classList.remove('hidden');
    
    gameState.activeAlerts[gamerId] = {
        type: alertType.type,
        startTime: Date.now(),
        duration: 5000
    };
    
    let progress = 0;
    const timerInterval = setInterval(() => {
        progress += 2;
        if (alertTimer) {
            alertTimer.style.setProperty('--timer-width', `${progress}%`);
        }
        
        if (progress >= 100) {
            clearInterval(timerInterval);
            handleAlertTimeout(gamerId);
        }
    }, 100);
    
    gameState.alertIntervals[gamerId] = timerInterval;
}

function handleAlertTimeout(gamerId) {
    clearAlert(gamerId);
    
    const gamerIndex = gameState.gamers.findIndex(g => g.id === gamerId);
    if (gamerIndex !== -1) {
        gameState.gamers[gamerIndex].hearts--;
        gameState.gamers[gamerIndex].performance = Math.max(0, gameState.gamers[gamerIndex].performance - 15);
        
        if (gameState.gamers[gamerIndex].hearts <= 0) {
            eliminateGamer(gamerId);
        }
        
        gameState.failedInterventions++;
        showFeedback('¡Demasiado tarde! El gamer perdió energía', false);
        updateGameUI();
    }
}

function selectAction(action) {
    console.log('Action selected:', action);
    gameState.selectedAction = action;
    
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    const selectedBtn = document.querySelector(`[data-action="${action}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('selected');
    }
}

function handleGamerClick(gamerId) {
    console.log('Gamer clicked:', gamerId, 'Selected action:', gameState.selectedAction);
    if (!gameState.selectedAction || !gameState.activeAlerts[gamerId]) return;
    
    const alert = gameState.activeAlerts[gamerId];
    
    if (gameState.selectedAction === alert.type) {
        handleCorrectIntervention(gamerId);
    } else {
        handleWrongIntervention(gamerId);
    }
    
    gameState.selectedAction = null;
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
}

function handleCorrectIntervention(gamerId) {
    clearAlert(gamerId);
    
    const gamerIndex = gameState.gamers.findIndex(g => g.id === gamerId);
    if (gamerIndex !== -1) {
        gameState.gamers[gamerIndex].performance = Math.min(100, gameState.gamers[gamerIndex].performance + 10);
        gameState.correctInterventions++;
        
        const phrases = [
            "¡Excelente intervención, Coach!",
            "¡El equipo está en buenas manos!",
            "¡Sigue así, campeón!",
            "¡Gran trabajo cuidando a tu equipo!"
        ];
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        showFeedback(phrase, true);
    }
    
    updateGameUI();
}

function handleWrongIntervention(gamerId) {
    const gamerIndex = gameState.gamers.findIndex(g => g.id === gamerId);
    if (gamerIndex !== -1) {
        gameState.gamers[gamerIndex].hearts--;
        gameState.gamers[gamerIndex].performance = Math.max(0, gameState.gamers[gamerIndex].performance - 15);
        
        if (gameState.gamers[gamerIndex].hearts <= 0) {
            eliminateGamer(gamerId);
        }
        
        gameState.failedInterventions++;
        showFeedback('¡Intervención incorrecta!', false);
    }
    
    clearAlert(gamerId);
    updateGameUI();
}

function clearAlert(gamerId) {
    const alertElement = document.getElementById(`alert${gamerId.slice(-1)}`);
    if (alertElement) {
        alertElement.classList.add('hidden');
    }
    
    if (gameState.alertIntervals[gamerId]) {
        clearInterval(gameState.alertIntervals[gamerId]);
        delete gameState.alertIntervals[gamerId];
    }
    
    delete gameState.activeAlerts[gamerId];
}

function eliminateGamer(gamerId) {
    const gamerElement = document.getElementById(gamerId);
    if (gamerElement) {
        gamerElement.classList.add('eliminated');
    }
    gameState.activeGamers--;
    
    clearAlert(gamerId);
    
    if (gameState.activeGamers === 0) {
        endGame();
    }
}

function updateGameUI() {
    if (gameElements.activeGamers) {
        gameElements.activeGamers.textContent = gameState.activeGamers;
    }
    
    gameState.gamers.forEach((gamer) => {
        const gamerElement = document.getElementById(gamer.id);
        if (!gamerElement) return;
        
        const performanceBar = gamerElement.querySelector('.performance-fill');
        const performanceText = gamerElement.querySelector('.performance-text');
        const hearts = gamerElement.querySelectorAll('.heart');
        
        if (performanceBar) {
            performanceBar.style.width = `${gamer.performance}%`;
        }
        if (performanceText) {
            performanceText.textContent = `${gamer.performance}%`;
        }
        
        hearts.forEach((heart, heartIndex) => {
            if (heartIndex < gamer.hearts) {
                heart.classList.add('active');
            } else {
                heart.classList.remove('active');
            }
        });
    });
}

function showFeedback(message, isSuccess) {
    if (!gameElements.feedback) return;
    
    gameElements.feedback.textContent = message;
    gameElements.feedback.classList.remove('error');
    if (!isSuccess) {
        gameElements.feedback.classList.add('error');
    }
    gameElements.feedback.classList.add('show');
    
    setTimeout(() => {
        if (gameElements.feedback) {
            gameElements.feedback.classList.remove('show');
        }
    }, 2000);
}

function endGame() {
    console.log('Ending game');
    gameState.gameActive = false;
    
    if (gameState.gameInterval) {
        clearInterval(gameState.gameInterval);
    }
    
    gameState.alertTimeouts.forEach(timeout => clearTimeout(timeout));
    gameState.alertTimeouts = [];
    
    Object.values(gameState.alertIntervals).forEach(interval => clearInterval(interval));
    gameState.alertIntervals = {};
    
    Object.keys(gameState.activeAlerts).forEach(gamerId => clearAlert(gamerId));
    
    showResults();
}

function showResults() {
    const survivors = gameState.activeGamers;
    
    if (survivors === 3) {
        if (resultElements.resultTitle) resultElements.resultTitle.textContent = '¡VICTORIA PERFECTA!';
        if (resultElements.resultTrophy) resultElements.resultTrophy.textContent = '🏆';
        if (resultElements.finalMessage) resultElements.finalMessage.textContent = '¡Increíble trabajo, Coach! Has mantenido a todo el equipo saludable y en la final. ¡Eres un verdadero maestro de la salud digital!';
    } else if (survivors >= 1) {
        if (resultElements.resultTitle) resultElements.resultTitle.textContent = '¡VICTORIA PARCIAL!';
        if (resultElements.resultTrophy) resultElements.resultTrophy.textContent = '🥈';
        if (resultElements.finalMessage) resultElements.finalMessage.textContent = `Has logrado que ${survivors} gamer${survivors > 1 ? 's' : ''} llegue${survivors > 1 ? 'n' : ''} al final. ¡Buen trabajo! Recuerda que cuidar la salud digital es fundamental para el rendimiento.`;
    } else {
        if (resultElements.resultTitle) resultElements.resultTitle.textContent = 'MISIÓN APRENDIDA';
        if (resultElements.resultTrophy) resultElements.resultTrophy.textContent = '📚';
        if (resultElements.finalMessage) resultElements.finalMessage.textContent = '¡No te rindas, Coach! Cada intento nos enseña más sobre la importancia de los hábitos saludables. La práctica hace al maestro.';
    }
    
    if (resultElements.survivorsCount) resultElements.survivorsCount.textContent = survivors;
    if (resultElements.correctInterventions) resultElements.correctInterventions.textContent = gameState.correctInterventions;
    if (resultElements.failedInterventions) resultElements.failedInterventions.textContent = gameState.failedInterventions;
    
    showScreen('results');
}

function resetGame() {
    console.log('Resetting game');
    stopCurrentSpeech();
    
    gameState = {
        currentScreen: 'tutorial',
        gameTimer: 90,
        gameActive: false,
        selectedAction: null,
        gamers: [...gameData.gamers],
        activeGamers: 3,
        correctInterventions: 0,
        failedInterventions: 0,
        activeAlerts: {},
        alertIntervals: {},
        gameInterval: null,
        alertTimeouts: [],
        difficultyPhase: 1
    };
    
    // Reset UI
    document.querySelectorAll('.gamer').forEach(gamer => {
        gamer.classList.remove('eliminated');
        const performanceBar = gamer.querySelector('.performance-fill');
        const performanceText = gamer.querySelector('.performance-text');
        if (performanceBar) performanceBar.style.width = '80%';
        if (performanceText) performanceText.textContent = '80%';
        
        const hearts = gamer.querySelectorAll('.heart');
        hearts.forEach(heart => heart.classList.add('active'));
    });
    
    document.querySelectorAll('.alert-bubble').forEach(alert => {
        alert.classList.add('hidden');
    });
    
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    showScreen('tutorial');
    startTutorial();
}
