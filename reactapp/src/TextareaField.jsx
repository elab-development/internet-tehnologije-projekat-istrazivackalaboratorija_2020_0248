const TextareaField = ({ label, name, value, onChange }) => {
    return (
      <label>
        {label}:
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required
        />
      </label>
    );
  };
  export default TextareaField;