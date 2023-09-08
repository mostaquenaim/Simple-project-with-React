import React, { useState } from 'react';
import { useRouter } from 'next/router';
import IndexCheck from './components/index-check';

function Login() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.username === formData.username && u.password === formData.password
    );

    if (user) {
      sessionStorage.setItem('username', user.username);
      router.push('dashboard')
      
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <IndexCheck/>
      
      <div className='container'>
        <div className='box-container-login'>
      <h2>User Login</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <button className='btn-primary'  onClick={handleLogin}>Login</button>
      <a href='registration'> Not registered yet?</a>
      </div>
      </div>
    </div>
  );
}

export default Login;
