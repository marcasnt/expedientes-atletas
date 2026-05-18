import React from 'react';
import type { FormularioData } from '../types/formulario';
import { CampoFoto } from './CampoFoto';

interface Props {
  data: FormularioData;
  onChange: <K extends keyof FormularioData>(field: K, value: FormularioData[K]) => void;
  onFotoChange: (base64: string | null) => void;
}

export const SeccionDatosGenerales: React.FC<Props> = ({ data, onChange, onFotoChange }) => {
  return (
    <div className="border-t-2 border-gray-800">
      {/* Header */}
      <div className="bg-gray-200 border-b-2 border-gray-800 py-1 text-center">
        <h2 className="text-xs font-bold tracking-wider uppercase">Datos Generales del Atleta</h2>
      </div>

      <div className="p-1">
        {/* Fila 1: Nombres, Apellidos y Foto */}
        <div className="flex gap-2 mb-1">
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-1">
              <div>
                <label className="text-[9px] font-bold">Nombres:</label>
                <input
                  type="text"
                  value={data.nombres}
                  onChange={(e) => onChange('nombres', e.target.value)}
                  className="w-full border-b border-gray-400 bg-transparent text-[10px] px-0.5 focus:outline-none focus:border-blue-600 print:border-gray-400 leading-tight"
                  placeholder="Ingrese nombres"
                />
              </div>
              <div>
                <label className="text-[9px] font-bold">Apellidos:</label>
                <input
                  type="text"
                  value={data.apellidos}
                  onChange={(e) => onChange('apellidos', e.target.value)}
                  className="w-full border-b border-gray-400 bg-transparent text-[10px] px-0.5 focus:outline-none focus:border-blue-600 print:border-gray-400 leading-tight"
                  placeholder="Ingrese apellidos"
                />
              </div>
            </div>
          </div>
          <div className="w-20 flex-shrink-0">
            <CampoFoto
              label="Foto Carnet"
              value={data.fotoCarnet}
              onChange={onFotoChange}
              aspectRatio="aspect-[3/4]"
              placeholderText="Subir foto"
            />
          </div>
        </div>

        {/* Fila 2: Fecha, Edad, Genero */}
        <div className="grid grid-cols-3 gap-1 mb-1 border border-gray-300 p-0.5">
          <div>
            <label className="text-[9px] font-bold block leading-tight">Fecha de nacimiento:</label>
            <input
              type="date"
              value={data.fechaNacimiento}
              onChange={(e) => onChange('fechaNacimiento', e.target.value)}
              className="w-full text-[10px] border-b border-gray-300 bg-transparent px-0.5 focus:outline-none leading-tight"
            />
          </div>
          <div>
            <label className="text-[9px] font-bold block leading-tight">Edad:</label>
            <input
              type="text"
              value={data.edad}
              readOnly
              className="w-full text-[10px] border-b border-gray-300 bg-gray-100 px-0.5 leading-tight"
            />
          </div>
          <div>
            <label className="text-[9px] font-bold block leading-tight">Genero:</label>
            <div className="flex gap-2 text-[9px]">
              <label className="flex items-center gap-0.5 cursor-pointer">
                <input
                  type="radio"
                  name="genero"
                  value="Femenino"
                  checked={data.genero === 'Femenino'}
                  onChange={() => onChange('genero', 'Femenino')}
                  className="print:accent-black"
                />
                Femenino
              </label>
              <label className="flex items-center gap-0.5 cursor-pointer">
                <input
                  type="radio"
                  name="genero"
                  value="Masculino"
                  checked={data.genero === 'Masculino'}
                  onChange={() => onChange('genero', 'Masculino')}
                  className="print:accent-black"
                />
                Masculino
              </label>
            </div>
          </div>
        </div>

        {/* Fila 3: Nacionalidad y Documento */}
        <div className="grid grid-cols-2 gap-1 mb-1 border border-gray-300 p-0.5">
          <div>
            <label className="text-[9px] font-bold block leading-tight">Nacionalidad:</label>
            <input
              type="text"
              value={data.nacionalidad}
              onChange={(e) => onChange('nacionalidad', e.target.value)}
              className="w-full text-[10px] border-b border-gray-300 bg-transparent px-0.5 focus:outline-none leading-tight"
            />
          </div>
          <div>
            <label className="text-[9px] font-bold block leading-tight">Numero de identificacion (cedula/pasaporte):</label>
            <input
              type="text"
              value={data.documentoIdentidad}
              onChange={(e) => onChange('documentoIdentidad', e.target.value)}
              className="w-full text-[10px] border-b border-gray-300 bg-transparent px-0.5 focus:outline-none leading-tight"
            />
          </div>
        </div>

        {/* Fila 4: Lugar Nacimiento y Estado Civil */}
        <div className="grid grid-cols-2 gap-1 mb-1 border border-gray-300 p-0.5">
          <div>
            <label className="text-[9px] font-bold block leading-tight">Lugar de Nacimiento / Municipio:</label>
            <input
              type="text"
              value={data.lugarNacimiento}
              onChange={(e) => onChange('lugarNacimiento', e.target.value)}
              className="w-full text-[10px] border-b border-gray-300 bg-transparent px-0.5 focus:outline-none leading-tight"
            />
          </div>
          <div>
            <label className="text-[9px] font-bold block leading-tight">Estado Civil:</label>
            <input
              type="text"
              value={data.estadoCivil}
              onChange={(e) => onChange('estadoCivil', e.target.value)}
              className="w-full text-[10px] border-b border-gray-300 bg-transparent px-0.5 focus:outline-none leading-tight"
            />
          </div>
        </div>

        {/* Fila 5: Direccion */}
        <div className="mb-1 border border-gray-300 p-0.5">
          <label className="text-[9px] font-bold block leading-tight">Direccion:</label>
          <input
            type="text"
            value={data.direccion}
            onChange={(e) => onChange('direccion', e.target.value)}
            className="w-full text-[10px] border-b border-gray-300 bg-transparent px-0.5 focus:outline-none leading-tight"
          />
        </div>

        {/* Fila 6: Estudia, Telefono, Correo */}
        <div className="grid grid-cols-3 gap-1 mb-0 border border-gray-300 p-0.5">
          <div>
            <label className="text-[9px] font-bold block leading-tight">Estudia Actualmente:</label>
            <div className="flex gap-2 text-[9px]">
              <label className="flex items-center gap-0.5 cursor-pointer">
                <input
                  type="radio"
                  name="estudia"
                  checked={data.estudiaActualmente}
                  onChange={() => onChange('estudiaActualmente', true)}
                />
                Si
              </label>
              <label className="flex items-center gap-0.5 cursor-pointer">
                <input
                  type="radio"
                  name="estudia"
                  checked={!data.estudiaActualmente}
                  onChange={() => onChange('estudiaActualmente', false)}
                />
                No
              </label>
            </div>
          </div>
          <div>
            <label className="text-[9px] font-bold block leading-tight">Telefono del atleta:</label>
            <input
              type="text"
              value={data.telefono}
              onChange={(e) => onChange('telefono', e.target.value)}
              className="w-full text-[10px] border-b border-gray-300 bg-transparent px-0.5 focus:outline-none leading-tight"
            />
          </div>
          <div>
            <label className="text-[9px] font-bold block leading-tight">Correo electronico:</label>
            <input
              type="email"
              value={data.correoElectronico}
              onChange={(e) => onChange('correoElectronico', e.target.value)}
              className="w-full text-[10px] border-b border-gray-300 bg-transparent px-0.5 focus:outline-none leading-tight"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
