import React, { useState } from 'react';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';

const Register = () => { 
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false); // State za prikazivanje/skrivanje lozinke

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const generateRandomPassword = async () => {
    try {
      const response = await axios.get('https://api.api-ninjas.com/v1/passwordgenerator?length=16', {
        headers: { 'X-Api-Key': 'QxMU0Daw1G4sRqVm6vPxjIB216188KMvISmtSJ1K'}
      });
      setFormData({ ...formData, password: response.data.random_password });
    } catch (error) {
      console.error('Error generating random password:', error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      console.log(response.data); 
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.response.data.message);
    }
  }; 

  return (
    <div className="homepage">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}  
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={generateRandomPassword}>Generate Random Password</button>
          <button type="button" onClick={handleTogglePassword}>
            {showPassword ? 'Hide Password' : 'Show Password'}
          </button>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
