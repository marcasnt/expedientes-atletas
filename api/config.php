<?php
// ============================================================
// FENIFISC API - Configuracion de Base de Datos + Uploads
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
$DB_HOST = 'localhost';
$DB_NAME = 'u613470100_expedientes';
$DB_USER = 'u613470100_marcasnt';
$DB_PASS = 'mamcyj11JM.,';

// Conexion a MySQL
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Error de conexion a la base de datos: ' . $conn->connect_error]);
    exit;
}

$conn->set_charset('utf8mb4');

// ============================================================
// CONFIGURACION DE UPLOADS (fotos como archivos reales)
// ============================================================
// Ruta fisica en el servidor (carpeta uploads al mismo nivel que api/)
$UPLOADS_DIR = dirname(__DIR__) . '/uploads/';
// Ruta URL relativa para el frontend
$UPLOADS_URL = './uploads/';

// Crear carpeta uploads si no existe
if (!is_dir($UPLOADS_DIR)) {
    mkdir($UPLOADS_DIR, 0755, true);
}

// Funcion helper para respuestas JSON
function responder($data, $codigo = 200) {
    http_response_code($codigo);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function error($mensaje, $codigo = 400) {
    responder(['exito' => false, 'error' => $mensaje], $codigo);
}

function exito($mensaje, $datos = []) {
    responder(array_merge(['exito' => true, 'mensaje' => $mensaje], $datos), 200);
}

// ============================================================
// HELPER: Procesar foto Base64 -> archivo real
// ============================================================
// Recibe el string Base64 o ruta existente, y devuelve la ruta relativa al archivo guardado.
// Si ya es una ruta (no empieza con "data:"), la devuelve tal cual.
function procesarFoto($base64OPath, $documento, $tipo) {
    global $UPLOADS_DIR, $UPLOADS_URL;

    // Si esta vacio, retornar null
    if (empty($base64OPath)) {
        return null;
    }

    // Si ya es una ruta de archivo (no empieza con data:image), devolverla tal cual
    if (strpos($base64OPath, 'data:image') !== 0) {
        return $base64OPath;
    }

    // Es Base64: decodificar y guardar como archivo
    // Extraer extension del mime type (png, jpeg, webp, gif)
    if (preg_match('/^data:image\/(\w+);base64,/', $base64OPath, $matches)) {
        $ext = strtolower($matches[1]);
        if ($ext === 'jpeg') $ext = 'jpg';
    } else {
        $ext = 'jpg'; // default
    }

    // Limpiar documento para usar en nombre de archivo (quitar caracteres raros)
    $docLimpio = preg_replace('/[^a-zA-Z0-9_-]/', '_', $documento);
    $nombreArchivo = $docLimpio . '_' . $tipo . '_' . uniqid() . '.' . $ext;
    $rutaCompleta = $UPLOADS_DIR . $nombreArchivo;

    // Decodificar Base64
    $base64Data = substr($base64OPath, strpos($base64OPath, ',') + 1);
    $imagenDecodificada = base64_decode($base64Data, true);

    if ($imagenDecodificada === false) {
        error('Error al decodificar la imagen ' . $tipo);
    }

    // Guardar archivo
    if (file_put_contents($rutaCompleta, $imagenDecodificada) === false) {
        error('Error al guardar el archivo de imagen ' . $tipo);
    }

    return $UPLOADS_URL . $nombreArchivo;
}

// ============================================================
// HELPER: Borrar archivo de foto si existe
// ============================================================
function borrarFoto($rutaRelativa) {
    global $UPLOADS_DIR;
    if (!empty($rutaRelativa)) {
        $ruta = $UPLOADS_DIR . basename($rutaRelativa);
        if (file_exists($ruta)) {
            unlink($ruta);
        }
    }
}

// Funcion helper para escapar strings
function e($conn, $val) {
    return $conn->real_escape_string($val ?? '');
}
