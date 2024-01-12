import React, { useState, useEffect } from 'react';
import PublicationItem from './PublicationItem';  

const PublicationsList = () => {
  const [publications, setPublications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
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
  const handleSortToggle = () => {
    setSortAscending(!sortAscending);
  };
  const filteredPublications = publications.filter(publication => 
    publication.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedPublications = [...filteredPublications].sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (titleA < titleB) return sortAscending ? -1 : 1;
    if (titleA > titleB) return sortAscending ? 1 : -1;
    return 0;
  }).filter(publication => 
    publication.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
    <button onClick={handleSortToggle} className="sort-button">
        {sortAscending ? "Sort Descending" : "Sort Ascending"}
      </button>
      <input 
        type="text" 
        placeholder="Search by title..." 
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="publications-list">
        {sortedPublications.map((publication, index) => (
          <PublicationItem key={index} publication={publication} onDownload={downloadFile} />
        ))}
      </div>
    </div>
  );
};

export default PublicationsList;
