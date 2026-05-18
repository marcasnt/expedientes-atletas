-- ============================================================
-- FENIFISC - Base de datos de Expedientes de Atletas
-- Ejecutar esto en phpMyAdmin de tu cPanel
-- ============================================================

-- 1. Crear la base de datos (si no existe ya)
-- NOTA: En cPanel normalmente creas la base de datos desde la interfaz
-- y luego solo ejecutas la parte de CREATE TABLE. Si prefieres crearla
-- por SQL, descomenta la siguiente linea:
-- CREATE DATABASE IF NOT EXISTS fenifisc_atletas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Usar la base de datos (reemplaza fenifisc_atletas por el nombre real)
-- USE fenifisc_atletas;

-- 3. Crear tabla de atletas
CREATE TABLE IF NOT EXISTS atletas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    edad INT,
    genero ENUM('Femenino', 'Masculino') DEFAULT NULL,
    nacionalidad VARCHAR(50) DEFAULT 'Nicaraguense',
    documento_identidad VARCHAR(30) UNIQUE NOT NULL,
    lugar_nacimiento VARCHAR(100),
    estado_civil VARCHAR(30),
    direccion TEXT,
    estudia_actualmente TINYINT(1) DEFAULT 0,
    telefono VARCHAR(50),
    correo_electronico VARCHAR(100),
    disciplina_deportiva VARCHAR(100),
    equipo_club VARCHAR(150),
    categoria VARCHAR(100),
    peso VARCHAR(20),
    seleccion ENUM('Ninguna', 'Preseleccion', 'Seleccion Nacional') DEFAULT 'Ninguna',
    eventos_internacionales TINYINT(1) DEFAULT 0,
    anio_inicio VARCHAR(10),
    nombre_entrenador VARCHAR(100),
    logros TEXT,
    contacto_emergencia_nombre VARCHAR(100),
    contacto_emergencia_parentesco VARCHAR(50),
    contacto_emergencia_telefono VARCHAR(50),
    foto_carnet LONGTEXT,
    foto_cedula_frente LONGTEXT,
    foto_cedula_reverso LONGTEXT,
    foto_pasaporte LONGTEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_documento (documento_identidad),
    INDEX idx_nombres (nombres, apellidos),
    INDEX idx_categoria (categoria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
