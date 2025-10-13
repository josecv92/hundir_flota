// --- PASO 1: SELECCIÓN DE ELEMENTOS DEL DOM ---

// Guarda en constantes los elementos del HTML que vas a necesitar manipular.
// Usa document.getElementById() o document.querySelector().

const gameBoard = document.getElementById("game-board") ;
const messageArea = document.getElementById("message-area");
const shotCounter = document.getElementById("shot-counter");
const fleetStatus = document.getElementById("fleet-status");
const gameOverModal = document.getElementById("game-over-modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const playerNameInput = document.getElementById("player-name");
const saveScoreBtn = document.getElementById("save-score-btn");
const scoreList = document.getElementById("score-list");
const counterShot = document.getElementById("shot-counter");

// --- PASO 2: DEFINICIÓN DEL ESTADO DEL JUEGO ---

// Crea un objeto 'gameState' para almacenar toda la información de la partida.
let gameState = {
   boardSize: 0,
   fleet: [], // Aquí guardaremos la información de la flota enemiga.
   shotsFired: 0,
   shipsSunk: 0,
   isGameOver: false
};

// --- PASO 3: INICIO DEL JUEGO ---

// Crea una función asíncrona 'startGame' que se ejecutará al cargar la página.

  async function startGame() {
   // Usa un bloque 'try...catch' para manejar errores si el servidor no responde.
    try {
        // Realiza una petición 'fetch' a tu 'start_game.php'.
        const response = await fetch("start_game.php");
        // Convierte la respuesta a JSON.
        const data = await response.json();

        data.ships.forEach(ship => {
            ship.positions.forEach(pos => {
                pos.row--; 
                pos.col--;
            });
        });
        // Actualiza el 'gameState' con los datos recibidos del servidor.
        gameState.boardSize = data.boardSize;
        gameState.fleet = data.ships; 

        // Llama a las funciones que se encargan de "dibujar" la interfaz.
        renderBoard();
        renderFleetStatus();
        // Muestra un mensaje de inicio.
        messageArea.textContent = "¡El juego ha comenzado!";
    } catch (error) {
        console.error("Error fetching API data:", error);
    }
}
// --- PASO 4: RENDERIZADO DE LA INTERFAZ ---

// Crea la función 'renderBoard' que genera el tablero.
function renderBoard() {
   // Limpia el tablero por si había algo antes.
   gameBoard.innerHTML = "";

   // Ajusta el estilo CSS 'grid-template-columns' del tablero para que coincida con 'boardSize'.
   gameBoard.style.display = "grid";
   gameBoard.style.marginTop = "20px";

   gameBoard.style.gridTemplateColumns = `repeat(${gameState.boardSize}, 1fr)`;
   gameBoard.style.gridTemplateRows = `repeat(${gameState.boardSize}, 1fr)`;
   gameBoard.style.gap = "0";

   // Usa dos bucles 'for' anidados (uno para filas, otro para columnas) para crear cada celda.
   for (let row = 0; row < gameState.boardSize; row++) {
      for (let col = 0; col < gameState.boardSize; col++) {

      // Crea un elemento 'div' para la celda.
      const cell = document.createElement("div");
      // Añádele la clase 'cell'.
      cell.classList.add("cell");

      // Guarda sus coordenadas usando 'dataset'. ¡MUY IMPORTANTE!
      cell.dataset.row = row;
      cell.dataset.col = col;

      // Este evento debe llamar a la función 'handleCellClick'.
      cell.addEventListener("click", handleCellClick);

      // Añade la celda al tablero.
      gameBoard.appendChild(cell);
    }
  }
}

// Crea la función 'renderFleetStatus' que muestra la lista de barcos.
function renderFleetStatus() {
  fleetStatus.innerHTML = "";

   // Recorre 'gameState.fleet' y por cada barco, crea un '<li>' y añádelo a 'fleetStatusEl'.
  gameState.fleet.forEach((ship) => {
    const li = document.createElement("li");
    li.classList.add("barco");
    if (ship.sunk) li.classList.add("hundido");
    li.textContent = `${ship.name} (${ship.size} casillas)`;
    fleetStatus.appendChild(li);
  });
}

// --- PASO 5: LÓGICA DE DISPARO ---

// Crea la función 'handleCellClick' que se ejecuta al hacer clic en una celda.
function handleCellClick(event) {
   const cell = event.currentTarget;

   // Comprueba si el juego ha terminado o si la celda ya ha sido disparada. Si es así, sal de la función con 'return'.
   if (gameState.isGameOver){
      return;
   }
   if (cell.dataset.fired === "true") {
      return;
   }

   // Marca la celda como 'disparada' usando 'dataset'.
   cell.dataset.fired = "true";

   // Incrementa el contador de disparos y actualiza el HTML.
   gameState.shotsFired++;
   shotCounter.textContent = gameState.shotsFired;

   // ¡OJO! Convierte las coordenadas del 'dataset' (que son string) a número usando parseInt().
   const row = parseInt(cell.dataset.row, 10);
   const col = parseInt(cell.dataset.col, 10);

   // Busca si el disparo ha acertado en algún barco.
   let hit = false;

   // Usa un 'forEach' o 'findIndex' en 'gameState.fleet' para comprobar si las coordenadas coinciden.
   gameState.fleet.forEach((ship) => {
      ship.positions.forEach((pos) => {
         if (pos.row === row && pos.col === col) {
            // Si ha acertado ('hit')...
            hit = true;
            messageArea.textContent = "Tocado.";
            // Añade la clase 'tocado' a la celda.  gameState.fleet.forEach((ship) => {
            cell.classList.add("tocado");

            // Incrementa el contador de aciertos ('hits') del barco correspondiente.
            ship.hits++;

            // Comprueba si el barco está hundido (si 'hits' es igual a 'size').
            if (ship.hits >= ship.size && !ship.sunk) {
               // Si está hundido...
               // Marca el barco como 'isSunk = true'.
               ship.sunk = true;
               messageArea.textContent = "Hundido.";
               // Incrementa el contador de barcos hundidos.
               gameState.shipsSunk++;

               // Actualiza el estilo en la lista de la flota.
               renderFleetStatus();
            }
         }
      });
   });
   // Si no ha acertado ('miss')...
   // Añade la clase 'agua' a la celda.  if (!hit) {
   if(!hit){
      cell.classList.add("agua");
      messageArea.textContent = "Agua.";
   }

   // Comprueba si todos los barcos han sido hundidos (fin del juego).
   const allSunk = gameState.fleet.every(ship => ship.sunk);
   // Si es así, llama a la función 'endGame()'.
   if (allSunk) {
      endGame();
   }
}

// --- PASO 6: FIN DEL JUEGO Y PUNTUACIONES ---

// Crea la función 'endGame' que muestra el modal de victoria.
function endGame() {
   gameState.isGameOver = true;
   gameOverModal.style.display = "block";
   modalText.textContent = `Has hundido toda la flota en ${gameState.shotsFired} disparos.`;
}

// Añade el 'event listener' al botón de guardar puntuación.
saveScoreBtn.addEventListener("click", async () => {

   const playerName = playerNameInput.value.trim();;

   if (!playerName) {
      alert("Introduce tu nombre antes de guardar la puntuación.");
      return;
   }

   const nuevaPuntuacion = {
      name: playerName,
      shots: gameState.shotsFired
   };

   try {
      // Este debe hacer una petición 'fetch' con método 'POST' a 'save_score.php'.
      const response = await fetch("save_score.php", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(nuevaPuntuacion)
      });

      if (!response.ok) {
         throw new Error(`Error al guardar puntuación: ${response.status}`);
      }

      const result = await response.json();
      console.log("Resultado del servidor:", result);
      messageArea.textContent = "Puntuación guardada con exito";

      gameOverModal.style.display = "none";

      loadScores();
      window.location.reload();
   } 
   catch (error) {
    console.error("Error al enviar la puntuación:", error);
    messageArea.textContent = "Error al guardar la puntuación.";
  }
});

// Crea la función 'loadScores' que pide el ranking a 'get_scores.php' y lo muestra en el HTML.
async function loadScores() {
   try {
      const response = await fetch("get_scores.php");

   if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
   }

   const scores = await response.json();

   scoreList.innerHTML = "";

   scores.forEach((score, index) => {
      const li = document.createElement("li");
      li.textContent = `${score.name} — ${score.shots} disparos`;
      scoreList.appendChild(li);
   });

   }   
   catch (error) {
      console.error("Error al cargar el ranking:", error);
  }
}


// --- INVOCACIÓN INICIAL ---
window.addEventListener("DOMContentLoaded", () => {
  startGame();
  loadScores();
});
