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

      <div className="p-3">
        {/* Fila 1: Nombres, Apellidos y Foto */}
        <div className="flex gap-3 mb-2">
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold">Nombres:</label>
                <input
                  type="text"
                  value={data.nombres}
                  onChange={(e) => onChange('nombres', e.target.value)}
                  className="w-full border-b border-gray-400 bg-transparent text-xs px-1 focus:outline-none focus:border-blue-600 print:border-gray-400"
                  placeholder="Ingrese nombres"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold">Apellidos:</label>
                <input
                  type="text"
                  value={data.apellidos}
                  onChange={(e) => onChange('apellidos', e.target.value)}
                  className="w-full border-b border-gray-400 bg-transparent text-xs px-1 focus:outline-none focus:border-blue-600 print:border-gray-400"
                  placeholder="Ingrese apellidos"
                />
              </div>
            </div>
          </div>
          <div className="w-28 flex-shrink-0">
            <CampoFoto
              label="Foto Carnet"
              value={data.fotoCarnet}
              onChange={onFotoChange}
              aspectRatio="aspect-[3/4]"
              placeholderText="Subir foto carnet"
            />
          </div>
        </div>

        {/* Fila 2: Fecha, Edad, Genero */}
        <div className="grid grid-cols-3 gap-2 mb-2 border border-gray-300 p-1">
          <div>
            <label className="text-[10px] font-bold block">Fecha de nacimiento:</label>
            <input
              type="date"
              value={data.fechaNacimiento}
              onChange={(e) => onChange('fechaNacimiento', e.target.value)}
              className="w-full text-xs border-b border-gray-300 bg-transparent px-1 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold block">Edad:</label>
            <input
              type="text"
              value={data.edad}
              readOnly
              className="w-full text-xs border-b border-gray-300 bg-gray-100 px-1"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold block">Genero:</label>
            <div className="flex gap-3 text-[10px]">
              <label className="flex items-center gap-1 cursor-pointer">
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
              <label className="flex items-center gap-1 cursor-pointer">
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
        <div className="grid grid-cols-2 gap-2 mb-2 border border-gray-300 p-1">
          <div>
            <label className="text-[10px] font-bold block">Nacionalidad:</label>
            <input
              type="text"
              value={data.nacionalidad}
              onChange={(e) => onChange('nacionalidad', e.target.value)}
              className="w-full text-xs border-b border-gray-300 bg-transparent px-1 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold block">Numero de identificacion (cedula/pasaporte):</label>
            <input
              type="text"
              value={data.documentoIdentidad}
              onChange={(e) => onChange('documentoIdentidad', e.target.value)}
              className="w-full text-xs border-b border-gray-300 bg-transparent px-1 focus:outline-none"
            />
          </div>
        </div>

        {/* Fila 4: Lugar Nacimiento y Estado Civil */}
        <div className="grid grid-cols-2 gap-2 mb-2 border border-gray-300 p-1">
          <div>
            <label className="text-[10px] font-bold block">Lugar de Nacimiento / Municipio:</label>
            <input
              type="text"
              value={data.lugarNacimiento}
              onChange={(e) => onChange('lugarNacimiento', e.target.value)}
              className="w-full text-xs border-b border-gray-300 bg-transparent px-1 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold block">Estado Civil:</label>
            <input
              type="text"
              value={data.estadoCivil}
              onChange={(e) => onChange('estadoCivil', e.target.value)}
              className="w-full text-xs border-b border-gray-300 bg-transparent px-1 focus:outline-none"
            />
          </div>
        </div>

        {/* Fila 5: Direccion */}
        <div className="mb-2 border border-gray-300 p-1">
          <label className="text-[10px] font-bold block">Direccion:</label>
          <input
            type="text"
            value={data.direccion}
            onChange={(e) => onChange('direccion', e.target.value)}
            className="w-full text-xs border-b border-gray-300 bg-transparent px-1 focus:outline-none"
          />
        </div>

        {/* Fila 6: Estudia, Telefono, Correo */}
        <div className="grid grid-cols-3 gap-2 mb-2 border border-gray-300 p-1">
          <div>
            <label className="text-[10px] font-bold block">Estudia Actualmente:</label>
            <div className="flex gap-3 text-[10px]">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="estudia"
                  checked={data.estudiaActualmente}
                  onChange={() => onChange('estudiaActualmente', true)}
                />
                Si
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
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
            <label className="text-[10px] font-bold block">Telefono del atleta:</label>
            <input
              type="text"
              value={data.telefono}
              onChange={(e) => onChange('telefono', e.target.value)}
              className="w-full text-xs border-b border-gray-300 bg-transparent px-1 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold block">Correo electronico:</label>
            <input
              type="email"
              value={data.correoElectronico}
              onChange={(e) => onChange('correoElectronico', e.target.value)}
              className="w-full text-xs border-b border-gray-300 bg-transparent px-1 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
