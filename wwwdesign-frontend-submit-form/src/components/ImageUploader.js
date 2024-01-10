import React, { useState } from 'react';
import { ImageFill } from 'react-bootstrap-icons';
import './ImageUploader.css';
import '../styles.css'

const ImageUploader = ({ onChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      try {
        const base64String = await convertImageToBase64(file);
        onChange(base64String);
      } catch (error) {
        console.error('Error converting image to Base64:', error);
      }
    } else {
      setSelectedFile(null);
      alert('Please select a valid image file.');
    }
  }

  const handleButtonClick = () => {
    // Trigger the hidden file input element
    document.getElementById('fileInput').click();
  };

  return (
    <div>
      <label className="image-uploader">
        <button type="button" onClick={handleButtonClick}>
          <ImageFill size={24} /> Upload Image
        </button>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </label>
      {selectedFile && <div>Selected: {selectedFile.name}</div>}
    </div>
  );
};

function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result;
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

export default ImageUploader;