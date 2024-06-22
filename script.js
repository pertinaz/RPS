/*
juego de "Piedra, Papel o Tijera" donde los usuarios pueden jugar contra una elección aleatoria generada por la computadora. Este proyecto permitirá a los participantes aplicar los conceptos de manipulación del DOM

Estructura del Proyecto:
 > Un área de título. DONE
 > Tres botones para las opciones (piedra, papel, tijera), con una imagen/icono para mostrar el movimiento a hacer. PROGRESS
 > Una sección para mostrar el resultado del juego. DONE
 > El usuario debe poder elegir la cantidad de intentos. DONE
 > Agregar transiciones entre los diferentes eventos del juego (cuando el jugador elige una opción, y se espera que la máquina haga. una elección). PENDING
 > Tener un acumulado de puntos. DONE
 > Tener modo de juego dos jugadores, o jugar contra la máquina. PROCESS
 > Indicar el jugador que va ganando. DONE
 > Un archivo CSS para estilizar el juego de manera atractiva y responsiva.
 > Un archivo JavaScript que gestione la lógica del juego.

Requisitos de Funcionalidad:

 > Elección del Jugador: Capturar la opción seleccionada por el jugador cuando hace clic en uno de los botones.
 > Elección de la Computadora: Generar una opción aleatoria para la computadora (piedra, papel o tijera).
 > Determinación del Resultado: Comparar las elecciones del jugador y la computadora para determinar el resultado (ganar, perder o empate).
 > Actualización del DOM: Mostrar dinámicamente el resultado del juego en la interfaz de usuario.

Características Adicionales:
 > Contador de Partidas: Implementar un contador que lleve el registro de victorias, derrotas y empates.
 > Reiniciar Juego: Añadir un botón que permita reiniciar el contador de partidas y comenzar una nueva sesión de juego.
 > Animaciones: Incluir animaciones para hacer la experiencia de juego más dinámica y atractiva.
Fecha de Entrega: Sábado 22 de junio a las 9:00 am
*/

// Lógica 
const options = ['rock', 'paper', 'scissors'];
let playerWins = 0;
let machineWins = 0;
let attempts = 3;  // Default number of attempts

document.getElementById('play-vs-machine').addEventListener('click', () => startGame('machine'));
document.getElementById('options-two-players').addEventListener('click', showPlayerInfo);
document.getElementById('start-new-game').addEventListener('click', startTwoPlayerGame);
document.getElementById('new-game').addEventListener('click', resetGame);

function showPlayerInfo() {
    document.querySelector('.players-information').style.display = 'flex';
}

function startGame(mode) {
    document.querySelector('.inicialization').style.display = 'none';
    document.querySelector('.main-content').style.display = 'flex';
    if (mode === 'machine') {
        document.querySelector('.second-player').style.display = 'none';
    }
}

function startTwoPlayerGame() {
    const player1 = document.getElementById('player-one').value;
    const player2 = document.getElementById('player-two').value;
    if (player1 && player2) {
        document.querySelector('.players-information').style.display = 'none';
        document.querySelector('.main-content').style.display = 'flex';
    } else {
        alert('Please enter names for both players.');
    }
}

function resetGame() {
    playerWins = 0;
    machineWins = 0;
    attempts = 3;
    updateScoreboard();
    document.getElementById('result').textContent = '';
    document.querySelector('.inicialization').style.display = 'flex';
    document.querySelector('.main-content').style.display = 'none';
    document.querySelector('.players-information').style.display = 'none';
}

function getRandomChoice() {
    const random = Math.floor(Math.random() * options.length);
    return options[random];
}

function winner(playerChoice, machineChoice) {
    if (playerChoice === machineChoice) {
        return 'draw';
    }
    if (
        (playerChoice === 'rock' && machineChoice === 'scissors') ||
        (playerChoice === 'paper' && machineChoice === 'rock') ||
        (playerChoice === 'scissors' && machineChoice === 'paper')
    ) {
        playerWins++;
        return 'You won';
    } else {
        machineWins++;
        return 'Machine won';
    }
}

function playGame(playerChoice) {
    if (attempts > 0) {
        attempts--;
        const machineChoice = getRandomChoice();
        const result = winner(playerChoice, machineChoice);
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = `You chose ${playerChoice}, machine chose ${machineChoice}. ${result}`;
        updateScoreboard();
        if (attempts === 0) {
            alert('Game over!');
        }
    } else {
        alert('No more attempts left!');
    }
}

function updateScoreboard() {
    document.getElementById('player-score').textContent = playerWins;
    document.getElementById('machine-score').textContent = machineWins;
    let leader = 'It\'s a tie';
    if (playerWins > machineWins) {
        leader = 'Player is leading';
    } else if (machineWins > playerWins) {
        leader = 'Machine is leading';
    }
    document.getElementById('leader').textContent = leader;
}

document.getElementById('first-rock').addEventListener('click', () => playGame('rock'));
document.getElementById('first-paper').addEventListener('click', () => playGame('paper'));
document.getElementById('first-scissors').addEventListener('click', () => playGame('scissors'));
