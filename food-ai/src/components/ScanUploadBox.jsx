// src/components/ScanUploadBox.jsx
import React, { useState, useRef } from 'react';
import ScanFrame from './ScanFrame';
import NeonButton from './NeonButton';

const ScanUploadBox = ({ onImageSelected, scanning = false, className = '' }) => {
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handle = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setPreview(URL.createObjectURL(file));
    if (onImageSelected) onImageSelected(file);
  };

  return (
    <div className={className}>
      {preview ? (
        <ScanFrame scanning={scanning} className="rounded-xl overflow-hidden border border-neon-blue/30">
          <img src={preview} alt="Packet" className="w-full max-h-72 object-contain bg-lab-card" />
          {!scanning && (
            <div className="absolute inset-0 flex items-end justify-center pb-4 bg-gradient-to-t from-lab-bg/80 to-transparent">
              <div className="flex gap-3">
                <span className="text-safe text-xs font-mono bg-lab-bg/90 px-3 py-1.5 rounded border border-safe/30">◉ IMAGE LOADED</span>
                <button
                  onClick={() => { setPreview(null); if (inputRef.current) inputRef.current.value = ''; }}
                  className="text-gray-500 hover:text-gray-300 text-xs font-mono bg-lab-bg/90 px-3 py-1.5 rounded border border-lab-border"
                >
                  [CHANGE]
                </button>
              </div>
            </div>
          )}
        </ScanFrame>
      ) : (
        <div
          onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files[0]); }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-10 text-center cursor-pointer
            transition-all duration-300 relative overflow-hidden
            ${dragging ? 'border-neon-blue bg-neon-blue/5 shadow-neon' : 'border-lab-border hover:border-neon-blue/50 hover:bg-neon-blue/5'}
          `}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20"
            style={{ backgroundImage: 'linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="relative flex flex-col items-center gap-4">
            <div className={`w-20 h-20 rounded-xl border ${dragging ? 'border-neon-blue bg-neon-blue/20 shadow-neon' : 'border-lab-border bg-lab-surface'} flex items-center justify-center text-4xl transition-all`}>
              📦
            </div>
            <div>
              <p className="text-gray-300 font-mono font-medium text-sm">{dragging ? 'DROP TO UPLOAD' : 'UPLOAD PACKET IMAGE'}</p>
              <p className="text-gray-600 font-mono text-xs mt-1">Drag & drop or click to browse</p>
              <p className="text-gray-700 font-mono text-xs">JPG · PNG · WEBP</p>
            </div>
            <NeonButton variant="primary" size="sm" icon="📸">Browse Files</NeonButton>
          </div>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={(e) => handle(e.target.files[0])} className="hidden" />
    </div>
  );
};

export default ScanUploadBox;
