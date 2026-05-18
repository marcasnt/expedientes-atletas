<?php
// ============================================================
// FENIFISC API - Eliminar Atleta + sus fotos
// Metodo: POST
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

// Funcion para eliminar un atleta por ID o documento
function eliminarAtleta($conn, $campo, $valor) {
    // Primero obtener las rutas de las fotos para borrar los archivos
    $sql_fotos = "SELECT foto_carnet, foto_cedula_frente, foto_cedula_reverso, foto_pasaporte 
                  FROM atletas WHERE $campo = '$valor'";
    $res = $conn->query($sql_fotos);

    if ($res && $res->num_rows > 0) {
        $row = $res->fetch_assoc();
        // Borrar archivos fisicos de fotos
        borrarFoto($row['foto_carnet']);
        borrarFoto($row['foto_cedula_frente']);
        borrarFoto($row['foto_cedula_reverso']);
        borrarFoto($row['foto_pasaporte']);
    }

    // Ahora eliminar el registro de la base de datos
    $sql = "DELETE FROM atletas WHERE $campo = '$valor'";
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

// Eliminar por ID
if (isset($data['id']) && is_numeric($data['id'])) {
    $id = intval($data['id']);
    eliminarAtleta($conn, 'id', $id);
}

// Eliminar por documento
if (isset($data['documento']) && !empty($data['documento'])) {
    $documento = $conn->real_escape_string($data['documento']);
    eliminarAtleta($conn, 'documento_identidad', $documento);
}

error('Debe proporcionar "id" o "documento".');
