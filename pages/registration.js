import React, { useState } from 'react';
import SessionCheck from './components/sessionCheck';

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    profilePicture: null,
    bio: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profilePicture: file,
    });
  };

  const isUsernameUnique = (username) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return !users.some((user) => user.username === username);
  };

  const handleRegistration = () => {

    // Check if all fields are filled
    if (!formData.username || !formData.password || !formData.profilePicture || !formData.bio) {
      alert('All fields are required.');
      return;
    }

    // Check if the username is unique
    if (!isUsernameUnique(formData.username)) {
      alert('Username is already taken. Please choose a different one.');
      return;
    }

    // File handling
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64String = event.target.result;
      const user = {
        ...formData,
        profilePicture: base64String,
      };

      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful!');
    };

    if (formData.profilePicture) {
      reader.readAsDataURL(formData.profilePicture);
    } else {
      alert('Please upload a profile picture.');
    }
  };

  return (
    <div>
      <SessionCheck />
      <div className='container'>
      <h2>User Registration</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />
      <input
        type="file"
        name="profilePicture"
        accept="image/*"
        onChange={handleFileUpload}
        required
      />
      <textarea
        name="bio"
        placeholder="Bio"
        value={formData.bio}
        onChange={handleInputChange}
        required
      />
      <button onClick={handleRegistration}>Register</button>
      <a href='login'>Already Registered?</a>
      </div>
    </div>
  );
}

export default Registration;
