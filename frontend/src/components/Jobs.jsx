import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const query = searchedQuery.toLowerCase();
      const filteredJobs = allJobs.filter((job) => {
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
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <>
    
      <Navbar />

     
      <div className="min-h-screen bg-soft-linen text-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <motion.div 
            className="flex flex-col lg:flex-row gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.aside 
              className="lg:w-1/4 w-full bg-white border border-ash-grey rounded-2xl p-6 shadow-lg h-fit sticky top-24"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FilterCard />
            </motion.aside>

            <main className="flex-1">
              {filterJobs.length === 0 ? (
                <motion.div 
                  className="text-center text-gray-500 text-xl mt-16 py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-4xl mb-3">🔍</div>
                  <p>No jobs found matching your criteria.</p>
                  <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
                </motion.div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  {filterJobs.map((job, index) => (
                    <motion.div
                      key={job?._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      exit={{ opacity: 0 }}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </main>
          </motion.div>
        </div>
      </div>

   
      <Footer />
    </>
  );
};

export default Jobs;
