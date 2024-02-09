import React, { useState } from 'react';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';
const Login = ({setToken}) => { 
  let navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: 'monty87@example.org',
    password: 'password'
  });
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      console.log(response.data); 
      setToken(response.data.token);
      sessionStorage.setItem("token",response.data.token);
      navigate('/upload')
    } catch (error) {
      console.error('Login error:', error.response.data.message);
      
    }
  }; 
  return (
    <div className="homepage">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
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
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
