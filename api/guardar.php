<?php
// ============================================================
// FENIFISC API - Guardar / Actualizar Atleta
// Metodo: POST
// ============================================================
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error('Metodo no permitido. Use POST.', 405);
}

// Obtener datos del body JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    error('Datos JSON invalidos.');
}

// Validar campos obligatorios
if (empty($data['nombres']) || empty($data['apellidos']) || empty($data['documentoIdentidad'])) {
    error('Los campos Nombres, Apellidos y Documento de Identidad son obligatorios.');
}

// Preparar valores
$documento = $conn->real_escape_string($data['documentoIdentidad'] ?? '');

// Verificar si el atleta ya existe (por documento de identidad)
$sql_check = "SELECT id FROM atletas WHERE documento_identidad = '$documento'";
$result = $conn->query($sql_check);
$existe = ($result && $result->num_rows > 0);

// Funcion helper para escapar strings
function e($conn, $val) {
    return $conn->real_escape_string($val ?? '');
}

if ($existe) {
    // ACTUALIZAR
    $row = $result->fetch_assoc();
    $id = $row['id'];
    
    $sql = "UPDATE atletas SET
        nombres = '" . e($conn, $data['nombres']) . "',
        apellidos = '" . e($conn, $data['apellidos']) . "',
        fecha_nacimiento = '" . e($conn, $data['fechaNacimiento']) . "',
        edad = " . intval($data['edad'] ?? 0) . ",
        genero = '" . e($conn, $data['genero']) . "',
        nacionalidad = '" . e($conn, $data['nacionalidad']) . "',
        lugar_nacimiento = '" . e($conn, $data['lugarNacimiento']) . "',
        estado_civil = '" . e($conn, $data['estadoCivil']) . "',
        direccion = '" . e($conn, $data['direccion']) . "',
        estudia_actualmente = " . ($data['estudiaActualmente'] ? 1 : 0) . ",
        telefono = '" . e($conn, $data['telefono']) . "',
        correo_electronico = '" . e($conn, $data['correoElectronico']) . "',
        disciplina_deportiva = '" . e($conn, $data['disciplinaDeportiva']) . "',
        equipo_club = '" . e($conn, $data['equipoClub']) . "',
        categoria = '" . e($conn, $data['categoria']) . "',
        peso = '" . e($conn, $data['peso']) . "',
        seleccion = '" . e($conn, $data['seleccion']) . "',
        eventos_internacionales = " . ($data['eventosInternacionales'] ? 1 : 0) . ",
        anio_inicio = '" . e($conn, $data['anioInicio']) . "',
        nombre_entrenador = '" . e($conn, $data['nombreEntrenador']) . "',
        logros = '" . e($conn, $data['logros']) . "',
        contacto_emergencia_nombre = '" . e($conn, $data['contactoEmergenciaNombre']) . "',
        contacto_emergencia_parentesco = '" . e($conn, $data['contactoEmergenciaParentesco']) . "',
        contacto_emergencia_telefono = '" . e($conn, $data['contactoEmergenciaTelefono']) . "',
        foto_carnet = '" . e($conn, $data['fotoCarnet']) . "',
        foto_cedula_frente = '" . e($conn, $data['fotoCedulaFrente']) . "',
        foto_cedula_reverso = '" . e($conn, $data['fotoCedulaReverso']) . "',
        foto_pasaporte = '" . e($conn, $data['fotoPasaporte']) . "'
    WHERE id = $id";
    
    if ($conn->query($sql)) {
        exito('Atleta actualizado correctamente.', ['id' => $id, 'accion' => 'actualizado']);
    } else {
        error('Error al actualizar: ' . $conn->error, 500);
    }
    
} else {
    // INSERTAR NUEVO
    $sql = "INSERT INTO atletas (
        nombres, apellidos, fecha_nacimiento, edad, genero, nacionalidad,
        documento_identidad, lugar_nacimiento, estado_civil, direccion,
        estudia_actualmente, telefono, correo_electronico,
        disciplina_deportiva, equipo_club, categoria, peso, seleccion,
        eventos_internacionales, anio_inicio, nombre_entrenador, logros,
        contacto_emergencia_nombre, contacto_emergencia_parentesco, contacto_emergencia_telefono,
        foto_carnet, foto_cedula_frente, foto_cedula_reverso, foto_pasaporte
    ) VALUES (
        '" . e($conn, $data['nombres']) . "',
        '" . e($conn, $data['apellidos']) . "',
        '" . e($conn, $data['fechaNacimiento']) . "',
        " . intval($data['edad'] ?? 0) . ",
        '" . e($conn, $data['genero']) . "',
        '" . e($conn, $data['nacionalidad']) . "',
        '" . e($conn, $data['documentoIdentidad']) . "',
        '" . e($conn, $data['lugarNacimiento']) . "',
        '" . e($conn, $data['estadoCivil']) . "',
        '" . e($conn, $data['direccion']) . "',
        " . ($data['estudiaActualmente'] ? 1 : 0) . ",
        '" . e($conn, $data['telefono']) . "',
        '" . e($conn, $data['correoElectronico']) . "',
        '" . e($conn, $data['disciplinaDeportiva']) . "',
        '" . e($conn, $data['equipoClub']) . "',
        '" . e($conn, $data['categoria']) . "',
        '" . e($conn, $data['peso']) . "',
        '" . e($conn, $data['seleccion']) . "',
        " . ($data['eventosInternacionales'] ? 1 : 0) . ",
        '" . e($conn, $data['anioInicio']) . "',
        '" . e($conn, $data['nombreEntrenador']) . "',
        '" . e($conn, $data['logros']) . "',
        '" . e($conn, $data['contactoEmergenciaNombre']) . "',
        '" . e($conn, $data['contactoEmergenciaParentesco']) . "',
        '" . e($conn, $data['contactoEmergenciaTelefono']) . "',
        '" . e($conn, $data['fotoCarnet']) . "',
        '" . e($conn, $data['fotoCedulaFrente']) . "',
        '" . e($conn, $data['fotoCedulaReverso']) . "',
        '" . e($conn, $data['fotoPasaporte']) . "'
    )";
    
    if ($conn->query($sql)) {
        $id = $conn->insert_id;
        exito('Atleta registrado correctamente.', ['id' => $id, 'accion' => 'creado']);
    } else {
        error('Error al guardar: ' . $conn->error, 500);
    }
}
