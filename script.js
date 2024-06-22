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


// script.js

document.addEventListener("DOMContentLoaded", () => {
    const playVsMachineButton = document.getElementById('play-vs-machine');
    const optionsTwoPlayersButton = document.getElementById('options-two-players');
    const startNewGameButton = document.getElementById('start-new-game');
    const newGameButton = document.getElementById('new-game');

    const playerOneInput = document.getElementById('player-one');
    const playerTwoInput = document.getElementById('player-two');
    
    const overlay = document.getElementById('overlay');
    const playerOneOptions = document.querySelectorAll('.first-player .options button');
    const playerTwoOptions = document.querySelectorAll('.second-player .options button');
    const resultDisplay = document.getElementById('result');
    const leaderDisplay = document.getElementById('leader');

    const playerOneRadioButtons = document.querySelectorAll('input[name="player-win"]')
    const playerTwoRadioButtons = document.querySelectorAll('input[name="machine-win"]')
    
    let gameMode = '';
    let playerOneName = '';
    let playerTwoName = 'Machine';
    let playerOneChoice = '';
    let playerTwoChoice = '';
    let playerOneScore = 0;
    let playerTwoScore = 0;

    playVsMachineButton.addEventListener('click', () => {
        gameMode = 'vsMachine';
        startGameSetup();
    });

    optionsTwoPlayersButton.addEventListener('click', () => {
        gameMode = 'multiplayer';
        startGameSetup();
    });

    startNewGameButton.addEventListener('click', startGame);

    newGameButton.addEventListener('click', () => {
        overlay.style.display = 'flex';
        resetGame();
    });

    function startGameSetup() {
        if(gameMode === 'vsMachine'){
            document.getElementById('player-two').parentElement.style.display = 'none';
        } else{
            document.getElementById('player-two').parentElement.style.display = 'block';
        }
        document.querySelector('.players-information').style.display = 'block';
    }

    function startGame() {
        playerOneName = playerOneInput.value || 'Player 1';
        if(gameMode === 'Multiplayer'){
            playerTwoName = playerTwoInput.value || 'Player 2';
        }
        overlay.style.display = 'none';
        initializeGame();
    }

    function initializeGame() {
        playerOneOptions.forEach(button => {
            button.addEventListener('click', () => {
                playerOneChoice = button.id.replace('first-', '');
                if (gameMode === 'vsMachine') {
                    playerTwoChoice = getRandomChoice();
                    determineWinner();
                }
            });
        });

        if (gameMode === 'multiplayer') {
            playerTwoOptions.forEach(button => {
                button.addEventListener('click', () => {
                    playerTwoChoice = button.id.replace('second-', '');
                    determineWinner();
                });
            });
        }
    }

    function getRandomChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function determineWinner() {
        if (!playerOneChoice || !playerTwoChoice) return;

        let result = '';
        if (playerOneChoice === playerTwoChoice) {
            result = 'It\'s a tie!';
        } else if (
            (playerOneChoice === 'rock' && playerTwoChoice === 'scissors') ||
            (playerOneChoice === 'paper' && playerTwoChoice === 'rock') ||
            (playerOneChoice === 'scissors' && playerTwoChoice === 'paper')
        ) {
            result = `${playerOneName} wins!`;
            playerOneScore++;
        } else {
            result = `${playerTwoName} wins!`;
            playerTwoScore++;
        }

        resultDisplay.innerText = result;
        updateScoreboard(result);
        resetChoices();
    }

    function updateScoreboard(result) {
        if(playerOneScore <= playerOneRadioButtons.length){
            playerOneRadioButtons[playerOneScore -1].checked = true;
        }
        if(playerTwoScore <= playerTwoRadioButtons.length){
            playerTwoRadioButtons[playerTwoScore -1].checked = true;
        }

        if(playerOneScore >= 2){
            leaderDisplay.innerText =  `${playerOneName} is the overall winner!`;
            disableGame();
        }else if (playerTwoScore >= 2){
            leaderDisplay.innerText = `${playerTwoName} is the overall winner!`;
            disableGame();
        }
    }

    function resetChoices() {
        playerOneChoice = '';
        playerTwoChoice = '';
    }

    function resetGame() {
        playerOneChoice = '';
        playerTwoChoice = '';
        resultDisplay.innerText = '';
        leaderDisplay.innerText = '';
        playerOneInput.value = '';
        playerTwoInput.value = '';
        document.querySelector('.players-information').style.display = 'none';
    }
});
