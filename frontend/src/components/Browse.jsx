import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Input } from './ui/input';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Browse = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [localSearch, setLocalSearch] = useState(searchedQuery || '');
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localSearch) {
      const query = localSearch.toLowerCase();
      const filtered = allJobs.filter((job) => {
        const companyName = job.company?.name?.toLowerCase() || '';
        return (
          job.title?.toLowerCase().includes(query) ||
          job.description?.toLowerCase().includes(query) ||
          job.location?.toLowerCase().includes(query) ||
          job.jobType?.toLowerCase().includes(query) ||
          companyName.includes(query) ||
          job.requirements?.some((req) => req.toLowerCase().includes(query))
        );
      });
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [allJobs, localSearch]);

  useEffect(() => {
    setLocalSearch(searchedQuery || '');
  }, [searchedQuery]);

  const handleClearSearch = () => {
    setLocalSearch('');
    dispatch(setSearchedQuery(''));
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-soft-linen text-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-bold text-3xl md:text-4xl text-gray-800 mb-6 text-center">
              <span className="text-vibrant-coral">Search Results</span>
            </h1>
            
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by job title, company, location, or skills..."
                  value={localSearch}
                  onChange={(e) => {
                    setLocalSearch(e.target.value);
                    dispatch(setSearchedQuery(e.target.value));
                  }}
                  className="w-full pl-12 pr-12 h-14 text-base bg-white border-2 border-ash-grey text-gray-800 focus:ring-2 focus:ring-tropical-teal focus:border-tropical-teal rounded-lg shadow-md placeholder-gray-500"
                />
                {localSearch && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              {localSearch && (
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Found {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} matching "{localSearch}"
                </p>
              )}
            </div>
          </motion.div>

          {filteredJobs.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">No jobs found</h2>
              <p className="text-gray-500 mb-6">
                {localSearch
                  ? `Try adjusting your search terms or clearing the search to see all jobs.`
                  : 'No jobs available at the moment.'}
              </p>
              {localSearch && (
                <button
                  onClick={handleClearSearch}
                  className="px-6 py-2 bg-vibrant-coral text-white rounded-lg hover:bg-vibrant-coral/90 transition-colors"
                >
                  Clear Search
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Browse;
