import { useCallback, useRef, useState } from 'react';
import { FormularioInscripcion } from './components/FormularioInscripcion';
import { useFormulario } from './hooks/useFormulario';
import { exportarPDF } from './utils/exportarPDF';
import { exportarExcel } from './utils/exportarExcel';
import { guardarEnBaseDeDatos, buscarAtletaPorDocumento } from './utils/api';


function App() {
  const { data, updateField, setFoto, resetForm, guardarFormulario, cargarDesdeArchivo, cargarFormulario } = useFormulario();
  const [mensajeBD, setMensajeBD] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportPDF = useCallback(async () => {
    await exportarPDF('formulario-inscripcion', `inscripcion-${data.documentoIdentidad || 'atleta'}.pdf`);
  }, [data.documentoIdentidad]);

  const handleExportExcel = useCallback(() => {
    exportarExcel(data, `inscripcion-${data.documentoIdentidad || 'atleta'}.xlsx`);
  }, [data]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleLoadFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      cargarDesdeArchivo(file);
    }
    e.target.value = '';
  }, [cargarDesdeArchivo]);

  // Guardar en Base de Datos
  const handleGuardarBD = useCallback(async () => {
    if (!data.nombres || !data.apellidos || !data.documentoIdentidad) {
      setMensajeBD('Error: Nombres, Apellidos y Documento son obligatorios para guardar en BD.');
      return;
    }
    setMensajeBD('Guardando en base de datos...');
    try {
      const res = await guardarEnBaseDeDatos(data);
      if (res.exito) {
        setMensajeBD(`${res.mensaje} (ID: ${res.id})`);
      } else {
        setMensajeBD('Error: ' + (res.error || 'No se pudo guardar'));
      }
    } catch (e) {
      setMensajeBD('Error de conexion. Verifica que los archivos PHP esten en la carpeta api/');
    }
  }, [data]);

  // Buscar y cargar desde BD
  const handleBuscarBD = useCallback(async (documento: string) => {
    setMensajeBD('Buscando en base de datos...');
    try {
      const res = await buscarAtletaPorDocumento(documento);
      if (res.exito && res.atleta) {
        cargarFormulario(res.atleta);
        setMensajeBD(`Atleta cargado: ${res.atleta.nombres} ${res.atleta.apellidos}`);
      } else {
        setMensajeBD('Error: ' + (res.error || 'Atleta no encontrado'));
      }
    } catch (e) {
      setMensajeBD('Error de conexion al buscar en la base de datos.');
    }
  }, [cargarFormulario]);

  return (
    <>
      <FormularioInscripcion
        data={data}
        onChange={updateField}
        setFoto={setFoto}
        onExportPDF={handleExportPDF}
        onExportExcel={handleExportExcel}
        onPrint={handlePrint}
        onReset={resetForm}
        onGuardar={guardarFormulario}
        onCargar={handleLoadFile}
        onGuardarBD={handleGuardarBD}
        onBuscarBD={handleBuscarBD}
        mensajeBD={mensajeBD}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
}

export default App;
