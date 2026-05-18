<?php
// ============================================================
// FENIFISC API - Configuracion de Base de Datos
// ============================================================
// INSTRUCCIONES:
// 1. Reemplaza estos valores con tus credenciales de cPanel
// 2. En cPanel ve a: Bases de datos MySQL -> Crear base de datos y usuario
// 3. Anota: nombre BD, usuario BD, contraseña, host (normalmente "localhost")
// ============================================================

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// <-- REEMPLAZA ESTOS DATOS CON LOS TUYOS DE CPANEL -->
$DB_HOST = 'localhost';           // Normalmente "localhost" en cPanel
$DB_NAME = 'fenifisc_atletas';    // Nombre de la base de datos que creaste
$DB_USER = 'fenifisc_user';       // Usuario de la base de datos
$DB_PASS = 'TU_CONTRASENA_AQUI';  // Contraseña del usuario

// Conexion a MySQL
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Error de conexion a la base de datos: ' . $conn->connect_error]);
    exit;
}

// Establecer charset utf8mb4
$conn->set_charset('utf8mb4');

// Funcion helper para respuestas JSON
function responder($data, $codigo = 200) {
    http_response_code($codigo);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

// Funcion helper para errores
function error($mensaje, $codigo = 400) {
    responder(['exito' => false, 'error' => $mensaje], $codigo);
}

// Funcion helper para exito
function exito($mensaje, $datos = []) {
    responder(array_merge(['exito' => true, 'mensaje' => $mensaje], $datos), 200);
}
