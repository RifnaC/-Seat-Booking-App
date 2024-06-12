import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('')
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email.includes('@') || !email.includes(".")) return setErr("Enter valid email!");
    if(password.length < 6) return setErr("password should contain atleast 6 characters!");
    dispatch(loginUser({ email, password, navigate }));
  };

  return (
    <div className='bg-yellow-100 h-72 w-1/4'>
      <h2 className='text-center text-2xl font-bold text-black my-3'>Login</h2>
      {status === 'loading' && <p className='text-center'>Loading...</p>}
      {error && <p className='text-center text-red-600'>Error: {error.message}</p>}
      {err && <p className='text-center text-red-600'>Error: {err}</p>}
      <form onSubmit={handleSubmit} className='register flex justify-center items-center mt-8'>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
