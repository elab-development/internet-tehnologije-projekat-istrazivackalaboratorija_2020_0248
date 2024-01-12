import React, { useState, useEffect } from 'react';
import PublicationItem from './PublicationItem';  

const PublicationsList = () => {
  const [publications, setPublications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPublications = publications.filter(publication => 
    publication.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search by title..." 
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="publications-list">
        {filteredPublications.map((publication, index) => (
          <PublicationItem key={index} publication={publication} onDownload={downloadFile} />
        ))}
      </div>
    </div>
  );
};

export default PublicationsList;
