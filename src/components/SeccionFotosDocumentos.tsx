import React from 'react';
import { CampoFoto } from './CampoFoto';

interface Props {
  fotoCedulaFrente: string | null;
  fotoCedulaReverso: string | null;
  fotoPasaporte: string | null;
  onFotoCedulaFrente: (base64: string | null) => void;
  onFotoCedulaReverso: (base64: string | null) => void;
  onFotoPasaporte: (base64: string | null) => void;
}

export const SeccionFotosDocumentos: React.FC<Props> = ({
  fotoCedulaFrente,
  fotoCedulaReverso,
  fotoPasaporte,
  onFotoCedulaFrente,
  onFotoCedulaReverso,
  onFotoPasaporte,
}) => {
  return (
    <div className="border-t-2 border-gray-800">
      {/* Header */}
      <div className="bg-gray-200 border-b-2 border-gray-800 py-1 text-center">
        <h2 className="text-xs font-bold tracking-wider uppercase">Documentos de Identidad (Fotos)</h2>
      </div>

      <div className="p-3">
        <div className="grid grid-cols-3 gap-4">
          <CampoFoto
            label="Cedula - Frente"
            value={fotoCedulaFrente}
            onChange={onFotoCedulaFrente}
            aspectRatio="aspect-[4/3]"
            placeholderText="Subir frente de cedula"
          />
          <CampoFoto
            label="Cedula - Reverso"
            value={fotoCedulaReverso}
            onChange={onFotoCedulaReverso}
            aspectRatio="aspect-[4/3]"
            placeholderText="Subir reverso de cedula"
          />
          <CampoFoto
            label="Pasaporte"
            value={fotoPasaporte}
            onChange={onFotoPasaporte}
            aspectRatio="aspect-[4/3]"
            placeholderText="Subir pasaporte"
          />
        </div>
      </div>
    </div>
  );
};
