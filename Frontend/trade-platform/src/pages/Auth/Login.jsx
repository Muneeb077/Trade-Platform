import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/Input';
import GoogleButton from '../../components/Inputs/GoogleButton';
import { validateEmail } from '../../utils/helper'
import { useNavigate, Link } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
        return;
    }

    if (!password) {
      setError('Password is required');
        return;
    }
    setError("");

    // Login API Call
    try{
      const {data} = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {email, password});
      localStorage.setItem('token', data.token);
      navigate('/dashboard')
    } catch (err){
      const msg = err?.response?.data?.message || err.message || 'Login failed';
      setError(msg);
    } finally{setLoading(false);}

  }

  const handleGoogleSuccess = (data) => {
    try{
      const GOOGLE_ENDPOINT = API_PATHS.AUTH.GOOGLE_LOGIN || '/api/v1/auth/google';
      if (data?.token) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
        return;
      }
      setError('Google sign-in response was not recognized.');
    }catch (err){
      const msg = err?.response?.data?.message || err.message || 'Google sign-in failed';
      setError(msg);
    } finally{setLoading(false);}
  };

  const handleGoogleError = (err) => {
    setError(err.message || 'Google sign-in was cancelled or failed.')
  }
  
  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your login credentials
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type='text'
          />
          <div className="mt-3" />
          <Input
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type='password'
          />
          {error && <p className='text-red-500 text-xs pb-2.5 mt-2'>{error}</p>}

          <button
            type='submit'
            className='btn-slate-900 mt-2'
            disabled={loading}
          >
            {loading ? 'Logging in…' : 'LOGIN'}
          </button>

          <GoogleButton
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />

          <p className='text-[13px] text-slate-800 mt-3'>
            Don&apos;t have an account?{' '}
            <Link className='font-medium text-slate-900 underline' to='/signUp'>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login