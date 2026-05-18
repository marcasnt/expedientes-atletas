export interface FormularioData {
  // Datos Generales
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  edad: number | string;
  genero: 'Femenino' | 'Masculino' | '';
  nacionalidad: string;
  documentoIdentidad: string;
  lugarNacimiento: string;
  estadoCivil: string;
  direccion: string;
  estudiaActualmente: boolean;
  telefono: string;
  correoElectronico: string;

  // Informacion Deportiva
  disciplinaDeportiva: string;
  equipoClub: string;
  categoria: string;
  peso: string;
  seleccion: 'Ninguna' | 'Preseleccion' | 'Seleccion Nacional';
  eventosInternacionales: boolean;
  anioInicio: string;
  nombreEntrenador: string;
  logros: string;

  // Contacto Emergencia
  contactoEmergenciaNombre: string;
  contactoEmergenciaParentesco: string;
  contactoEmergenciaTelefono: string;

  // Fotos y Documentos
  fotoCarnet: string | null;
  fotoCedulaFrente: string | null;
  fotoCedulaReverso: string | null;
  fotoPasaporte: string | null;
}
