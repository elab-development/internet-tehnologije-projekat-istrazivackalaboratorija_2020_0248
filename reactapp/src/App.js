import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage';
import PublicationUploadForm from './PublicationUploadForm ';
import PublicationsList from './PublicationList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <NavigationMenu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<PublicationUploadForm />} />
          <Route path="/publications" element={<PublicationsList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
