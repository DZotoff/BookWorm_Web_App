import React, { useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library'; 

const ZXing = ({ onDetected }) => {
    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader();
    
        const videoElement = document.getElementById('video');
    
        const scan = async () => {
          try {
            const result = await codeReader.decodeOnceFromVideoDevice(undefined, 'video');
            onDetected(result.text);
          } catch (error) {
            console.error('Error scanning barcode:', error);
          } finally {
            // Stop the video stream after the scan
            codeReader.reset();
          }
        };
    
        // Initialize the code reader with video element
        codeReader.start(videoElement, { formats: ['EAN_13'] }, scan);
    
        // Cleanup: Stop the video stream when the component unmounts
        return () => {
          codeReader.stop();
        };
      }, [onDetected]);
    
      return <video id="video" style={{ width: '100%' }}></video>;
};

export default ZXing;
