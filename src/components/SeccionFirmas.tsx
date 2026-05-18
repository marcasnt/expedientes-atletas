import React from 'react';

export const SeccionFirmas: React.FC = () => {
  return (
    <div className="border-t-2 border-gray-800">
      <div className="p-4">
        <div className="grid grid-cols-2 gap-12 mt-6 mb-6">
          {/* Firma Presidente */}
          <div className="text-center px-4">
            <div className="border-b-2 border-gray-800 h-14 mb-2"></div>
            <p className="text-[10px] font-bold uppercase tracking-wide">Firma del Presidente de la Federacion</p>
          </div>

          {/* Firma Atleta/Tutor */}
          <div className="text-center px-4">
            <div className="border-b-2 border-gray-800 h-14 mb-2"></div>
            <p className="text-[10px] font-bold uppercase tracking-wide">Firma del Atleta o Tutor Legal</p>
          </div>
        </div>

        {/* Logo FENIFISC */}
        <div className="flex justify-center mt-6 mb-4">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto border-2 border-gray-800 rounded-full flex items-center justify-center bg-gray-50">
              <svg viewBox="0 0 100 100" className="w-16 h-16 text-gray-700" fill="currentColor">
                <circle cx="50" cy="30" r="12" />
                <path d="M30 80 Q30 50 50 45 Q70 50 70 80" />
                <path d="M35 55 L30 85 M65 55 L70 85" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </div>
            <p className="text-[9px] mt-2 font-bold tracking-widest uppercase text-gray-800">Federacion Nicaragüense de Fisicoculturismo</p>
            <p className="text-[8px] font-bold tracking-wider text-gray-600">FENIFISC</p>
          </div>
        </div>
      </div>
    </div>
  );
};
