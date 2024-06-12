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
  const [err, setErr] = useState('')
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name.length < 3) return setErr("Enter valid name!");
    if(!email.includes('@') || !email.includes(".")) return setErr("Enter valid email!");
    if(password.length < 6) return setErr("password should contain atleast 6 characters!");
    if(password !== confirmPassword) return setErr("Password and confirm password should be same!")
    dispatch(registerUser({name, email, password, confirmPassword, navigate }));
    setErr("")
  };

  return (
    <div className=' bg-yellow-100 h-96 w-1/4 '>
      <h2 className='text-center text-2xl font-bold text-black my-3'>Register</h2>
      {status === 'loading' && <p className='text-center'>Loading...</p>}
      {error && <p className='text-center text-red-600'>Error: {error.message}</p>}
      {err && <p className='text-center text-red-600'>Error: {err}</p>}
      <form className='register flex justify-center items-center mt-8' onSubmit={handleSubmit}>
      <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
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
          placeholder="Confirm Password"
        />
        <button type="submit" disabled={status === 'loading'}>Register</button>
      </form>
    </div>
  );
};

export default Register;
