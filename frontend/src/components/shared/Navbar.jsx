import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  };

  const NavLinks = () => (
    <div className="flex flex-col space-y-3">
      {user && user.role === 'recruiter' ? (
        <>
          <Link 
            to="/admin/companies" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-lemon-chiffon transition-colors duration-200 font-medium"
          >
            Companies
          </Link>
          <Link 
            to="/admin/jobs" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-lemon-chiffon transition-colors duration-200 font-medium"
          >
            Jobs
          </Link>
        </>
      ) : (
        <>
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-lemon-chiffon transition-colors duration-200 font-medium"
          >
            Home
          </Link>
          <Link 
            to="/resume/upload" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-lemon-chiffon transition-colors duration-200 font-medium"
          >
            Upload Resume
          </Link>
          <Link 
            to="/jobs" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-lemon-chiffon transition-colors duration-200 font-medium"
          >
            Jobs
          </Link>
          <Link 
            to="/browse" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-lemon-chiffon transition-colors duration-200 font-medium"
          >
            Browse
          </Link>
        </>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ash-grey bg-tropical-teal/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
       
        <Link 
          to="/" 
          className="text-2xl font-extrabold tracking-wide transition-all duration-300 hover:scale-105"
        >
          <span className="text-white">Easy</span><span className="text-lemon-chiffon">Hire</span>
        </Link>

        
        <nav className="hidden md:flex items-center space-x-8 font-medium">
          {user && user.role === 'recruiter' ? (
            <>
              <Link 
                to="/admin/companies" 
                className="text-gray-700 hover:text-tropical-teal transition-colors duration-200 relative group"
              >
                Companies
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tropical-teal transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                to="/admin/jobs" 
                className="text-gray-700 hover:text-tropical-teal transition-colors duration-200 relative group"
              >
                Jobs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tropical-teal transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/" 
                className="text-gray-700 hover:text-tropical-teal transition-colors duration-200 relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tropical-teal transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                to="/resume/upload" 
                className="text-gray-700 hover:text-tropical-teal transition-colors duration-200 relative group"
              >
                Upload Resume
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tropical-teal transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                to="/jobs" 
                className="text-gray-700 hover:text-tropical-teal transition-colors duration-200 relative group"
              >
                Jobs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tropical-teal transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                to="/browse" 
                className="text-gray-700 hover:text-tropical-teal transition-colors duration-200 relative group"
              >
                Browse
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tropical-teal transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </>
          )}
        </nav>

 
        <div
          className="md:hidden text-gray-700 cursor-pointer hover:text-tropical-teal transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </div>

     
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  className="border-tropical-teal text-tropical-teal hover:bg-tropical-teal/10 hover:border-tropical-teal transition-all duration-200"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-vibrant-coral to-tropical-teal hover:from-vibrant-coral/90 hover:to-tropical-teal/90 text-white shadow-md hover:shadow-lg transition-all duration-200">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-ash-grey hover:border-tropical-teal hover:shadow-lg transition-all duration-200">
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl text-gray-800 animate-scale-in">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <Avatar className="border-2 border-ash-grey">
                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio || 'No bio'}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {user.role === 'student' && (
                    <Link to="/profile" className="block">
                      <div className="flex items-center gap-2 text-tropical-teal hover:text-tropical-teal hover:bg-tropical-teal/10 p-2 rounded-lg transition-all duration-200 cursor-pointer">
                        <User2 size={18} />
                        <span className="font-medium">View Profile</span>
                      </div>
                    </Link>
                  )}
                  <div 
                    onClick={logoutHandler}
                    className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    <LogOut size={18} />
                    <span className="font-medium">Logout</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

     
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-4 pb-4 bg-white border-t border-gray-200 space-y-3 overflow-hidden"
          >
          <NavLinks />
          {!user ? (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full border border-tropical-teal text-tropical-teal hover:bg-tropical-teal/10">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-vibrant-coral to-tropical-teal hover:from-vibrant-coral/90 hover:to-tropical-teal/90 text-white">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Button 
              onClick={() => { logoutHandler(); setMobileMenuOpen(false); }} 
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </Button>
          )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
