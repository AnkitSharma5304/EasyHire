import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  Briefcase,
  MapPin,
  CalendarDays,
  Users,
  Wallet,
  ListChecks
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(app => app.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }]
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(app => app.applicant === user?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <>
      <Navbar />

      <motion.div
        className="w-full min-h-screen px-4 sm:px-6 md:px-8 py-12 bg-soft-linen text-gray-800"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-ash-grey max-w-6xl mx-auto grid md:grid-cols-3 gap-8 md:gap-12"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
        
          <div className="col-span-1 flex flex-col items-center gap-6 p-6 bg-soft-linen rounded-2xl border border-ash-grey/50">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <Avatar className="w-28 h-28 bg-gradient-to-br from-tropical-teal to-ash-grey border-4 border-tropical-teal shadow-xl">
                <AvatarImage src={singleJob?.company?.logo} alt={singleJob?.company?.name} />
                <AvatarFallback className="text-2xl text-white font-bold bg-transparent">
                  {singleJob?.company?.name?.charAt(0) || 'C'}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-800 mb-1">{singleJob?.company?.name}</h1>
              <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <MapPin className="w-4 h-4 text-vibrant-coral" />
                {singleJob?.location}
              </p>
            </div>

            <div className="space-y-2 w-full">
              <Badge className="w-full justify-center text-vibrant-coral font-semibold bg-white border border-vibrant-coral py-2 shadow-sm">
                {singleJob?.position} Position{singleJob?.position > 1 ? 's' : ''}
              </Badge>
              <Badge className="w-full justify-center text-tropical-teal font-semibold bg-white border border-tropical-teal py-2 shadow-sm">
                {singleJob?.jobType}
              </Badge>
              <Badge className="w-full justify-center text-gray-700 font-semibold bg-white border border-ash-grey py-2 shadow-sm">
                ₹ {singleJob?.salary} LPA
              </Badge>
            </div>

            <motion.div 
              whileHover={{ scale: isApplied ? 1 : 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="w-full"
            >
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`w-full rounded-lg px-6 py-3 font-semibold text-white transition-all duration-300 shadow-lg ${
                  isApplied
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-vibrant-coral to-tropical-teal hover:from-vibrant-coral/90 hover:to-tropical-teal/90 hover:shadow-xl'
                }`}
              >
                {isApplied ? '✅ Applied' : 'Apply Now'}
              </Button>
            </motion.div>
          </div>

          
          <div className="col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{singleJob?.title}</h1>
              <div className="text-base text-tropical-teal font-semibold mb-4">
                {singleJob?.company?.name}
              </div>

              {singleJob?.description && (
                <div className="mt-4 p-4 bg-soft-linen/50 rounded-xl border border-ash-grey/30">
                  <h2 className="font-bold text-gray-800 mb-3 text-lg">Job Description</h2>
                  <div className="text-gray-600 leading-relaxed space-y-2">
                    {singleJob?.description?.split('\n').map((line, idx) => (
                      <p key={idx} className="text-base">{line}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-soft-linen/50 rounded-xl border border-ash-grey/30">
              <InfoRow icon={<Briefcase className="text-tropical-teal" size={20} />} title="Role" value={singleJob?.title} />
              <InfoRow icon={<MapPin className="text-tropical-teal" size={20} />} title="Location" value={singleJob?.location} />
              <InfoRow icon={<Wallet className="text-tropical-teal" size={20} />} title="Salary" value={`₹ ${singleJob?.salary} LPA`} />
              <InfoRow icon={<Users className="text-tropical-teal" size={20} />} title="Applicants" value={`${singleJob?.applications?.length || 0}`} />
              <InfoRow icon={<CalendarDays className="text-tropical-teal" size={20} />} title="Posted On" value={singleJob?.createdAt?.split('T')[0]} />
              <InfoRow icon={<ListChecks className="text-tropical-teal" size={20} />} title="Experience" value={`${singleJob?.experienceLevel} years`} />
            </div>

            {singleJob?.requirements?.length > 0 && (
              <div className="p-4 bg-soft-linen/50 rounded-xl border border-ash-grey/30">
                <h2 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-2">
                  <ListChecks size={20} className="text-tropical-teal" /> Requirements
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {singleJob.requirements.map((req, index) => (
                    <li key={index} className="text-base">{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </>
  );
};

const InfoRow = ({ icon, title, value }) => (
  <div className="flex items-start gap-3 p-2 hover:bg-gray-800 rounded-lg transition-colors">
    <div className="mt-0.5">{icon}</div>
    <div>
      <h2 className="font-semibold text-gray-200 text-sm">{title}</h2>
      <p className="text-gray-400 font-medium">{value}</p>
    </div>
  </div>
);

export default JobDescription;
