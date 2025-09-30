<?php  
// ============== GUÍA PARA EL BACK-END ============== (start_game.php)  
// PASO 1: Configurar la cabecera de la respuesta.  
// PHP debe decirle al navegador que la respuesta que enviará es de tipo JSON. // Usa la función  
// header('Content-Type: ...');  
    header('Content-Type: application/json'); 
// PASO 2: Definir las reglas del juego.  
// Crea una variable para el tamaño del tablero (ej. 10).  
    $boardSize = 10;
// Crea un array asociativo que defina tu flota. Cada barco debe tener un 'name' y un 'size'.  
// Ejemplo: [ ["name" => "Portaaviones", "size" => 5], ... ] // $fleetDefinition = 
    $fleetDefinition = [["name" => "Portaviones", "size" => 5, "positions" => [], "hits" => 0, "isSunk" => false],
        ["name" => "Acorazado", "size" => 4, "positions" => [], "hits" => 0, "isSunk" => false],
        ["name" => "Destructor", "size" => 3, "positions" => [], "hits" => 0, "isSunk" => false],
        ["name" => "Destructor", "size" => 3, "positions" => [], "hits" => 0, "isSunk" => false],
        ["name" => "Fragata", "size" => 2, "positions" => [], "hits" => 0, "isSunk" => false]];
// PASO 3: Preparar las variables donde guardarás los resultados. // Un array para los barcos que logres colocar.  
    $placedShips = [];  
// Un array para llevar un registro de las casillas ya ocupadas y evitar colisiones.  
    $occupiedCoordinates = [];  
// PASO 4: Iniciar el bucle principal para colocar los barcos. // Recorre cada barco definido en $fleetDefinition con un bucle 'foreach'. // 
    foreach ($fleetDefinition as $shipInfo) {  
// PASO 5: Bucle de intento de colocación.  
// Necesitas un bucle 'while' que se repita hasta que el barco actual ('$isPlaced') sea colocado con éxito.  
        $isPlaced = false;  
        while (!$isPlaced) {  
// PASO 6: Generar una posición y orientación aleatorias.  
// Elige si el barco será 'horizontal' o 'vertical'.  
        $orientation = rand(0, 1);  
// Elige una fila y columna de inicio aleatorias dentro del tablero. Usa rand().  
        $startRow = rand(1, (10 - $shipInfo['size'] + 1)); 
        $startCol = rand(1, (10 - $shipInfo['size'] + 1)); 
// PASO 7: Validar la posición del barco.  
// Prepara un array para guardar las coordenadas del barco actual. // 
        $shipCoordinates = [];  
// Y una bandera para saber si la posición es válida.  
        $isValidPlacement = true;  
        echo $startCol, $startRow;
// Inicia un bucle 'for' que se repita tantas veces como el tamaño del barco  ('$shipInfo['size']').  
        for ($i = 0; $i < $shipInfo['size']; $i++) { 
// Calcula la coordenada actual (row, col) basándote en la orientación. 
            if ($orientation == 0){
                $temporaryPositions = ["col"=> $startCol, "row"=> $startRow];
                $shipInfo['positions'].array_push($temporaryPositions);
                $startCol++;
            }else{
                $temporaryPositions = ["col"=> $startCol, "row"=> $startRow];
                $shipInfo['positions'].array_push($temporaryPositions);
                $startRow++;
            } 
// COMPROBACIÓN 1: ¿La casilla está fuera del tablero?  
// COMPROBACIÓN 2: ¿La casilla ya está en '$occupiedCoordinates'? // Si  alguna de las dos es cierta, la posición no es válida. // 
            for ($i = 0; $i <= sizeof($occupiedCoordinates); $i++){
                if ($shipCoordinates['positions'.'row'] )
            
                $occupiedCoordinates.array_push($shipInfo['positions']);
            }
            $isValidPlacement = false;  
            break;
// Rompe el bucle 'for' con 'break;'.  
// Si la casilla es válida, guárdala en '$shipCoordinates'.
        }  
// PASO 8: Colocar el barco si la validación fue exitosa.  
// Si '$isValidPlacement' sigue siendo 'true'...  
// if ($isValidPlacement) {  
// ...recorre las coordenadas guardadas en '$`shipCoordinates' y márcalas como ocupadas en '`$occupiedCoordinates'.  
// ...crea el objeto final del barco y añádelo a '$placedShips'.  
// ...marca el barco como colocado para salir del bucle 'while'. // $isPlaced = true;  
// }  
 } // Fin del while  
} // Fin del foreach  
// PASO 9: Enviar la respuesta final.  
// Prepara el array final de la respuesta.  
//$response = [...];  
// Conviértelo a JSON y envíalo con 'echo'.  
echo json_encode($response);  
?>