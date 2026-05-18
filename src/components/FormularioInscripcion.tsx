import React, { useRef } from 'react';
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
}

export const FormularioInscripcion: React.FC<Props> = ({
  data,
  onChange,
  setFoto,
  onExportPDF,
  onExportExcel,
  onPrint,
  onReset,
}) => {
  const formRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gray-300 py-4 px-2 print:bg-white print:p-0">
      {/* Botones de accion - Solo visibles en pantalla */}
      <div className="max-w-[816px] mx-auto mb-4 flex flex-wrap gap-2 print:hidden">
        <button
          onClick={onPrint}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded text-sm font-semibold shadow transition"
        >
          Imprimir / PDF Nativo
        </button>
        <button
          onClick={onExportPDF}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded text-sm font-semibold shadow transition"
        >
          Exportar PDF (Alta Calidad)
        </button>
        <button
          onClick={onExportExcel}
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded text-sm font-semibold shadow transition"
        >
          Exportar Excel
        </button>
        <button
          onClick={onReset}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm font-semibold shadow transition"
        >
          Limpiar Formulario
        </button>
      </div>

      {/* Formulario visual estilo documento carta */}
      <div
        ref={formRef}
        id="formulario-inscripcion"
        className="max-w-[816px] mx-auto bg-white shadow-2xl print:shadow-none print:max-w-none print:w-full"
        style={{ minHeight: '1056px' }} // Tamaño carta en px a 96dpi
      >
        {/* Encabezado principal */}
        <div className="border-2 border-gray-800 border-b-0">
          <div className="border-b border-gray-800 py-3 text-center bg-white">
            <h1 className="text-lg font-bold tracking-wider uppercase">
              Formulario de Inscripcion del Atleta
            </h1>
          </div>
        </div>

        {/* Secciones */}
        <div className="border-x-2 border-gray-800">
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
        <div className="border-2 border-gray-800 border-t-0 h-2"></div>
      </div>

      {/* Footer informativo */}
      <div className="max-w-[816px] mx-auto mt-4 text-center text-[10px] text-gray-600 print:hidden">
        <p>FENIFISC - Federacion Nicaragüense de Fisicoculturismo | Formulario digital de inscripcion</p>
      </div>
    </div>
  );
};
