<?php  
// ============== GUÍA PARA EL BACK-END ============== (save_score.php)  
// PASO 1: Configurar la cabecera de la respuesta.  
// header('Content-Type: ...');  
// PASO 2: Definir la ruta del archivo de puntuaciones.  
// $scoresFile = 'scores.json';  
// PASO 3: Obtener los datos enviados por el Front-End.  
// Usa file_get_contents('php://input') para leer el cuerpo de la petición POST.  
// Usa json_decode(..., true) para convertir el JSON a un array asociativo de PHP.  
// $input = ...;  
// $`playerName = `$input['name'] ?? 'Jugador Anónimo';  
// $`playerShots = `$input['shots'] ?? 999;  
// PASO 4: Leer las puntuaciones existentes.  
// $scores = [];  
// Si el archivo $scoresFile existe, léelo y decodifícalo a PHP. // if (file_exists($scoresFile)) { ... }  
// PASO 5: Añadir la nueva puntuación.  
// $scores[] = [...];  
// PASO 6: Ordenar las puntuaciones (menor número de disparos es mejor). // Usa usort() con una función de comparación.  
// usort($`scores, function(`$a, $b) { ... });  
// PASO 7: Mantener solo el Top 10.  
// Usa array_slice().  
// $scores = array_slice(...);  
// PASO 8: Guardar el archivo actualizado.  
// Usa file_put_contents() para escribir el array de PHP (codificado a JSON) en el archivo.  
// file_put_contents($`scoresFile, json_encode(`$scores, JSON_PRETTY_PRINT));  
// PASO 9: Devolver una respuesta de éxito.  
// echo json_encode(['status' => 'success', 'message' => 'Puntuación guardada.']);  
?> 