import * as XLSX from 'xlsx';
import type { FormularioData } from '../types/formulario';

export function exportarExcel(data: FormularioData, fileName: string = 'inscripcion-atleta.xlsx') {
  const wsData: (string | number | boolean)[][] = [
    ['FORMULARIO DE INSCRIPCION DEL ATLETA - FENIFISC'],
    [],
    ['DATOS GENERALES DEL ATLETA'],
    ['Campo', 'Valor'],
    ['Nombres', data.nombres],
    ['Apellidos', data.apellidos],
    ['Fecha de Nacimiento', data.fechaNacimiento],
    ['Edad', data.edad],
    ['Genero', data.genero],
    ['Nacionalidad', data.nacionalidad],
    ['Documento de Identidad', data.documentoIdentidad],
    ['Lugar de Nacimiento', data.lugarNacimiento],
    ['Estado Civil', data.estadoCivil],
    ['Direccion', data.direccion],
    ['Estudia Actualmente', data.estudiaActualmente ? 'Si' : 'No'],
    ['Telefono', data.telefono],
    ['Correo Electronico', data.correoElectronico],
    [],
    ['INFORMACION DEPORTIVA'],
    ['Campo', 'Valor'],
    ['Disciplina Deportiva', data.disciplinaDeportiva],
    ['Equipo o Club', data.equipoClub],
    ['Categoria', data.categoria],
    ['Peso', data.peso],
    ['Seleccion', data.seleccion],
    ['Eventos Internacionales', data.eventosInternacionales ? 'Si' : 'No'],
    ['Anio de Inicio', data.anioInicio],
    ['Nombre del Entrenador', data.nombreEntrenador],
    ['Registro / Marcas Destacadas', data.logros],
    [],
    ['INFORMACION DE CONTACTO EN CASO DE EMERGENCIA'],
    ['Campo', 'Valor'],
    ['Nombre del Contacto', data.contactoEmergenciaNombre],
    ['Parentesco', data.contactoEmergenciaParentesco],
    ['Telefono', data.contactoEmergenciaTelefono],
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Ajustar anchos de columna
  ws['!cols'] = [
    { wch: 35 },
    { wch: 60 },
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Inscripcion Atleta');
  XLSX.writeFile(wb, fileName);
}
