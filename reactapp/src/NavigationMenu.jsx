import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NavigationMenu = ({ token, setToken }) => {
  let navigate = useNavigate();

  const roleId = sessionStorage.getItem('role_id');

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }); 
      setToken(null);
      sessionStorage.removeItem("token");
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error.response.data.message);
    }
  };

  return (
    <nav>
      <ul>
        <li onClick={() => navigate('/')}>Home</li>
        {token ? (
          <>
            {roleId === '1' && (
              <>
                <li onClick={() => navigate('/upload')}>Upload Publication</li>
                <li onClick={() => navigate('/mojiArtikli')}>Moji artikli</li>
              </>
            )}
            {roleId === '2' && (
              <>
                <li onClick={() => navigate('/admin/publications')}>Publications List</li>
                <li onClick={() => navigate('/statistike')}>Statistike</li>
              </>
            )}
            <li onClick={handleLogout}>Logout</li>
          </>
        ) : (
          <>
            <li onClick={() => navigate('/login')}>Login</li>
            <li onClick={() => navigate('/register')}>Register</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
