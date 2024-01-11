import React, { useState } from 'react';
import InputField from './InputField';
import TextareaField from './TextareaField';

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
          const existingFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
          const newFile = {
            title: publication.title,
            authors: publication.authors,
            abstract: publication.abstract,
            keywords: publication.keywords,
            file: base64File
          };
          existingFiles.push(newFile);
          localStorage.setItem('uploadedFiles', JSON.stringify(existingFiles));

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
      <InputField
        label="Title"
        name="title"
        value={publication.title}
        onChange={handleInputChange}
      />

      <InputField
        label="Authors"
        name="authors"
        value={publication.authors}
        onChange={handleInputChange}
      />

      <TextareaField
        label="Abstract"
        name="abstract"
        value={publication.abstract}
        onChange={handleInputChange}
      />

      <InputField
        label="Keywords"
        name="keywords"
        value={publication.keywords}
        onChange={handleInputChange}
      />

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
