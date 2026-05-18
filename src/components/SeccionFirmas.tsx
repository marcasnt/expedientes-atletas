import React from 'react';

export const SeccionFirmas: React.FC = () => {
  return (
    <div className="border-t-2 border-gray-900">
      <div className="p-2">
        <div className="grid grid-cols-2 gap-8 mt-2 mb-2">
          {/* Firma Presidente */}
          <div className="text-center px-4">
            <div className="border-b-2 border-gray-900 h-10 mb-1"></div>
            <p className="text-[9px] font-bold uppercase tracking-wide">Firma del Presidente de la Federacion</p>
          </div>

          {/* Firma Atleta/Tutor */}
          <div className="text-center px-4">
            <div className="border-b-2 border-gray-900 h-10 mb-1"></div>
            <p className="text-[9px] font-bold uppercase tracking-wide">Firma del Atleta o Tutor Legal</p>
          </div>
        </div>

        {/* Logos FENIFISC e IND */}
        <div className="flex justify-center items-center gap-6 mt-2 mb-1">
          <div className="text-center">
            <img
              src="./logo-ind.png"
              alt="IND - Instituto Nicaragüense de Deportes"
              className="h-14 w-auto mx-auto object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <p className="text-[7px] mt-0.5 font-bold tracking-wider text-gray-700">IND</p>
          </div>
          <div className="text-center">
            <img
              src="./logo-fenifisc.png"
              alt="FENIFISC"
              className="h-16 w-auto mx-auto object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <p className="text-[7px] mt-0.5 font-bold tracking-wider text-gray-700">FENIFISC</p>
          </div>
        </div>
      </div>
    </div>
  );
};
