import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-soft-linen text-gray-800">
      <Navbar />

      <section className="px-4 sm:px-6 lg:px-16 pt-8 pb-12 bg-soft-linen">
        <HeroSection />
      </section>

      <section className="px-4 sm:px-6 lg:px-16 py-16 bg-white/50">
        <CategoryCarousel />
      </section>

      <section className="px-4 sm:px-6 lg:px-16 py-20 bg-soft-linen">
        <LatestJobs />
      </section>

      <Footer />
    </div>
  );
};

export default Home;
