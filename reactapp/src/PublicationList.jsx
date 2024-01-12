import React, { useState, useEffect } from 'react';

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
        <div key={index} className="publication">
          <h3>{publication.title}</h3>
          <p><strong>Authors:</strong> {publication.authors}</p>
          <p><strong>Abstract:</strong> {publication.abstract}</p>
          <p><strong>Keywords:</strong> {publication.keywords}</p>
          <button onClick={() => downloadFile(publication.title, publication.file)}>
            Download File
          </button>
        </div>
      ))}
    </div>
  );
};

export default PublicationsList;
