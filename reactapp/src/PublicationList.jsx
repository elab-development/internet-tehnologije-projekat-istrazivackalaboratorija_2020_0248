import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PublicationItem from './PublicationItem';

const PublicationsList = () => {
  const [publications, setPublications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const token = sessionStorage.getItem('token');  
        const response = await axios.get('http://127.0.0.1:8000/api/articles', {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
        setPublications(response.data.data);
      } catch (error) {
        console.error('Error fetching publications:', error);
      }
    };
  
    fetchPublications();
  }, []);
  
  const handleDownloadFile = (fileName, base64File) => {
    const link = document.createElement('a');
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

  const handleApprovePublication = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.put(`http://127.0.0.1:8000/api/articles/${id}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });
  
      setPublications(prevPublications => {
        return prevPublications.map(pub => {
          if (pub.id === id) {
            return { ...pub, odobreno: true };
          }
          return pub;
        });
      });
    } catch (error) {
      console.error('Error approving publication:', error);
    }
  };

  const filteredPublications = publications.filter((publication) => {
    const { title, authors, abstract, keywords } = publication;
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return (
      title.toLowerCase().includes(lowercaseSearchTerm) ||
      authors.toLowerCase().includes(lowercaseSearchTerm) ||
      abstract.toLowerCase().includes(lowercaseSearchTerm) ||
      keywords.toLowerCase().includes(lowercaseSearchTerm)
    );
  });

  const sortedPublications = [...filteredPublications].sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (titleA < titleB) return sortAscending ? -1 : 1;
    if (titleA > titleB) return sortAscending ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <button onClick={handleSortToggle} className="sort-button">
        {sortAscending ? 'Sort Descending' : 'Sort Ascending'}
      </button>
      <input
        type="text"
        placeholder="Search by title, authors, abstract, keywords..."
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="publications-list">
        {sortedPublications.map((publication, index) => (
          <PublicationItem
            key={index}
            publication={publication}
            onDownload={handleDownloadFile}
            onApprove={handleApprovePublication}
          />
        ))}
      </div>
    </div>
  );
};

export default PublicationsList;
