import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import { motion } from 'framer-motion';

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-soft-linen text-gray-800 flex flex-col">
      <Navbar />

      <main className="flex-grow py-10">
        <motion.div 
          className="max-w-4xl mx-auto bg-white border border-ash-grey rounded-3xl shadow-xl p-8 sm:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-8">
            <div className="flex items-center gap-6 mb-6 sm:mb-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Avatar className="h-32 w-32 border-4 border-tropical-teal shadow-lg">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      'https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg'
                    }
                    alt="profile"
                    className="object-cover"
                  />
                </Avatar>
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{user?.fullname}</h1>
                <p className="text-gray-600 italic">{user?.profile?.bio || 'No bio available'}</p>
              </div>
            </div>

            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="flex items-center gap-2 border-vibrant-coral text-vibrant-coral hover:bg-vibrant-coral hover:text-white transition-all duration-300 shadow-md hover:shadow-lg bg-transparent"
            >
              <Pen size={18} />
              Edit Profile
            </Button>
          </div>

          <div className="space-y-8">
            <div className="p-6 bg-soft-linen/50 rounded-xl border border-ash-grey/30">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Mail className="text-tropical-teal" size={20} />
                Contact Information
              </h2>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-3">
                  <Mail className="text-tropical-teal" size={18} />
                  <span className="font-medium">{user?.email || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Contact className="text-tropical-teal" size={18} />
                  <span className="font-medium">{user?.phoneNumber || 'Not provided'}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-soft-linen/50 rounded-xl border border-ash-grey/30">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {user?.profile?.skills?.length > 0 ? (
                  user.profile.skills.map((skill, idx) => (
                    <Badge
                      key={idx}
                      className="px-4 py-2 rounded-full bg-white text-tropical-teal font-semibold border border-tropical-teal hover:bg-tropical-teal hover:text-white transition-all shadow-sm"
                    >
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500 italic">No skills listed</span>
                )}
              </div>
            </div>

            <div className="p-6 bg-soft-linen/30 rounded-xl border border-ash-grey/30">
              <Label className="text-xl font-bold text-gray-800 mb-4 block">Resume</Label>
              <div className="mt-2">
                {user?.profile?.resume ? (
                  <div className="flex gap-4 items-center flex-wrap">
                    <a
                      href={user.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gradient-to-r from-vibrant-coral to-tropical-teal text-white rounded-lg hover:from-vibrant-coral/90 hover:to-tropical-teal/90 transition-colors font-medium shadow-md hover:shadow-lg"
                    >
                      View Resume
                    </a>
                    <a
                      href={user.profile.resume}
                      download={user.profile.resumeOriginalName}
                      className="px-4 py-2 bg-white border-2 border-ash-grey text-gray-700 rounded-lg hover:bg-soft-linen transition-colors font-medium"
                    >
                      Download
                    </a>
                    {user.profile.resumeOriginalName && (
                      <p className="text-sm text-gray-600">
                        {user.profile.resumeOriginalName}
                      </p>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-500 italic">Not available</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto mt-8 bg-white rounded-3xl p-8 shadow-xl border border-ash-grey"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Applied Jobs</h1>
          <AppliedJobTable />
        </motion.div>
      </main>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
};

export default Profile;
