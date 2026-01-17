import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice'; // ✅ Added setUser here
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = e => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      dispatch(setLoading(true));
      
      // ✅ Hardcoded URL is correct
      const res = await axios.post("https://easyhire-t5qa.onrender.com/api/v1/user/register", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        // ✅ 1. Save the Token (Crucial for 401 fix)
        localStorage.setItem('token', res.data.token);

        // ✅ 2. Update Redux so the app knows we are logged in
        dispatch(setUser(res.data.user));

        toast.success(res.data.message);
        
        // ✅ 3. Go straight to Home (Skip Login Page)
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-soft-linen">
      <Navbar />
      <div className="flex items-center justify-center min-h-[85vh] px-4 py-10">
        <motion.div 
          className="flex w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden border border-ash-grey"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* ... (Rest of your UI code remains exactly the same) ... */}
          <motion.div 
            className="w-1/2 bg-gradient-to-br from-vibrant-coral to-tropical-teal p-8 hidden md:flex flex-col items-center justify-center relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-lemon-chiffon rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            <div className="relative z-10">
              <Link to="/" className="inline-block mb-6">
                <h1 className="text-4xl font-extrabold tracking-wide text-white">
                  Easy<span className="text-lemon-chiffon">Hire</span>
                </h1>
              </Link>
              <motion.img
                src="/career-growth.png"
                alt="EasyHire"
                className="w-[350px] h-auto rounded-xl shadow-xl mb-6 border-4 border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              />
              <div className="text-center text-white text-lg leading-relaxed px-2 space-y-2">
                <p className="font-bold text-2xl">Build Careers. Hire Smarter.</p>
                <p className="text-white/90">Your next job or hire is just a click away.</p>
                <p className="text-lemon-chiffon font-medium">
                  EasyHire helps you to land the right job or discover top talent — fast, simple, and effective.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={submitHandler}
            className="w-full md:w-1/2 p-8 overflow-y-auto max-h-[85vh]"
            encType="multipart/form-data"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
              Create Your Account
            </h1>
            <p className="text-center text-gray-600 mb-8">Join thousands of job seekers and recruiters</p>

            <div className="space-y-5">
              <div>
                <Label htmlFor="fullname" className="text-gray-700 font-semibold mb-2 block">Full Name</Label>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  placeholder="John Doe"
                  required
                  className="h-12 bg-white border-ash-grey text-gray-800 focus:ring-2 focus:ring-tropical-teal focus:border-tropical-teal transition-all"
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 font-semibold mb-2 block">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="example@domain.com"
                  required
                  className="h-12 bg-white border-ash-grey text-gray-800 focus:ring-2 focus:ring-tropical-teal focus:border-tropical-teal transition-all"
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="phoneNumber" className="text-gray-700 font-semibold mb-2 block">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  pattern="[0-9]{10}"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  placeholder="9876543210"
                  required
                  className="h-12 bg-white border-ash-grey text-gray-800 focus:ring-2 focus:ring-tropical-teal focus:border-tropical-teal transition-all"
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
                    onChange={changeEventHandler}
                    placeholder="••••••••"
                    required
                    className="h-12 bg-white border-ash-grey text-gray-800 focus:ring-2 focus:ring-tropical-teal focus:border-tropical-teal transition-all pr-10"
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
                {/* Password strength indicators */}
                <div className="mt-3 p-3 bg-soft-linen/50 rounded-lg space-y-1.5 text-xs">
                  <p className={`flex items-center gap-2 ${input.password.length >= 8 ? 'text-tropical-teal' : 'text-gray-500'}`}>
                    <span>{input.password.length >= 8 ? '✓' : '○'}</span> At least 8 characters
                  </p>
                  <p className={`flex items-center gap-2 ${/[A-Z]/.test(input.password) ? 'text-green-400' : 'text-gray-400'}`}>
                    <span>{/[A-Z]/.test(input.password) ? '✓' : '○'}</span> One uppercase letter
                  </p>
                  <p className={`flex items-center gap-2 ${/[a-z]/.test(input.password) ? 'text-green-400' : 'text-gray-400'}`}>
                    <span>{/[a-z]/.test(input.password) ? '✓' : '○'}</span> One lowercase letter
                  </p>
                  <p className={`flex items-center gap-2 ${/\d/.test(input.password) ? 'text-green-400' : 'text-gray-400'}`}>
                    <span>{/\d/.test(input.password) ? '✓' : '○'}</span> One number
                  </p>
                  <p className={`flex items-center gap-2 ${/[@$!%*?&#]/.test(input.password) ? 'text-green-400' : 'text-gray-400'}`}>
                    <span>{/[@$!%*?&#]/.test(input.password) ? '✓' : '○'}</span> One special character
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-8 py-2">
                {['student', 'recruiter'].map(role => (
                  <div key={role} className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      id={`role-${role}`}
                      name="role"
                      value={role}
                      checked={input.role === role}
                      onChange={changeEventHandler}
                      required
                      className="w-4 h-4 accent-tropical-teal cursor-pointer bg-white border-ash-grey"
                      disabled={loading}
                    />
                    <Label htmlFor={`role-${role}`} className="capitalize text-gray-700 font-medium cursor-pointer">
                      {role}
                    </Label>
                  </div>
                ))}
              </div>

              <div>
                <Label htmlFor="file" className="text-gray-700 font-semibold mb-2 block">Profile Picture</Label>
                <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-ash-grey">
                  <label
                    htmlFor="file"
                    className="cursor-pointer px-4 py-2 bg-tropical-teal text-white rounded-lg hover:bg-tropical-teal/90 transition-colors font-medium"
                  >
                    Choose File
                  </label>
                  <span className="text-sm text-gray-700 flex-1 truncate">
                    {input.file ? input.file.name : 'No file selected'}
                  </span>
                </div>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="hidden"
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-vibrant-coral to-tropical-teal hover:from-vibrant-coral/90 hover:to-tropical-teal/90 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex justify-center items-center gap-2"
                disabled={loading}
              >
                {loading && <Loader2 className="animate-spin h-5 w-5" />}
                {loading ? 'Please wait...' : 'Sign up'}
              </Button>

              <p className="text-sm text-center text-gray-500 pt-2">
                Already have an account?{' '}
                <Link to="/login" className="text-tropical-teal hover:text-tropical-teal/80 hover:underline font-semibold transition-colors">
                  Login
                </Link>
              </p>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;