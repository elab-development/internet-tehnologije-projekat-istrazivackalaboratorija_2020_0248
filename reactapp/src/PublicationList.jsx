import React, { useState, useEffect } from 'react';
import PublicationItem from './PublicationItem';  

const PublicationsList = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const savedPublications = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
    setPublications(savedPublications);
  }, []);

  const downloadFile = (fileName, base64File) => {
    const link = document.createElement("a");
    link.href = base64File;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="publications-list">
      {publications.map((publication, index) => (
        <PublicationItem key={index} publication={publication} onDownload={downloadFile} />
      ))}
    </div>
  );
};

export default PublicationsList;
