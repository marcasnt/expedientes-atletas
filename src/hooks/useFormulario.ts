import { useState, useCallback } from 'react';
import type { FormularioData } from '../types/formulario';

const initialData: FormularioData = {
  nombres: '',
  apellidos: '',
  fechaNacimiento: '',
  edad: '',
  genero: '',
  nacionalidad: 'Nicaraguense',
  documentoIdentidad: '',
  lugarNacimiento: '',
  estadoCivil: '',
  direccion: '',
  estudiaActualmente: false,
  telefono: '',
  correoElectronico: '',
  disciplinaDeportiva: '',
  equipoClub: '',
  categoria: '',
  peso: '',
  seleccion: 'Ninguna',
  eventosInternacionales: false,
  anioInicio: '',
  nombreEntrenador: '',
  logros: '',
  contactoEmergenciaNombre: '',
  contactoEmergenciaParentesco: '',
  contactoEmergenciaTelefono: '',
  fotoCarnet: null,
  fotoCedulaFrente: null,
  fotoCedulaReverso: null,
  fotoPasaporte: null,
};

export function useFormulario() {
  const [data, setData] = useState<FormularioData>(initialData);

  const updateField = useCallback(<K extends keyof FormularioData>(
    field: K,
    value: FormularioData[K]
  ) => {
    setData(prev => {
      const next = { ...prev, [field]: value };
      // Auto-calcular edad
      if (field === 'fechaNacimiento' && typeof value === 'string' && value) {
        const birth = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
          age--;
        }
        next.edad = age;
      }
      return next;
    });
  }, []);

  const setFoto = useCallback((field: 'fotoCarnet' | 'fotoCedulaFrente' | 'fotoCedulaReverso' | 'fotoPasaporte', base64: string | null) => {
    setData(prev => ({ ...prev, [field]: base64 }));
  }, []);

  const resetForm = useCallback(() => {
    setData(initialData);
    localStorage.removeItem('fenifisc_formulario_atleta');
  }, []);

  const guardarFormulario = useCallback(() => {
    localStorage.setItem('fenifisc_formulario_atleta', JSON.stringify(data));
    // Tambien descargar como archivo JSON
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inscripcion-${data.documentoIdentidad || 'atleta'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('Formulario guardado en el navegador y descargado como JSON.');
  }, [data]);

  const cargarFormulario = useCallback((jsonData: Partial<FormularioData>) => {
    setData(prev => ({ ...prev, ...jsonData }));
  }, []);

  const cargarDesdeArchivo = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        setData({ ...initialData, ...parsed });
        alert('Formulario cargado correctamente.');
      } catch {
        alert('Error al cargar el archivo. Asegurate de que sea un JSON valido.');
      }
    };
    reader.readAsText(file);
  }, []);

  return { data, updateField, setFoto, resetForm, guardarFormulario, cargarFormulario, cargarDesdeArchivo };
}
