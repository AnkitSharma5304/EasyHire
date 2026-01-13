import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search, Sparkles } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-soft-linen via-lemon-chiffon to-soft-linen py-20 md:py-28">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-vibrant-coral rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-tropical-teal rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white/80 border border-ash-grey text-tropical-teal text-sm font-semibold tracking-wide shadow-md backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Sparkles className="w-4 h-4" />
            EasyHire – #1 Job Hunt Platform
          </motion.span>
        </motion.div>

        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-gray-800 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="block mb-2">Discover Jobs</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibrant-coral via-tropical-teal to-vibrant-coral">
            That Match Your Skills
          </span>
        </motion.h1>

        <motion.p 
          className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Apply to roles from trusted companies and take the next step in your career.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search jobs by title, company, or location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
              className="w-full px-6 py-4 pr-12 rounded-full bg-white/90 text-gray-800 border-2 border-ash-grey placeholder-gray-400 shadow-lg focus:ring-2 focus:ring-tropical-teal focus:border-tropical-teal focus:outline-none transition-all duration-300 text-base backdrop-blur-sm"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <Button
            onClick={searchJobHandler}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-vibrant-coral to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-base border border-transparent hover:border-red-300"
          >
            <Search className="h-5 w-5 mr-2" /> Search
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          {[
            { number: '10K+', label: 'Active Jobs' },
            { number: '5K+', label: 'Companies' },
            { number: '50K+', label: 'Job Seekers' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="text-3xl font-bold gradient-text">{stat.number}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
