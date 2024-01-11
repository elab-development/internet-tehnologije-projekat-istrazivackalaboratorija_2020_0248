const InputField = ({ label, name, value, onChange, type = 'text' }) => {
    return (
      <label>
        {label}:
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
        />
      </label>
    );
  };
  export default InputField;