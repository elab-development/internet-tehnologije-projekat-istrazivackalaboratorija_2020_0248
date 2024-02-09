import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MojiArtikli.css';

const MojiArtikli = () => {
    const [articles, setArticles] = useState([]);
    const [editingArticle, setEditingArticle] = useState(null);
    const [editedData, setEditedData] = useState({});
  
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

      setArticles(articles.filter(article => article.id !== id));
      alert('Article deleted successfully!');
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Failed to delete article.');
    }
  };

  const handleUpdateArticle = (article) => {
    setEditingArticle(article.id);
    setEditedData({ ...article });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();  
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.put(`http://127.0.0.1:8000/api/articles/${editingArticle}`, editedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setArticles(articles.map((article) => (article.id === editingArticle ? response.data : article)));
      alert('Article updated successfully!');

      setEditingArticle(null);
      setEditedData({});
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Failed to update article.');
    }
  };
  const closeModal = () => {
    setEditingArticle(null);
    setEditedData({});
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
            <th>Keywords</th>  
            <th>Actions</th>  
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{article.content}</td>
              <td>{article.published_at}</td>
              <td>{article.keywords}</td>
              <td>
                <button onClick={() => handleOpenArticle(article.id)}>Otvori</button>
                <button onClick={() => handleDeleteArticle(article.id)}>Obrisi</button>
                <button onClick={() => handleUpdateArticle( article)}>Azuriraj</button>
              </td>  
            </tr>
          ))}
        </tbody>
      </table>
      {editingArticle && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Edit Article</h2>
            <form onSubmit={handleSubmitUpdate}>
              <label>Title:</label>
              <input type="text" name="title" value={editedData.title || ''} onChange={handleInputChange} />
              <label>Content:</label>
              <textarea name="content" value={editedData.content || ''} onChange={handleInputChange}></textarea>
              <label>Published At:</label>
              <input type="text" name="published_at" value={editedData.published_at || ''} onChange={handleInputChange} />
              <label>Keywords:</label>
              <input type="text" name="keywords" value={editedData.keywords || ''} onChange={handleInputChange} />
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MojiArtikli;
