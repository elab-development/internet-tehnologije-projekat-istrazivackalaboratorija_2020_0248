import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MojiArtikli.css';

const MojiArtikli = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/mojiArtikli', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleOpenArticle = async (id, filename) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:8000/api/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
  
      const contentDisposition = response.headers['content-disposition'];
      let finalFilename = filename;
      if (contentDisposition) {
        const matches = /filename="([^"]+)"/.exec(contentDisposition);
        if (matches.length > 1) {
          finalFilename = matches[1];
        }
      }
  
      const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', finalFilename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      alert('Article downloaded successfully!');
    } catch (error) {
      console.error('Error downloading article:', error);
      alert('Failed to download article.');
    }
  };

  const handleDeleteArticle = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Ukloni izbrisani članak iz stanja kako bi se osvježila tabela
      setArticles(articles.filter(article => article.id !== id));
      alert('Article deleted successfully!');
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Failed to delete article.');
    }
  };

  return (
    <div className='moji-artikli'>
      <h2>Moji Artikli</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Published At</th>
            <th>Actions</th>  
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{article.content}</td>
              <td>{article.published_at}</td>
              <td>
                <button onClick={() => handleOpenArticle(article.id)}>Otvori</button>
                <button onClick={() => handleDeleteArticle(article.id)}>Obrisi</button>
              </td>  
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MojiArtikli;
