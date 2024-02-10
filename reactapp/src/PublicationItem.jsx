const PublicationItem = ({ publication, onDownload, onApprove }) => {
  return (
    <div className="publication-item">
      <h3>{publication.title}</h3>
      <p><strong>Authors:</strong> {publication.user.name}</p>
      <p><strong>Abstract:</strong> {publication.content}</p>
      <p><strong>Keywords:</strong> {publication.keywords}</p>
      <button onClick={() => onDownload(publication.title, publication.file)}>
        Download File
      </button>
      {!publication.odobreno && (
        <button onClick={() => onApprove(publication.id)}>
          Approve
        </button>
      )}
    </div>
  );
};

export default PublicationItem;
