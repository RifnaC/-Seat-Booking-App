// src/components/Register.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import '../App.css'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({name, email, password, confirmPassword, navigate }));
  };

  return (
    <div className=' bg-yellow-400 h-72 w-1/3 '>
      <h2 className='text-center text-2xl font-bold text-black my-3'>Register</h2>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <form className='register flex justify-center items-center' onSubmit={handleSubmit}>
      <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" disabled={status === 'loading'}>Register</button>
      </form>
    </div>
  );
};

export default Register;
