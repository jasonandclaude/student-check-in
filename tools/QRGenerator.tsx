import React, { useState } from 'react';
import QRCode from 'qrcode.js';

export default function QRGenerator() {
  const [studentData, setStudentData] = useState({
    student_number: '12345',
    qr_code: 'SAMPLE123'
  });

  const generateQR = async () => {
    try {
      const canvas = document.getElementById('qr-canvas');
      await QRCode.toCanvas(canvas, JSON.stringify(studentData), {
        width: 300,
        margin: 2
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <canvas id="qr-canvas"></canvas>
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={generateQR}
      >
        Generate QR Code
      </button>
    </div>
  );
}