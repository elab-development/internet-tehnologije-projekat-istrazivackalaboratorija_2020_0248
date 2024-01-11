import React, { useState, useEffect } from 'react';

const PublicationsList = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const savedPublications = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
    setPublications(savedPublications);
  }, []);

  return (
    <div className="publications-list">
      {publications.map((publication, index) => (
        <div key={index} className="publication">
          <h3>{publication.title}</h3>
          <p><strong>Authors:</strong> {publication.authors}</p>
          <p><strong>Abstract:</strong> {publication.abstract}</p>
          <p><strong>Keywords:</strong> {publication.keywords}</p>
          {publication.file && <img src={publication.file} alt={publication.title} />}
        </div>
      ))}
    </div>
  );
};

export default PublicationsList;
