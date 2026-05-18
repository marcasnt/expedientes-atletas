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

      <div className="p-3">
        {/* Fila 1: Disciplina y Equipo */}
        <div className="grid grid-cols-2 gap-2 mb-2 border border-gray-300 p-1">
          <div>
            <label className="text-[10px] font-bold block">Disciplina Deportiva:</label>
            <input
              type="text"
              value={data.disciplinaDeportiva}
              onChange={(e) => onChange('disciplinaDeportiva', e.target.value)}
              className="w-full text-xs border-b border-gray-300 bg-transparent px-1 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold block">Equipo o club al que pertenece:</label>
            <input
              type="text"
              value={data.equipoClub}
              onChange={(e) => onChange('equipoClub', e.target.value)}
              className="w-full text-xs border-b border-gray-300 bg-transparent px-1 focus:outline-none"
            />
          </div>
        </div>

        {/* Fila 2: Categoria y Peso */}
        <div className="grid grid-cols-2 gap-2 mb-2 border border-gray-300 p-1">
          <div>
            <label className="text-[10px] font-bold block">Categoria:</label>
            <input
              type="text"
              value={data.categoria}
              onChange={(e) => onChange('categoria', e.target.value)}
              className="w-full text-xs border-b border-gray-300 bg-transparent px-1 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold block">Peso:</label>
            <input
              type="text"
              value={data.peso}
              onChange={(e) => onChange('peso', e.target.value)}
              className="w-full text-xs border-b border-gray-300 bg-transparent px-1 focus:outline-none"
            />
          </div>
        </div>

        {/* Fila 3: Seleccion y Eventos Internacionales */}
        <div className="grid grid-cols-2 gap-2 mb-2 border border-gray-300 p-1">
          <div>
            <label className="text-[10px] font-bold block">Seleccion:</label>
            <div className="flex gap-3 text-[10px]">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.seleccion === 'Preseleccion'}
                  onChange={(e) => onChange('seleccion', e.target.checked ? 'Preseleccion' : 'Ninguna')}
                />
                Preseleccion
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
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
            <label className="text-[10px] font-bold block">Ha participado en Eventos Internacionales:</label>
            <div className="flex gap-3 text-[10px]">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="eventos"
                  checked={data.eventosInternacionales}
                  onChange={() => onChange('eventosInternacionales', true)}
                />
                Si
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
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
        <div className="grid grid-cols-2 gap-2 mb-2 border border-gray-300 p-1">
          <div>
            <label className="text-[10px] font-bold block">Anos de inicio:</label>
            <input
              type="text"
              value={data.anioInicio}
              onChange={(e) => onChange('anioInicio', e.target.value)}
              className="w-full text-xs border-b border-gray-300 bg-transparent px-1 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold block">Nombre del Entrenador:</label>
            <input
              type="text"
              value={data.nombreEntrenador}
              onChange={(e) => onChange('nombreEntrenador', e.target.value)}
              className="w-full text-xs border-b border-gray-300 bg-transparent px-1 focus:outline-none"
            />
          </div>
        </div>

        {/* Fila 5: Logros */}
        <div className="mb-2 border border-gray-300 p-1">
          <label className="text-[10px] font-bold block">Registro / Marcas destacadas:</label>
          <textarea
            value={data.logros}
            onChange={(e) => onChange('logros', e.target.value)}
            rows={2}
            className="w-full text-xs border border-gray-300 bg-transparent px-1 py-0.5 focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
};
