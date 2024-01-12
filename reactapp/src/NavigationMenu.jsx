import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationMenu = () => {
  let navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li onClick={() => navigate('/')}>Home</li>
        <li onClick={() => navigate('/upload')}>Upload Publication</li>
        <li onClick={() => navigate('/publications')}>Publications List</li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
