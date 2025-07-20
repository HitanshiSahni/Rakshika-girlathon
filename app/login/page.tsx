'use client';

import { useState, useEffect } from 'react';
import { authService } from '../../lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Redirect if already logged in
    if (authService.isAuthenticated()) {
      router.push('/');
    }
  }, [router]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const result = await authService.login(formData.email, formData.password);
        if (result.success) {
          router.push('/');
        } else {
          setError(result.error);
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        
        const result = await authService.register(formData.email, formData.password, formData.name);
        if (result.success) {
          router.push('/');
        } else {
          setError(result.error);
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-shield-check-line text-white text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent" style={{fontFamily: 'Pacifico, serif'}}>
            Rakshika
          </h1>
          <p className="text-gray-600 text-sm mt-2">Your Digital Guardian</p>
        </div>

        {/* Form Container */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 shadow-lg">
          {/* Tab Switcher */}
          <div className="flex bg-gray-100 rounded-full p-1 mb-6">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                isLogin 
                  ? 'bg-pink-500 text-white shadow-md' 
                  : 'text-gray-600'
              }`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                !isLogin 
                  ? 'bg-pink-500 text-white shadow-md' 
                  : 'text-gray-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Accounts</h3>
            <div className="space-y-1 text-xs text-blue-700">
              <div>Email: demo@rakshika.com</div>
              <div>Password: demo123</div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-600">
            <p>By continuing, you agree to our</p>
            <div className="flex justify-center space-x-2 mt-1">
              <Link href="/privacy" className="text-pink-600 hover:underline">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms" className="text-pink-600 hover:underline">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="mt-6 text-center">
          <div className="flex justify-center space-x-6 text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <i className="ri-shield-check-line text-green-500"></i>
              <span>Encrypted</span>
            </div>
            <div className="flex items-center space-x-1">
              <i className="ri-lock-line text-green-500"></i>
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <i className="ri-eye-off-line text-green-500"></i>
              <span>Anonymous</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}