import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const IconEye = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const IconEyeOff = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a10.05 10.05 0 013.548-5.034M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.166 4.334A10.05 10.05 0 0112 19c-1.29 0-2.524-.208-3.688-.601M19.542 12c-1.274 4.057-5.064 7-9.542 7-1.29 0-2.524-.208-3.688-.601M21 4.755l-16.245 16.245" /></svg>;
const IconGoogle = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691c-1.563 3.12-2.306 6.643-2.306 10.309c0 3.666.743 7.189 2.306 10.309l7.337-5.662C12.643 27.881 12 26.025 12 24c0-2.025.643-3.881 1.643-5.309l-7.337-5.662z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-4.88c-1.746 1.16-3.956 1.87-6.219 1.87c-4.478 0-8.268-2.943-9.543-7H6.306c3.084 6.947 10.032 12 17.694 12z"/><path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-0.792 2.237-2.231 4.166-4.087 5.574l6.19 4.88C42.612 34.438 46 29.696 46 24c0-1.341-.138-2.65-.389-3.917z"/></svg>;
const IconLinkedIn = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="#0077B5"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-1.5c-1 0-1.5.5-1.5 1.5V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z" /></svg>;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(email)) {
      setError('Invalid credentials. Please try again.');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex font-roboto">
       {/* Left Column - Illustration */}
       <div className="hidden lg:flex w-1/2 bg-lp-primary text-white p-12 flex-col justify-center items-center">
            <div className="max-w-md text-center">
                <h1 className="text-4xl font-poppins font-bold mb-4">Welcome Back!</h1>
                <p className="text-lg text-blue-100 mb-8">
                    Your alumni network is waiting. Reconnect with old friends, discover new opportunities, and stay engaged with your community.
                </p>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="max-w-sm">
                  <path fill="#2ECC71" d="M49.3,-68.2C64,-58.5,76.2,-43.3,81.1,-26.2C86,-9.1,83.5,9.8,75.9,25.6C68.3,41.3,55.5,53.8,41.2,63.1C26.9,72.4,11.1,78.5,-5.5,80.5C-22.1,82.5,-40,80.3,-53.4,71.1C-66.9,62,-76.1,45.8,-79.8,28.7C-83.6,11.6,-81.9,-6.4,-75.7,-22.3C-69.5,-38.2,-58.7,-52,-45.3,-62C-31.9,-72,-15.9,-78.2,0.6,-78.9C17.1,-79.6,34.7,-77.8,49.3,-68.2Z" transform="translate(100 100)" />
                </svg>
            </div>
        </div>

        {/* Right Column - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-50">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold font-poppins text-lp-primary">AlumniConnect</h2>
                    <h1 className="text-3xl font-bold font-poppins text-gray-800 mt-2">Welcome Back!</h1>
                    <p className="text-gray-600 mt-2">Log in to stay connected with your alumni community.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lp-primary" required />
                        <p className="text-xs text-gray-500 mt-1">Hint: Try admin@university.edu or alice@example.com</p>
                    </div>
                    <div className="relative">
                       <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lp-primary" required />
                       <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 text-gray-500">{showPassword ? <IconEyeOff /> : <IconEye />}</button>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="h-4 w-4 text-lp-primary focus:ring-lp-primary border-gray-300 rounded" />
                            <label htmlFor="remember" className="ml-2 text-gray-700">Remember Me</label>
                        </div>
                        <a href="#" className="font-medium text-lp-primary hover:underline">Forgot Password?</a>
                    </div>
                    
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    
                    <button type="submit" className="w-full bg-lp-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors">Login</button>
                </form>

                 <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-500">Or login with</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100"><IconGoogle /><span className="ml-2">Google</span></button>
                    <button className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100"><IconLinkedIn /><span className="ml-2">LinkedIn</span></button>
                </div>
                
                 <p className="mt-8 text-center text-sm text-gray-600">
                    Don’t have an account? <Link to="/signup" className="font-medium text-lp-primary hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;
