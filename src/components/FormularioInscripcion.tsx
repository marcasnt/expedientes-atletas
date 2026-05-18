import React, { useState, useEffect } from 'react';
import type { FormularioData } from '../types/formulario';
import { SeccionDatosGenerales } from './SeccionDatosGenerales';
import { SeccionInformacionDeportiva } from './SeccionInformacionDeportiva';
import { SeccionContactoEmergencia } from './SeccionContactoEmergencia';
import { SeccionFotosDocumentos } from './SeccionFotosDocumentos';
import { SeccionFirmas } from './SeccionFirmas';
import { obtenerListaAtletas, eliminarAtleta, type ApiResponse } from '../utils/api';

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
  onGuardarBD: () => void;
  onBuscarBD: (documento: string) => void;
  mensajeBD: string;
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
  onGuardarBD,
  onBuscarBD,
  mensajeBD,
}) => {
  const [mostrarLista, setMostrarLista] = useState(false);
  const [listaAtletas, setListaAtletas] = useState<ApiResponse['atletas']>([]);
  const [busquedaDoc, setBusquedaDoc] = useState('');
  const [cargando, setCargando] = useState(false);

  const cargarLista = async () => {
    setCargando(true);
    try {
      const res = await obtenerListaAtletas();
      if (res.exito && res.atletas) {
        setListaAtletas(res.atletas);
      }
    } catch (e) {
      console.error(e);
    }
    setCargando(false);
  };

  useEffect(() => {
    if (mostrarLista) {
      cargarLista();
    }
  }, [mostrarLista]);

  const handleEliminar = async (documento: string) => {
    if (!confirm('Estas seguro de eliminar este atleta de la base de datos?')) return;
    try {
      const res = await eliminarAtleta(documento);
      if (res.exito) {
        alert('Atleta eliminado de la base de datos.');
        cargarLista();
      } else {
        alert('Error: ' + res.error);
      }
    } catch (e) {
      alert('Error de conexion.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 py-2 px-1 print:bg-white print:p-0 print:min-h-0">
      {/* Botones de accion - Solo visibles en pantalla */}
      <div className="max-w-[794px] mx-auto mb-2 flex flex-wrap gap-1.5 print:hidden">
        <button onClick={onPrint} className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5 rounded text-xs font-semibold shadow transition">
          Imprimir / PDF
        </button>
        <button onClick={onExportPDF} className="bg-red-700 hover:bg-red-800 text-white px-3 py-1.5 rounded text-xs font-semibold shadow transition">
          Exportar PDF
        </button>
        <button onClick={onExportExcel} className="bg-green-700 hover:bg-green-800 text-white px-3 py-1.5 rounded text-xs font-semibold shadow transition">
          Exportar Excel
        </button>
        <button onClick={onGuardar} className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded text-xs font-semibold shadow transition">
          Guardar Local
        </button>
        <button onClick={onCargar} className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 rounded text-xs font-semibold shadow transition">
          Cargar Local
        </button>
        <button onClick={onGuardarBD} className="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1.5 rounded text-xs font-semibold shadow transition">
          Guardar en BD
        </button>
        <button onClick={() => setMostrarLista(!mostrarLista)} className="bg-indigo-700 hover:bg-indigo-800 text-white px-3 py-1.5 rounded text-xs font-semibold shadow transition">
          {mostrarLista ? 'Ocultar Lista BD' : 'Ver Lista BD'}
        </button>
        <button onClick={onReset} className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-xs font-semibold shadow transition">
          Limpiar
        </button>
      </div>

      {/* Mensaje de la base de datos */}
      {mensajeBD && (
        <div className="max-w-[794px] mx-auto mb-2 print:hidden">
          <div className={`px-3 py-1.5 rounded text-xs font-semibold text-center ${mensajeBD.includes('Error') ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-green-100 text-green-800 border border-green-300'}`}>
            {mensajeBD}
          </div>
        </div>
      )}

      {/* Panel de lista de atletas en BD */}
      {mostrarLista && (
        <div className="max-w-[794px] mx-auto mb-3 bg-white rounded shadow-lg border border-gray-300 p-3 print:hidden">
          <h3 className="text-sm font-bold mb-2 text-gray-800">Atletas guardados en Base de Datos</h3>
          
          {/* Buscar por documento */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={busquedaDoc}
              onChange={(e) => setBusquedaDoc(e.target.value)}
              placeholder="Buscar por cedula..."
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs"
            />
            <button
              onClick={() => { if (busquedaDoc.trim()) onBuscarBD(busquedaDoc.trim()); }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-semibold"
            >
              Buscar y Cargar
            </button>
            <button
              onClick={cargarLista}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs font-semibold"
            >
              Refrescar
            </button>
          </div>

          {cargando ? (
            <p className="text-xs text-gray-500 text-center py-4">Cargando...</p>
          ) : listaAtletas && listaAtletas.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="text-left px-2 py-1">ID</th>
                    <th className="text-left px-2 py-1">Nombre</th>
                    <th className="text-left px-2 py-1">Documento</th>
                    <th className="text-left px-2 py-1">Categoria</th>
                    <th className="text-left px-2 py-1">Seleccion</th>
                    <th className="text-center px-2 py-1">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {listaAtletas.map((a) => (
                    <tr key={a.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-2 py-1">{a.id}</td>
                      <td className="px-2 py-1">{a.nombres} {a.apellidos}</td>
                      <td className="px-2 py-1 font-mono">{a.documentoIdentidad}</td>
                      <td className="px-2 py-1">{a.categoria}</td>
                      <td className="px-2 py-1">{a.seleccion}</td>
                      <td className="px-2 py-1 text-center">
                        <button
                          onClick={() => onBuscarBD(a.documentoIdentidad)}
                          className="text-blue-600 hover:text-blue-800 underline text-[9px] mr-2"
                        >
                          Cargar
                        </button>
                        <button
                          onClick={() => handleEliminar(a.documentoIdentidad)}
                          className="text-red-600 hover:text-red-800 underline text-[9px]"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-gray-500 text-center py-4">No hay atletas guardados en la base de datos.</p>
          )}
        </div>
      )}

      {/* Formulario visual estilo documento carta exacto */}
      <div
        id="formulario-inscripcion"
        className="max-w-[794px] mx-auto bg-white shadow-2xl print:shadow-none print:max-w-none print:w-full overflow-hidden"
        style={{ width: '794px', minHeight: '1123px', boxSizing: 'border-box' }}
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
          <SeccionDatosGenerales data={data} onChange={onChange} onFotoChange={(base64) => setFoto('fotoCarnet', base64)} />
          <SeccionInformacionDeportiva data={data} onChange={onChange} />
          <SeccionContactoEmergencia data={data} onChange={onChange} />
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
