import logo from './logo.svg';
import './App.css';
import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

function App() {
  const scannerRef = useRef(null);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode(scannerRef.current.id);

    const startScanner = async () => {
      try {
        await html5QrCode.start(
          { facingMode: "environment" }, // Sử dụng camera sau
          {
            fps: 60, // Số khung hình mỗi giây
            qrbox: { width: 250, height: 250 }, // Kích thước khung quét
          },
          (decodedText) => {
            window.location.href = decodedText
          },
          (errorMessage) => {
            console.log(`QR Code scan error: ${errorMessage}`);
          }
        );
      } catch (error) {
        console.error("Failed to start QR scanner:", error);
      }
    };

    startScanner();

    // Cleanup khi component bị unmount
    return () => {
      html5QrCode.stop().catch((error) => {
        console.error("Failed to stop QR scanner:", error);
      });
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>QR Code Scanner</h1>
      <div
        id="qr-scanner"
        ref={scannerRef}
        style={{
          width: "100%",
          maxWidth: "500px",
          height: "500px",
          margin: "auto",
        }}
      ></div>
    </div>
  );
}

export default App;
