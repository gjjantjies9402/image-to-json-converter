import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [caption, setCaption] = useState("Default user avatar");
  const [imagePreview, setImagePreview] = useState(null);
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const fileInputRef = useRef(null);

  // Handle PWA installation prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPromptEvent(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);
  // Enhanced PWA installation handling for mobile
  useEffect(() => {
    let deferredPrompt;
    const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt = e;
      setIsInstallable(!isiOS); // iOS doesn't support beforeinstallprompt
    };

    const checkInstalled = () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        console.log("Running as PWA");
        setIsInstallable(false);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    checkInstalled();

    // For iOS - show custom install instructions
    if (isiOS) {
      setIsInstallable(true);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // const handleInstallClick = async () => {
  //   const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  //   if (isiOS) {
  //     // Show iOS installation instructions
  //     setShowIOSInstructions(true);
  //   } else if (deferredPrompt) {
  //     deferredPrompt.prompt();
  //     const { outcome } = await deferredPrompt.userChoice;
  //     console.log(`User ${outcome} the install prompt`);
  //     deferredPrompt = null;
  //     setIsInstallable(false);
  //   }
  // };
  const handleInstallClick = () => {
    if (!installPromptEvent) return;

    installPromptEvent.prompt();

    installPromptEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setInstallPromptEvent(null);
      setIsInstallable(false);
    });
  };

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
      let binary = "";
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
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", "image_data.json");
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

      {isInstallable && (
        <button className="install-button" onClick={handleInstallClick}>
          Install App
        </button>
      )}

      <div className="upload-container">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: "none" }}
        />
        <button onClick={triggerFileInput}>Choose Image</button>

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

      <button onClick={downloadJson} disabled={!jsonData}>
        Download JSON
      </button>
    </div>
  );
}

export default App;
