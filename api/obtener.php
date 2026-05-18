<?php
// ============================================================
// FENIFISC API - Obtener Atletas
// Metodo: GET
// Parametros opcionales: ?id=123 o ?documento=001-1234
// Sin parametros: devuelve lista completa
// ============================================================
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    error('Metodo no permitido. Use GET.', 405);
}

// Funcion para construir el objeto atleta desde la base de datos
function construirAtleta($row) {
    return [
        'id' => $row['id'],
        'nombres' => $row['nombres'],
        'apellidos' => $row['apellidos'],
        'fechaNacimiento' => $row['fecha_nacimiento'],
        'edad' => $row['edad'],
        'genero' => $row['genero'],
        'nacionalidad' => $row['nacionalidad'],
        'documentoIdentidad' => $row['documento_identidad'],
        'lugarNacimiento' => $row['lugar_nacimiento'],
        'estadoCivil' => $row['estado_civil'],
        'direccion' => $row['direccion'],
        'estudiaActualmente' => (bool)$row['estudia_actualmente'],
        'telefono' => $row['telefono'],
        'correoElectronico' => $row['correo_electronico'],
        'disciplinaDeportiva' => $row['disciplina_deportiva'],
        'equipoClub' => $row['equipo_club'],
        'categoria' => $row['categoria'],
        'peso' => $row['peso'],
        'seleccion' => $row['seleccion'],
        'eventosInternacionales' => (bool)$row['eventos_internacionales'],
        'anioInicio' => $row['anio_inicio'],
        'nombreEntrenador' => $row['nombre_entrenador'],
        'logros' => $row['logros'],
        'contactoEmergenciaNombre' => $row['contacto_emergencia_nombre'],
        'contactoEmergenciaParentesco' => $row['contacto_emergencia_parentesco'],
        'contactoEmergenciaTelefono' => $row['contacto_emergencia_telefono'],
        'fotoCarnet' => $row['foto_carnet'],
        'fotoCedulaFrente' => $row['foto_cedula_frente'],
        'fotoCedulaReverso' => $row['foto_cedula_reverso'],
        'fotoPasaporte' => $row['foto_pasaporte'],
        'creadoEn' => $row['creado_en'],
        'actualizadoEn' => $row['actualizado_en'],
    ];
}

// Obtener por ID
if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = intval($_GET['id']);
    $sql = "SELECT * FROM atletas WHERE id = $id LIMIT 1";
    $result = $conn->query($sql);
    
    if ($result && $result->num_rows > 0) {
        $atleta = construirAtleta($result->fetch_assoc());
        exito('Atleta encontrado.', ['atleta' => $atleta]);
    } else {
        error('Atleta no encontrado.', 404);
    }
}

// Obtener por documento de identidad
if (isset($_GET['documento']) && !empty($_GET['documento'])) {
    $documento = $conn->real_escape_string($_GET['documento']);
    $sql = "SELECT * FROM atletas WHERE documento_identidad = '$documento' LIMIT 1";
    $result = $conn->query($sql);
    
    if ($result && $result->num_rows > 0) {
        $atleta = construirAtleta($result->fetch_assoc());
        exito('Atleta encontrado.', ['atleta' => $atleta]);
    } else {
        error('Atleta no encontrado.', 404);
    }
}

// Listar todos los atletas (sin fotos para que sea rapido)
$sql = "SELECT 
    id, nombres, apellidos, documento_identidad, 
    categoria, seleccion, creado_en
FROM atletas ORDER BY creado_en DESC";

$result = $conn->query($sql);
$atletas = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $atletas[] = [
            'id' => $row['id'],
            'nombres' => $row['nombres'],
            'apellidos' => $row['apellidos'],
            'documentoIdentidad' => $row['documento_identidad'],
            'categoria' => $row['categoria'],
            'seleccion' => $row['seleccion'],
            'creadoEn' => $row['creado_en'],
        ];
    }
}

exito('Lista de atletas obtenida.', ['total' => count($atletas), 'atletas' => $atletas]);
