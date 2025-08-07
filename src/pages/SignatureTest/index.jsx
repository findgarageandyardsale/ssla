import React, { useState } from 'react';
import { SignatureField } from '../../components/atoms/SignatureField';
import { getStoredSignatures, clearAllSignatures } from '../../services/signatureService';

export const SignatureTest = () => {
  const [signatures, setSignatures] = useState([]);

  const loadSignatures = () => {
    const stored = getStoredSignatures();
    setSignatures(stored);
  };

  const handleClearAll = () => {
    clearAllSignatures();
    setSignatures([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Signature Capture Test
          </h1>
          <p className="text-gray-600">
            Test the digital signature capture functionality with Cloudinary integration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Signature Capture */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Capture Signature</h2>
            
            <SignatureField
              label="Draw Your Signature"
              name="testSignature"
              required
              onSignatureChange={(result) => {
                if (result) {
                  console.log('Signature uploaded:', result);
                  loadSignatures(); // Reload signatures after upload
                }
              }}
            />
          </div>

          {/* Stored Signatures */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Stored Signatures</h2>
              <div className="flex gap-2">
                <button
                  onClick={loadSignatures}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Refresh
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>

            {signatures.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No signatures stored yet</p>
                <p className="text-sm">Draw and upload a signature to see it here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {signatures.map((sig) => (
                  <div key={sig.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-800">
                        {sig.type} Signature
                      </h3>
                      <span className="text-sm text-gray-500">
                        {new Date(sig.uploaded_at).toLocaleDateString()}
                      </span>
                    </div>
                    <img
                      src={sig.url}
                      alt={`${sig.type} signature`}
                      className="w-full h-32 object-contain border border-gray-200 rounded bg-gray-50"
                    />
                    <div className="mt-2 text-xs text-gray-500">
                      ID: {sig.public_id}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How to Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Signature Capture</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>Draw your signature in the canvas</li>
                <li>Click &quot;Save&quot; to store the signature locally</li>
                <li>Click &quot;Upload&quot; to save to Cloudinary and localStorage</li>
                <li>Click &quot;Download&quot; to save the signature as an image</li>
                <li>Click &quot;Clear&quot; to start over</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Features</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>Touch and mouse support for drawing</li>
                <li>Automatic validation of signature content</li>
                <li>Cloudinary integration for secure storage</li>
                <li>Local storage backup for offline access</li>
                <li>High-quality PNG export</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 