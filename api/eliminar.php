<?php
// ============================================================
// FENIFISC API - Eliminar Atleta
// Metodo: POST
// Body JSON: { "id": 123 } o { "documento": "001-1234" }
// ============================================================
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error('Metodo no permitido. Use POST.', 405);
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    error('Datos JSON invalidos.');
}

// Eliminar por ID
if (isset($data['id']) && is_numeric($data['id'])) {
    $id = intval($data['id']);
    $sql = "DELETE FROM atletas WHERE id = $id";
    
    if ($conn->query($sql)) {
        if ($conn->affected_rows > 0) {
            exito('Atleta eliminado correctamente.');
        } else {
            error('Atleta no encontrado.', 404);
        }
    } else {
        error('Error al eliminar: ' . $conn->error, 500);
    }
}

// Eliminar por documento
if (isset($data['documento']) && !empty($data['documento'])) {
    $documento = $conn->real_escape_string($data['documento']);
    $sql = "DELETE FROM atletas WHERE documento_identidad = '$documento'";
    
    if ($conn->query($sql)) {
        if ($conn->affected_rows > 0) {
            exito('Atleta eliminado correctamente.');
        } else {
            error('Atleta no encontrado.', 404);
        }
    } else {
        error('Error al eliminar: ' . $conn->error, 500);
    }
}

error('Debe proporcionar "id" o "documento".');
