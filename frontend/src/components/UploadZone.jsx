import { useState } from 'react';
import { UploadCloud } from 'lucide-react';

export default function UploadZone({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(e.target.files);
    }
  };

  const processFiles = async (files) => {
    setIsUploading(true);
    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      if (files[i].type === 'application/pdf' || files[i].name.endsWith('.pdf')) {
        formData.append('resumes', files[i]);
      }
    }
    
    if (!formData.has('resumes')) {
      alert("Please upload valid PDF files.");
      setIsUploading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      if (response.ok) {
        onUpload(data.candidates);
      } else {
        alert(data.error || "Failed to upload files");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error connecting to server. Is the backend running?");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div 
      className={`upload-zone glass-panel ${isDragging ? 'drag-active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-upload').click()}
    >
      <input 
        id="file-upload" 
        type="file" 
        multiple 
        accept=".pdf" 
        style={{ display: 'none' }} 
        onChange={handleFileSelect}
      />
      {isUploading ? (
        <div className="loader"></div>
      ) : (
        <UploadCloud className="upload-icon" />
      )}
      <h3>{isUploading ? "Processing Resumes..." : "Drag & Drop Resumes Here"}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        Supports multiple PDF files. We'll automatically extract skills and experience.
      </p>
      <button className="btn" style={{ marginTop: '1rem' }} disabled={isUploading}>
        Browse Files
      </button>
    </div>
  );
}
