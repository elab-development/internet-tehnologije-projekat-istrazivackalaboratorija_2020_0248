import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import TextareaField from './TextareaField';

const PublicationUploadForm = () => {
  const [publication, setPublication] = useState({
    title: '',
    authors: '',
    abstract: '',
    keywords: '',
    references: [{ title: '' }],  
    file: null
  });
  const token = sessionStorage.getItem('token');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPublication({ ...publication, [name]: value });
  };

  const handleReferenceChange = (index, value) => {
    const newReferences = publication.references.map((reference, i) => {
      if (i === index) {
        return { ...reference, title: value };
      }
      return reference;
    });
    setPublication({ ...publication, references: newReferences });
  };

  const addReference = () => {
    setPublication({ ...publication, references: [...publication.references, { title: '' }] });
  };

  const handleFileChange = (e) => {
    setPublication({ ...publication, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', publication.title); 
    formData.append('content', publication.abstract);
    formData.append('keywords', publication.keywords);
    formData.append('file', publication.file);
    publication.references.forEach((reference, index) => {
      formData.append(`reference[${index}][title]`, reference.title);
    });

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      alert('Publication uploaded successfully!');
    } catch (error) {
      console.error('Error uploading the publication:', error);
      alert('Failed to upload the publication.');
    }

    setPublication({
      title: '',
      authors: '',
      abstract: '',
      keywords: '',
      references: [{ title: '' }],  
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

      {publication.references.map((reference, index) => (
        <InputField
          key={index}
          label={`Reference ${index + 1}`}
          name={`reference-${index}`}
          value={reference.title}
          onChange={(e) => handleReferenceChange(index, e.target.value)}
        />
      ))}
      
      <button type="button" onClick={addReference}>Add More References</button>

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
