import { useCallback, useRef } from 'react';
import { FormularioInscripcion } from './components/FormularioInscripcion';
import { useFormulario } from './hooks/useFormulario';
import { exportarPDF } from './utils/exportarPDF';
import { exportarExcel } from './utils/exportarExcel';

function App() {
  const { data, updateField, setFoto, resetForm, guardarFormulario, cargarDesdeArchivo } = useFormulario();
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
