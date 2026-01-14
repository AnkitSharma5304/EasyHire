import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search, Sparkles, Briefcase, Users, Building2 } from 'lucide-react';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-soft-linen via-lemon-chiffon to-soft-linen pt-24 pb-16 md:pt-32 md:pb-24">
      
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-tropical-teal/10 rounded-full blur-[80px] mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-vibrant-coral/10 rounded-full blur-[80px] mix-blend-multiply"></div>
      </div>

      {/* Floating Icons */}
      <motion.div 
        animate={{ y: [0, -15, 0] }} 
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute top-20 left-[5%] opacity-10 hidden lg:block pointer-events-none"
      >
        <Briefcase size={64} className="text-tropical-teal" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 15, 0] }} 
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 right-[5%] opacity-10 hidden lg:block pointer-events-none"
      >
        <Search size={64} className="text-vibrant-coral" />
      </motion.div>

      <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-ash-grey text-tropical-teal text-sm font-bold tracking-wide shadow-sm backdrop-blur-sm">
              <Sparkles className="w-4 h-4 fill-current" />
              #1 Job Hunt Platform
            </span>
          </motion.div>

          {/* Heading - Cleaned up (No underline) */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-800 tracking-tight"
          >
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-tropical-teal to-teal-600">Dream Job</span> <br className="hidden sm:block"/>
            <span className="block mt-1">
              Match Your Skills
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl mx-auto text-base sm:text-lg text-gray-700 font-medium mb-10 leading-relaxed"
          >
            Connecting thousands of job seekers with top-tier companies. <br className="hidden sm:block"/>
            Your next big career move is just one search away.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto bg-white p-2 rounded-full shadow-xl border border-ash-grey ring-4 ring-white/50"
          >
            <div className="relative flex-1 w-full sm:w-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Job title, keywords, or company..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                className="w-full pl-12 pr-4 py-3 rounded-full text-gray-800 font-medium placeholder-gray-400 outline-none bg-transparent"
              />
            </div>
            <Button
              onClick={searchJobHandler}
              className="w-full sm:w-auto px-8 py-6 rounded-full bg-gradient-to-r from-vibrant-coral to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Search
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 md:gap-8 mt-14 max-w-3xl mx-auto"
          >
            {[
              { number: '10K+', label: 'Active Jobs', icon: Briefcase, color: "text-tropical-teal" },
              { number: '500+', label: 'Companies', icon: Building2, color: "text-vibrant-coral" },
              { number: '1M+', label: 'Happy Users', icon: Users, color: "text-purple-600" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center p-4 rounded-xl bg-white/60 border border-white/50 shadow-sm backdrop-blur-md"
              >
                <stat.icon className={`w-6 h-6 mb-2 ${stat.color}`} />
                <div className="text-xl sm:text-2xl font-bold text-gray-800">{stat.number}</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;