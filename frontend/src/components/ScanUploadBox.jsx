// src/components/ScanUploadBox.jsx
import React, { useState, useRef } from 'react';
import Button from './Button';

const ScanUploadBox = ({ onImageSelected, scanning = false, className = '' }) => {
  const [preview,  setPreview]  = useState(null);
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
        /* Image preview with scan overlay */
        <div className="relative rounded-xl overflow-hidden border border-gold/30 bg-charcoal-900">
          <img src={preview} alt="Food packet" className="w-full max-h-72 object-contain" />

          {/* Corner brackets */}
          {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r',
            'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'
          ].map((pos, i) => (
            <div key={i} className={`absolute w-6 h-6 ${pos} border-gold`} />
          ))}

          {scanning && (
            <div className="absolute inset-0">
              <div className="scan-line" />
              <div className="absolute inset-0 bg-gradient-to-b from-gold/3 to-transparent pointer-events-none" />
            </div>
          )}

          {!scanning && (
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 bg-gradient-to-t from-charcoal-900 via-charcoal-900/80 to-transparent">
              <span className="text-safe text-xs font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-safe" />Image loaded
              </span>
              <button
                onClick={() => { setPreview(null); if (inputRef.current) inputRef.current.value = ''; }}
                className="text-charcoal-400 hover:text-white text-xs transition-colors"
              >
                Change image
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Drop zone */
        <div
          onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files[0]); }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300
            ${dragging
              ? 'border-gold/60 bg-gold/5 shadow-gold'
              : 'border-charcoal-700 hover:border-gold/40 hover:bg-charcoal-900'}`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className={`w-20 h-20 rounded-xl flex items-center justify-center text-4xl border transition-all duration-300
              ${dragging ? 'bg-gold/10 border-gold/40' : 'bg-charcoal-800 border-charcoal-700'}`}>
              📦
            </div>
            <div>
              <p className="text-gray-300 font-medium text-sm">
                {dragging ? 'Drop to upload' : 'Upload food packet image'}
              </p>
              <p className="text-charcoal-500 text-xs mt-1">Drag & drop or click to browse</p>
              <p className="text-charcoal-700 text-xs mt-0.5">JPG, PNG, WEBP supported</p>
            </div>
            <Button variant="outline" size="sm" icon="📸">Browse Image</Button>
          </div>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={(e) => handle(e.target.files[0])} className="hidden" />
    </div>
  );
};

export default ScanUploadBox;
