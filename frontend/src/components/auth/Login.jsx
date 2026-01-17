import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { setLoading, setUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constant';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import Navbar from '../shared/Navbar';
import { motion } from 'framer-motion';

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '', role: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post("https://easyhire-t5qa.onrender.com/api/v1/user/login", input, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.data.success) {
        
        localStorage.setItem('token', res.data.user.token);
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-soft-linen font-sans">
      <Navbar />
      <div className="flex flex-col md:flex-row min-h-[85vh]">
        <motion.div 
          className="md:w-1/2 bg-gradient-to-br from-vibrant-coral to-tropical-teal flex flex-col justify-center items-center px-10 py-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-lemon-chiffon rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="relative z-10">
            <Link to="/" className="inline-block mb-6">
              <h1 className="text-4xl font-extrabold tracking-wide text-white">
                Easy<span className="text-lemon-chiffon">Hire</span>
              </h1>
            </Link>
            <div className="text-center max-w-md mb-8 space-y-4">
              <p className="text-3xl font-bold text-white leading-tight">
                Build Careers. Hire Smarter.
              </p>
              <p className="text-xl font-semibold text-lemon-chiffon leading-snug">
                Your next job or hire is just a click away.
              </p>
              <p className="text-base text-white/90 leading-relaxed">
                EasyHire helps you to land the right job or discover top talent — fast, simple, and effective.
              </p>
            </div>

            <motion.img
              src="/career-growth.png"
              alt="Career illustration"
              className="w-[400px] max-w-full h-auto rounded-2xl shadow-2xl object-cover mx-auto border-4 border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            />
          </div>
        </motion.div>

        <div className="md:w-1/2 flex justify-center items-center px-6 py-10">
          <motion.form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-ash-grey"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
              Welcome Back
            </h2>
            <p className="text-center text-gray-600 mb-8">Sign in to continue your journey</p>

            <div className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-gray-700 font-semibold mb-2 block">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={handleChange}
                  placeholder="example@domain.com"
                  required
                  className="h-12 bg-white border-ash-grey text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-tropical-teal focus:border-tropical-teal transition-all"
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700 font-semibold mb-2 block">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={input.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="h-12 bg-white border-ash-grey text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-tropical-teal focus:border-tropical-teal transition-all pr-10"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-vibrant-coral hover:text-vibrant-coral/80 hover:underline font-medium transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="flex justify-center gap-8 py-2">
                {['student', 'recruiter'].map((role) => (
                  <div key={role} className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      id={`role-${role}`}
                      name="role"
                      value={role}
                      checked={input.role === role}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-4 h-4 accent-vibrant-coral cursor-pointer bg-white border-ash-grey"
                    />
                    <Label htmlFor={`role-${role}`} className="capitalize text-gray-700 font-medium cursor-pointer">
                      {role}
                    </Label>
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-vibrant-coral to-tropical-teal hover:from-vibrant-coral/90 hover:to-tropical-teal/90 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex justify-center items-center gap-2"
                disabled={loading}
              >
                {loading && <Loader2 className="animate-spin h-5 w-5" />}
                {loading ? 'Please wait...' : 'Login'}
              </Button>

              <p className="text-sm text-center text-gray-600 pt-2">
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="text-vibrant-coral hover:text-vibrant-coral/80 hover:underline font-semibold transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Login;
