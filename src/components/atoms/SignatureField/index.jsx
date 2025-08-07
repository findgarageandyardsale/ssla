import React, { useRef, useEffect, useState } from 'react';
import { uploadSignature, validateSignature } from '../../../services/signatureService';
import { PenTool, RotateCcw, Download, Upload, CheckCircle, AlertCircle } from 'lucide-react';

export const SignatureField = ({
  label,
  name,
  required = false,
  error,
  onSignatureChange,
  className = "",
  ...props
}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      setContext(ctx);
    }
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    context.closePath();
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureData(null);
    setUploadStatus(null);
    onSignatureChange?.(null);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    setSignatureData(dataURL);
    return dataURL;
  };

  const handleUploadSignature = async () => {
    if (!signatureData) {
      setUploadStatus({ type: 'error', message: 'Please draw a signature first' });
      return;
    }

    setIsUploading(true);
    setUploadStatus({ type: 'loading', message: 'Validating signature...' });

    try {
      // Validate signature first
      const validation = await validateSignature(signatureData);
      if (!validation.valid) {
        setUploadStatus({ type: 'error', message: validation.error });
        return;
      }

      setUploadStatus({ type: 'loading', message: 'Uploading signature...' });

      // Upload signature
      const result = await uploadSignature(signatureData, name);

      if (result.success) {
        setUploadStatus({ 
          type: 'success', 
          message: 'Signature uploaded successfully!',
          data: result 
        });
        onSignatureChange?.(result);
      } else {
        setUploadStatus({ 
          type: 'error', 
          message: result.error || 'Upload failed' 
        });
      }
    } catch (error) {
      setUploadStatus({ 
        type: 'error', 
        message: error.message || 'Upload failed' 
      });
    } finally {
      setIsUploading(false);
    }
  };

  const downloadSignature = () => {
    if (!signatureData) return;
    
    const link = document.createElement('a');
    link.download = `signature_${Date.now()}.png`;
    link.href = signatureData;
    link.click();
  };

  return (
    <div className={`group ${className}`}>
      <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-blue-600 transition-colors duration-200">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500 focus-within:ring-opacity-20 transition-all duration-300">
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          className="w-full h-48 bg-white cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={(e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
              clientX: touch.clientX,
              clientY: touch.clientY
            });
            startDrawing(mouseEvent);
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
              clientX: touch.clientX,
              clientY: touch.clientY
            });
            draw(mouseEvent);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            stopDrawing();
          }}
        />
      </div>

      {/* Signature Actions */}
      <div className="flex flex-wrap gap-2 mt-3">
        <button
          type="button"
          onClick={clearSignature}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
        >
          <RotateCcw className="h-4 w-4" />
          Clear
        </button>
        
        <button
          type="button"
          onClick={saveSignature}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors duration-200"
        >
          <PenTool className="h-4 w-4" />
          Save
        </button>
        
        <button
          type="button"
          onClick={downloadSignature}
          disabled={!signatureData}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
        >
          <Download className="h-4 w-4" />
          Download
        </button>
        
        <button
          type="button"
          onClick={handleUploadSignature}
          disabled={!signatureData || isUploading}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
        >
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-700"></div>
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload
            </>
          )}
        </button>
      </div>

      {/* Upload Status */}
      {uploadStatus && (
        <div className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${
          uploadStatus.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : uploadStatus.type === 'error'
            ? 'bg-red-50 text-red-700 border border-red-200'
            : 'bg-blue-50 text-blue-700 border border-blue-200'
        }`}>
          {uploadStatus.type === 'success' ? (
            <CheckCircle className="h-4 w-4" />
          ) : uploadStatus.type === 'error' ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700"></div>
          )}
          <span className="text-sm font-medium">{uploadStatus.message}</span>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
          <p className="text-sm text-red-600 font-medium">{error.message}</p>
        </div>
      )}

      {/* Hidden input for form integration */}
      <input
        type="hidden"
        name={name}
        value={signatureData || ''}
        {...props}
      />
    </div>
  );
};

SignatureField.displayName = "SignatureField"; 