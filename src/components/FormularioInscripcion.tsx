import React from 'react';
import type { FormularioData } from '../types/formulario';
import { SeccionDatosGenerales } from './SeccionDatosGenerales';
import { SeccionInformacionDeportiva } from './SeccionInformacionDeportiva';
import { SeccionContactoEmergencia } from './SeccionContactoEmergencia';
import { SeccionFotosDocumentos } from './SeccionFotosDocumentos';
import { SeccionFirmas } from './SeccionFirmas';

interface Props {
  data: FormularioData;
  onChange: <K extends keyof FormularioData>(field: K, value: FormularioData[K]) => void;
  setFoto: (field: 'fotoCarnet' | 'fotoCedulaFrente' | 'fotoCedulaReverso' | 'fotoPasaporte', base64: string | null) => void;
  onExportPDF: () => void;
  onExportExcel: () => void;
  onPrint: () => void;
  onReset: () => void;
  onGuardar: () => void;
  onCargar: () => void;
}

export const FormularioInscripcion: React.FC<Props> = ({
  data,
  onChange,
  setFoto,
  onExportPDF,
  onExportExcel,
  onPrint,
  onReset,
  onGuardar,
  onCargar,
}) => {
  return (
    <div className="min-h-screen bg-gray-300 py-2 px-1 print:bg-white print:p-0 print:min-h-0">
      {/* Botones de accion - Solo visibles en pantalla */}
      <div className="max-w-[794px] mx-auto mb-2 flex flex-wrap gap-1.5 print:hidden">
        <button
          onClick={onPrint}
          className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5 rounded text-xs font-semibold shadow transition"
        >
          Imprimir / PDF
        </button>
        <button
          onClick={onExportPDF}
          className="bg-red-700 hover:bg-red-800 text-white px-3 py-1.5 rounded text-xs font-semibold shadow transition"
        >
          Exportar PDF
        </button>
        <button
          onClick={onExportExcel}
          className="bg-green-700 hover:bg-green-800 text-white px-3 py-1.5 rounded text-xs font-semibold shadow transition"
        >
          Exportar Excel
        </button>
        <button
          onClick={onGuardar}
          className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded text-xs font-semibold shadow transition"
        >
          Guardar Formulario
        </button>
        <button
          onClick={onCargar}
          className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 rounded text-xs font-semibold shadow transition"
        >
          Cargar Formulario
        </button>
        <button
          onClick={onReset}
          className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-xs font-semibold shadow transition"
        >
          Limpiar
        </button>
      </div>

      {/* Formulario visual estilo documento carta exacto */}
      <div
        id="formulario-inscripcion"
        className="max-w-[794px] mx-auto bg-white shadow-2xl print:shadow-none print:max-w-none print:w-full overflow-hidden"
        style={{
          width: '794px',
          minHeight: '1123px',
          boxSizing: 'border-box',
        }}
      >
        {/* Encabezado principal */}
        <div className="border-2 border-gray-900 border-b-0">
          <div className="border-b border-gray-900 py-1 text-center bg-white">
            <h1 className="text-sm font-bold tracking-wider uppercase">
              Formulario de Inscripcion del Atleta
            </h1>
          </div>
        </div>

        {/* Secciones */}
        <div className="border-x-2 border-gray-900">
          <SeccionDatosGenerales
            data={data}
            onChange={onChange}
            onFotoChange={(base64) => setFoto('fotoCarnet', base64)}
          />

          <SeccionInformacionDeportiva
            data={data}
            onChange={onChange}
          />

          <SeccionContactoEmergencia
            data={data}
            onChange={onChange}
          />

          <SeccionFotosDocumentos
            fotoCedulaFrente={data.fotoCedulaFrente}
            fotoCedulaReverso={data.fotoCedulaReverso}
            fotoPasaporte={data.fotoPasaporte}
            onFotoCedulaFrente={(base64) => setFoto('fotoCedulaFrente', base64)}
            onFotoCedulaReverso={(base64) => setFoto('fotoCedulaReverso', base64)}
            onFotoPasaporte={(base64) => setFoto('fotoPasaporte', base64)}
          />

          <SeccionFirmas />
        </div>

        {/* Borde inferior */}
        <div className="border-2 border-gray-900 border-t-0 h-1"></div>
      </div>

      {/* Footer informativo */}
      <div className="max-w-[794px] mx-auto mt-2 text-center text-[9px] text-gray-600 print:hidden pb-4">
        <p>FENIFISC - Federacion Nicaragüense de Fisicoculturismo | Formulario digital de inscripcion</p>
      </div>
    </div>
  );
};
