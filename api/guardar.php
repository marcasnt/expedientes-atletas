<?php
// ============================================================
// FENIFISC API - Guardar / Actualizar Atleta
// Metodo: POST
// Las fotos Base64 se guardan como archivos en uploads/ y
// en la BD solo se guarda la ruta del archivo.
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

if (empty($data['nombres']) || empty($data['apellidos']) || empty($data['documentoIdentidad'])) {
    error('Los campos Nombres, Apellidos y Documento de Identidad son obligatorios.');
}

$documento = e($conn, $data['documentoIdentidad'] ?? '');

// Verificar si el atleta ya existe
$sql_check = "SELECT id, foto_carnet, foto_cedula_frente, foto_cedula_reverso, foto_pasaporte 
              FROM atletas WHERE documento_identidad = '$documento'";
$result = $conn->query($sql_check);
$existe = ($result && $result->num_rows > 0);

// Procesar fotos (Base64 -> archivos reales)
$fotoCarnet = procesarFoto($data['fotoCarnet'] ?? null, $documento, 'carnet');
$fotoCedulaFrente = procesarFoto($data['fotoCedulaFrente'] ?? null, $documento, 'cedula_frente');
$fotoCedulaReverso = procesarFoto($data['fotoCedulaReverso'] ?? null, $documento, 'cedula_reverso');
$fotoPasaporte = procesarFoto($data['fotoPasaporte'] ?? null, $documento, 'pasaporte');

if ($existe) {
    // ACTUALIZAR
    $row = $result->fetch_assoc();
    $id = $row['id'];

    // Si se reemplazo una foto, borrar la antigua
    if ($fotoCarnet && $fotoCarnet !== $row['foto_carnet']) borrarFoto($row['foto_carnet']);
    if ($fotoCedulaFrente && $fotoCedulaFrente !== $row['foto_cedula_frente']) borrarFoto($row['foto_cedula_frente']);
    if ($fotoCedulaReverso && $fotoCedulaReverso !== $row['foto_cedula_reverso']) borrarFoto($row['foto_cedula_reverso']);
    if ($fotoPasaporte && $fotoPasaporte !== $row['foto_pasaporte']) borrarFoto($row['foto_pasaporte']);

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
        foto_carnet = '" . e($conn, $fotoCarnet) . "',
        foto_cedula_frente = '" . e($conn, $fotoCedulaFrente) . "',
        foto_cedula_reverso = '" . e($conn, $fotoCedulaReverso) . "',
        foto_pasaporte = '" . e($conn, $fotoPasaporte) . "'
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
        '$documento',
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
        '" . e($conn, $fotoCarnet) . "',
        '" . e($conn, $fotoCedulaFrente) . "',
        '" . e($conn, $fotoCedulaReverso) . "',
        '" . e($conn, $fotoPasaporte) . "'
    )";

    if ($conn->query($sql)) {
        $id = $conn->insert_id;
        exito('Atleta registrado correctamente.', ['id' => $id, 'accion' => 'creado']);
    } else {
        error('Error al guardar: ' . $conn->error, 500);
    }
}
