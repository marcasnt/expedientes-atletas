import React from 'react';
import type { FormularioData } from '../types/formulario';

interface Props {
  data: FormularioData;
  onChange: <K extends keyof FormularioData>(field: K, value: FormularioData[K]) => void;
}

export const SeccionInformacionDeportiva: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="border-t-2 border-gray-800">
      {/* Header */}
      <div className="bg-gray-200 border-b-2 border-gray-800 py-1 text-center">
        <h2 className="text-xs font-bold tracking-wider uppercase">Informacion Deportiva</h2>
      </div>

      <div className="p-1">
        {/* Fila 1: Disciplina y Equipo */}
        <div className="grid grid-cols-2 gap-1 mb-1 border border-gray-300 p-0.5">
          <div>
            <label className="text-[9px] font-bold block leading-tight">Disciplina Deportiva:</label>
            <input
              type="text"
              value={data.disciplinaDeportiva}
              onChange={(e) => onChange('disciplinaDeportiva', e.target.value)}
              className="w-full text-[10px] border-b border-gray-300 bg-transparent px-0.5 focus:outline-none leading-tight"
            />
          </div>
          <div>
            <label className="text-[9px] font-bold block leading-tight">Equipo o club al que pertenece:</label>
            <input
              type="text"
              value={data.equipoClub}
              onChange={(e) => onChange('equipoClub', e.target.value)}
              className="w-full text-[10px] border-b border-gray-300 bg-transparent px-0.5 focus:outline-none leading-tight"
            />
          </div>
        </div>

        {/* Fila 2: Categoria y Peso */}
        <div className="grid grid-cols-2 gap-1 mb-1 border border-gray-300 p-0.5">
          <div>
            <label className="text-[9px] font-bold block leading-tight">Categoria:</label>
            <input
              type="text"
              value={data.categoria}
              onChange={(e) => onChange('categoria', e.target.value)}
              className="w-full text-[10px] border-b border-gray-300 bg-transparent px-0.5 focus:outline-none leading-tight"
            />
          </div>
          <div>
            <label className="text-[9px] font-bold block leading-tight">Peso:</label>
            <input
              type="text"
              value={data.peso}
              onChange={(e) => onChange('peso', e.target.value)}
              className="w-full text-[10px] border-b border-gray-300 bg-transparent px-0.5 focus:outline-none leading-tight"
            />
          </div>
        </div>

        {/* Fila 3: Seleccion y Eventos Internacionales */}
        <div className="grid grid-cols-2 gap-1 mb-1 border border-gray-300 p-0.5">
          <div>
            <label className="text-[9px] font-bold block leading-tight">Seleccion:</label>
            <div className="flex gap-2 text-[9px]">
              <label className="flex items-center gap-0.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.seleccion === 'Preseleccion'}
                  onChange={(e) => onChange('seleccion', e.target.checked ? 'Preseleccion' : 'Ninguna')}
                />
                Preseleccion
              </label>
              <label className="flex items-center gap-0.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.seleccion === 'Seleccion Nacional'}
                  onChange={(e) => onChange('seleccion', e.target.checked ? 'Seleccion Nacional' : 'Ninguna')}
                />
                Seleccion Nacional
              </label>
            </div>
          </div>
          <div>
            <label className="text-[9px] font-bold block leading-tight">Ha participado en Eventos Internacionales:</label>
            <div className="flex gap-2 text-[9px]">
              <label className="flex items-center gap-0.5 cursor-pointer">
                <input
                  type="radio"
                  name="eventos"
                  checked={data.eventosInternacionales}
                  onChange={() => onChange('eventosInternacionales', true)}
                />
                Si
              </label>
              <label className="flex items-center gap-0.5 cursor-pointer">
                <input
                  type="radio"
                  name="eventos"
                  checked={!data.eventosInternacionales}
                  onChange={() => onChange('eventosInternacionales', false)}
                />
                No
              </label>
            </div>
          </div>
        </div>

        {/* Fila 4: Anio inicio y Entrenador */}
        <div className="grid grid-cols-2 gap-1 mb-1 border border-gray-300 p-0.5">
          <div>
            <label className="text-[9px] font-bold block leading-tight">Anos de inicio:</label>
            <input
              type="text"
              value={data.anioInicio}
              onChange={(e) => onChange('anioInicio', e.target.value)}
              className="w-full text-[10px] border-b border-gray-300 bg-transparent px-0.5 focus:outline-none leading-tight"
            />
          </div>
          <div>
            <label className="text-[9px] font-bold block leading-tight">Nombre del Entrenador:</label>
            <input
              type="text"
              value={data.nombreEntrenador}
              onChange={(e) => onChange('nombreEntrenador', e.target.value)}
              className="w-full text-[10px] border-b border-gray-300 bg-transparent px-0.5 focus:outline-none leading-tight"
            />
          </div>
        </div>

        {/* Fila 5: Logros */}
        <div className="mb-0 border border-gray-300 p-0.5">
          <label className="text-[9px] font-bold block leading-tight">Registro / Marcas destacadas:</label>
          <textarea
            value={data.logros}
            onChange={(e) => onChange('logros', e.target.value)}
            rows={2}
            className="w-full text-[10px] border border-gray-300 bg-transparent px-0.5 py-0.5 focus:outline-none resize-none leading-tight"
          />
        </div>
      </div>
    </div>
  );
};
