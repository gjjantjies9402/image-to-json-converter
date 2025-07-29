import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [caption, setCaption] = useState('Default user avatar');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create image preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const bytes = new Uint8Array(arrayBuffer);
      
      // Convert bytes to base64
      let binary = '';
      bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
      });
      const base64String = window.btoa(binary);

      // Create JSON object
      const data = {
        bytes: base64String,
        mimeContentType: file.type,
        caption: caption
      };

      setJsonData(data);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
    if (jsonData) {
      setJsonData({
        ...jsonData,
        caption: e.target.value
      });
    }
  };

  const downloadJson = () => {
    if (!jsonData) return;

    const dataStr = JSON.stringify(jsonData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', 'image_data.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="App">
      <h1>Image to JSON Converter</h1>
      
      <div className="upload-container">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <button onClick={triggerFileInput}>
          Choose Image
        </button>
        
        {imagePreview && (
          <div className="preview">
            <img src={imagePreview} alt="Preview" />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="caption">Image Caption:</label>
        <textarea
          id="caption"
          value={caption}
          onChange={handleCaptionChange}
          placeholder="Enter image caption"
        />
      </div>

      <button 
        onClick={downloadJson} 
        disabled={!jsonData}
      >
        Download JSON
      </button>
    </div>
  );
}

export default App;