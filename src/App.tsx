import { useCallback } from 'react';
import { FormularioInscripcion } from './components/FormularioInscripcion';
import { useFormulario } from './hooks/useFormulario';
import { exportarPDF } from './utils/exportarPDF';
import { exportarExcel } from './utils/exportarExcel';

function App() {
  const { data, updateField, setFoto, resetForm } = useFormulario();

  const handleExportPDF = useCallback(async () => {
    await exportarPDF('formulario-inscripcion', `inscripcion-${data.documentoIdentidad || 'atleta'}.pdf`);
  }, [data.documentoIdentidad]);

  const handleExportExcel = useCallback(() => {
    exportarExcel(data, `inscripcion-${data.documentoIdentidad || 'atleta'}.xlsx`);
  }, [data]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <FormularioInscripcion
      data={data}
      onChange={updateField}
      setFoto={setFoto}
      onExportPDF={handleExportPDF}
      onExportExcel={handleExportExcel}
      onPrint={handlePrint}
      onReset={resetForm}
    />
  );
}

export default App;
