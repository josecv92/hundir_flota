// --- PASO 1: SELECCIÓN DE ELEMENTOS DEL DOM ---
const gameBoard = document.getElementById("game-board");
const messageArea = document.getElementById("message-area");
const shotCounter = document.getElementById("shot-counter");
const fleetStatus = document.getElementById("fleet-status");
const gameOverModal = document.getElementById("game-over-modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const playerNameInput = document.getElementById("player-name").value;
const saveScoreBtn = document.getElementById("save-score-btn");
const scoreList = document.getElementById("score-list");
const counterShot = document.getElementById("shot-counter");

// --- PASO 2: DEFINICIÓN DEL ESTADO DEL JUEGO ---
let gameState = {
	boardSize: 0,
	fleet: [], // Aquí guardaremos la información de la flota enemiga.
	shotsFired: 0,
	shipsSunk: 0,
	isGameOver: false,
};

// --- PASO 3: INICIO DEL JUEGO ---
async function startGame() {
	try {
		// Realiza una petición 'fetch' a tu 'start_game.php'.
		const response = await fetch("info.json");
		const data = await response.json();

		gameState.boardSize = data.boardSize;
		gameState.fleet = data.fleet;

		console.log({ gameState }, 0);

		renderBoard();
		renderFleetStatus();

		console.log({ flota: gameState.fleet });

		// Muestra un mensaje de inicio.
		// messageArea.textContent = '...';
	} catch (error) {
		//Muestra un mensaje de error si la petición falla.
	}
}

// --- PASO 4: RENDERIZADO DE LA INTERFAZ ---
function renderBoard() {
	return;
	gameBoard.innerHTML = "";
	// Ajusta el estilo CSS 'grid-template-columns' del tablero para que coincida con 'boardSize'.
	gameBoard.style.gridTemplateColumns = `repeat(${gameState.boardSize}, 40px)`;
	// Usa dos bucles 'for' anidados (uno para filas, otro para columnas) para crear cada celda.
	for (let row = 0; row < gameState.boardSize; row++) {
		for (let col = 0; col < gameState.boardSize; col++) {
			// Crea un elemento 'div' para la celda.
			const cell = "???"; // ...;
			// Añádele la clase 'cell'.
			cell.classList.add("???");
			// Guarda sus coordenadas usando 'dataset'. ¡MUY IMPORTANTE!
			cell.dataset.row = row;
			cell.dataset.col = col;
			// Añade un 'event listener' para que reaccione al evento 'click'.
			// Este evento debe llamar a la función 'handleCellClick'.
			//cell.addEventListener(...);
			// Añade la celda al tablero.
			gameBoard.appendChild(cell);
		}
	}
}

function renderFleetStatus() {
	// Recorre 'gameState.fleet' y por cada barco, crea un '<li>' y añádelo a 'fleetStatusEl'.
	gameState.fleet.forEach((ship) => {
		const li = document.createElement("li");
		li.innerHTML = `${ship.name}  (${ship.size} casillas)`;
		fleetStatus.appendChild(li);
	});
}

// --- PASO 5: LÓGICA DE DISPARO ---
// Crea la función 'handleCellClick' que se ejecuta al hacer clic en una celda.
function handleCellClick(event) {
	// Comprueba si el juego ha terminado o si la celda ya ha sido disparada. Si es así, sal de la función con 'return'.
	// Marca la celda como 'disparada' usando 'dataset'.
	const cell = event.target;
	cell.dataset.fired = "true";
	// Incrementa el contador de disparos y actualiza el HTML.
	// ¡OJO! Convierte las coordenadas del 'dataset' (que son string) a número usando parseInt().
	const row = parseInt(cell.dataset.row);
	const col = "???";
	// Busca si el disparo ha acertado en algún barco.
	// Usa un 'forEach' o 'findIndex' en 'gameState.fleet' para comprobar si las coordenadas coinciden.
	// Si ha acertado ('hit')...
	// Añade la clase 'tocado' a la celda.
	// Incrementa el contador de aciertos ('hits') del barco correspondiente.
	// Comprueba si el barco está hundido (si 'hits' es igual a 'size').
	// Si está hundido...
	// Marca el barco como 'isSunk = true'.
	// Incrementa el contador de barcos hundidos.
	// Actualiza los estilos de todas las casillas de ese barco a 'hundido'.
	// Actualiza el estilo en la lista de la flota.
	// Comprueba si todos los barcos han sido hundidos (fin del juego).
	// Si es así, llama a la función 'endGame()'.
	// Si no ha acertado ('miss')...
	// Añade la clase 'agua' a la celda.
}

// --- PASO 6: FIN DEL JUEGO Y PUNTUACIONES ---
// Crea la función 'endGame' que muestra el modal de victoria.
function endGame() {}

// Añade el 'event listener' al botón de guardar puntuación.
// Este debe hacer una petición 'fetch' con método 'POST' a 'save_score.php'.
// saveScoreBtn.addEventListener(...);

// Crea la función 'loadScores' que pide el ranking a 'get_scores.php' y lo muestra en el HTML.
async function loadScores() {}

startGame();
loadScores();
