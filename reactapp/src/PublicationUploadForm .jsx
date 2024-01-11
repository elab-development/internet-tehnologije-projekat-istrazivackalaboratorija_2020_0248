import React, { useState } from 'react';

const PublicationUploadForm = () => {
  const [publication, setPublication] = useState({
    title: '',
    authors: '',
    abstract: '',
    keywords: '',
    file: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPublication({ ...publication, [name]: value });
  };

  const handleFileChange = (e) => {
    setPublication({ ...publication, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
  
    if (publication.file) {
      const reader = new FileReader();
  
      reader.onload = function (event) {
        try {
          const base64File = event.target.result;
          localStorage.setItem('uploadedFile', base64File);
  
          // Save other form data as a JSON object
          const formData = {
            title: publication.title,
            authors: publication.authors,
            abstract: publication.abstract,
            keywords: publication.keywords
          };
          localStorage.setItem('publicationData', JSON.stringify(formData));
  
          alert('Publication uploaded successfully!');
        } catch (error) {
          console.error('Error saving the file:', error);
          alert('Failed to upload the publication.');
        }
      };
  
      reader.onerror = function (error) {
        console.error('Error reading the file:', error);
      };
  
      reader.readAsDataURL(publication.file);
    }
  
    // Reset form after submission
    setPublication({
      title: '',
      authors: '',
      abstract: '',
      keywords: '',
      file: null
    });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={publication.title}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Authors:
        <input
          type="text"
          name="authors"
          value={publication.authors}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Abstract:
        <textarea
          name="abstract"
          value={publication.abstract}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Keywords:
        <input
          type="text"
          name="keywords"
          value={publication.keywords}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Upload File:
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          required
        />
      </label>

      <button type="submit">Submit Publication</button>
    </form>
  );
};

export default PublicationUploadForm;
