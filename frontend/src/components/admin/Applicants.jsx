import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${id}/applicants`, {
          withCredentials: true,
        });
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.error('Failed to fetch applicants:', error);
      }
    };
    fetchAllApplicants();
  }, [id, dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-soft-linen text-gray-800">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 animate-fadeIn transition-all">
        <div className="bg-white border border-ash-grey shadow-xl rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Applicants</h1>
            <span className="text-vibrant-coral text-lg font-semibold bg-vibrant-coral/10 px-3 py-1 rounded-full">
              {applicants?.applications?.length ?? 0}
            </span>
          </div>

          <ApplicantsTable />
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Applicants;
