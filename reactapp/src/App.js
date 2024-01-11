import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage';
import PublicationUploadForm from './PublicationUploadForm ';
import PublicationsList from './PublicationList';

function App() {
  return (
    <div className="App">
      <HomePage></HomePage>
      <PublicationUploadForm></PublicationUploadForm>
      <PublicationsList></PublicationsList>
    </div>
  );
}

export default App;
