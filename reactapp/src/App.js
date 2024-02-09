import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage';
import PublicationUploadForm from './PublicationUploadForm ';
import PublicationsList from './PublicationList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import { useState } from 'react';
import Login from './login/Login';
import Register from './login/Register';
import MojiArtikli from './istrazivac/MojiArtikli';
import StatisticsComponent from './admin/StatisticsComponent';
function App() {
  const [token,setToken] =useState(null);
  return (
    <BrowserRouter>
      <div className="App">
      <NavigationMenu token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<PublicationUploadForm />} />
          <Route path="/statistike" element={<StatisticsComponent />} />
          <Route path="/admin/publications" element={<PublicationsList />} />



          <Route path="/mojiArtikli" element={<MojiArtikli />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login  setToken={setToken}/>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
