<?php  
// ============== GUÍA PARA EL BACK-END ============== (save_score.php)  
// PASO 1: Configurar la cabecera de la respuesta.  
// header('Content-Type: ...');  
header ('Content-Type: application/json');
// PASO 2: Definir la ruta del archivo de puntuaciones.  
$scoresFile = 'scores.json';  
// PASO 3: Obtener los datos enviados por el Front-End.  
// Usa file_get_contents('php://input') para leer el cuerpo de la petición POST.  
$input = json_decode(file_get_contents('php://input'), true);

$playerName = $input['name'] ?? 'Jugador Anónimo';  
$playerShots = $input['shots'] ?? 999;  
// PASO 4: Leer las puntuaciones existentes.  
$scores = [];  
// Si el archivo $scoresFile existe, léelo y decodifícalo a PHP. // 
if (file_exists($scoresFile)) { 
    $stringScore = file_get_contents($scoresFile);
// Usa json_decode(..., true) para convertir el JSON a un array asociativo de PHP.  
    $scores = json_decode($stringScore, true);
}  
// PASO 5: Añadir la nueva puntuación.  

$scores[] = [
    'name' => $playerName,
    'shots' => $playerShots
];  
// PASO 6: Ordenar las puntuaciones (menor número de disparos es mejor). // Usa usort() con una función de comparación.  

usort($scores, function($a, $b) {
     return $a['shots'] <=> $b['shots']; 
    });  
// PASO 7: Mantener solo el Top 10.  
// Usa array_slice().  
$scores = array_slice($scores, 0, 10);  
// PASO 8: Guardar el archivo actualizado.  
// Usa file_put_contents() para escribir el array de PHP (codificado a JSON) en el archivo.  
file_put_contents($scoresFile, json_encode($scores, JSON_PRETTY_PRINT));  
// PASO 9: Devolver una respuesta de éxito.  
echo json_encode(['status' => 'success', 'message' => 'Puntuación guardada.']);  
?> 