const PublicationItem = ({ publication, onDownload }) => {
    return (
      <div className="publication-item">
        <h3>{publication.title}</h3>
        <p><strong>Authors:</strong> {publication.authors}</p>
        <p><strong>Abstract:</strong> {publication.abstract}</p>
        <p><strong>Keywords:</strong> {publication.keywords}</p>
        <button onClick={() => onDownload(publication.title, publication.file)}>
          Download File
        </button>
      </div>
    );
  };
export default  PublicationItem;