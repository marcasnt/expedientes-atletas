import React from 'react';
import type { FormularioData } from '../types/formulario';

interface Props {
  data: FormularioData;
  onChange: <K extends keyof FormularioData>(field: K, value: FormularioData[K]) => void;
}

export const SeccionContactoEmergencia: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="border-t-2 border-gray-800">
      {/* Header */}
      <div className="bg-gray-200 border-b-2 border-gray-800 py-1 text-center">
        <h2 className="text-xs font-bold tracking-wider uppercase">Informacion de Contacto en Caso de Emergencia</h2>
      </div>

      <div className="p-3">
        <div className="grid grid-cols-3 gap-2 mb-2 border border-gray-300 p-1">
          <div>
            <label className="text-[10px] font-bold block">Nombre del contacto:</label>
            <input
              type="text"
              value={data.contactoEmergenciaNombre}
              onChange={(e) => onChange('contactoEmergenciaNombre', e.target.value)}
              className="w-full text-xs border-b border-gray-300 bg-transparent px-1 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold block">Parentesco:</label>
            <input
              type="text"
              value={data.contactoEmergenciaParentesco}
              onChange={(e) => onChange('contactoEmergenciaParentesco', e.target.value)}
              className="w-full text-xs border-b border-gray-300 bg-transparent px-1 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold block">Telefono:</label>
            <input
              type="text"
              value={data.contactoEmergenciaTelefono}
              onChange={(e) => onChange('contactoEmergenciaTelefono', e.target.value)}
              className="w-full text-xs border-b border-gray-300 bg-transparent px-1 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
