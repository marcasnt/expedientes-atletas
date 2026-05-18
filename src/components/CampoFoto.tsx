import React, { useRef } from 'react';

interface CampoFotoProps {
  label: string;
  value: string | null;
  onChange: (base64: string | null) => void;
  aspectRatio?: string;
  placeholderText?: string;
}

export const CampoFoto: React.FC<CampoFotoProps> = ({
  label,
  value,
  onChange,
  aspectRatio = 'aspect-[3/4]',
  placeholderText = 'Click para subir foto',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center">
      <label className="text-[10px] font-bold uppercase tracking-wide mb-1 text-center">
        {label}
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        className={`
          relative border-2 border-dashed border-gray-400 bg-gray-50 cursor-pointer
          flex items-center justify-center overflow-hidden
          ${aspectRatio} w-full max-w-[160px]
          hover:bg-gray-100 transition-colors
        `}
      >
        {value ? (
          <img
            src={value}
            alt={label}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <span className="text-[9px] text-gray-500 text-center px-2 leading-tight">
            {placeholderText}
          </span>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      {value && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange(null);
          }}
          className="mt-1 text-[9px] text-red-600 underline hover:text-red-800"
          type="button"
        >
          Eliminar
        </button>
      )}
    </div>
  );
};
