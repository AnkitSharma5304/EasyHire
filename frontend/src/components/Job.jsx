import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Bookmark, MapPin } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <motion.div 
      className="group relative p-6 rounded-2xl bg-white border border-ash-grey text-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-soft-linen/0 to-lemon-chiffon/0 group-hover:from-soft-linen/50 group-hover:to-lemon-chiffon/30 transition-all duration-300 pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="px-3 py-1 bg-soft-linen text-gray-700 rounded-full font-medium">
            {daysAgoFunction(job?.createdAt) === 0
              ? 'Posted Today'
              : `${daysAgoFunction(job?.createdAt)} days ago`}
          </span>
          <Button
            variant="ghost"
            className="rounded-full hover:text-vibrant-coral text-gray-400 hover:bg-lemon-chiffon/50 transition-all duration-200"
            size="icon"
          >
            <Bookmark size={18} />
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-5">
          <Avatar className="bg-white border-2 border-ash-grey shadow-md group-hover:shadow-lg transition-shadow">
            <AvatarImage src={job?.company?.logo} alt="logo" />
          </Avatar>
          <div>
            <h2 className="text-md font-bold text-gray-900 group-hover:text-vibrant-coral transition-colors">
              {job?.company?.name}
            </h2>
            <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4 text-vibrant-coral" />
              {job?.location || 'Location not specified'}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-vibrant-coral transition-colors">
            {job?.title}
          </h1>
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{job?.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="text-vibrant-coral font-semibold bg-white border border-vibrant-coral hover:bg-vibrant-coral hover:text-white transition-colors">
            {job?.position} {job?.position > 1 ? 'Positions' : 'Position'}
          </Badge>
          <Badge className="text-tropical-teal font-semibold bg-white border border-tropical-teal hover:bg-tropical-teal hover:text-white transition-colors">
            {job?.jobType}
          </Badge>
          <Badge className="text-gray-700 font-semibold bg-white border border-ash-grey hover:bg-ash-grey hover:text-white transition-colors">
            ₹ {job?.salary} LPA
          </Badge>
        </div>

        {job?.requirements?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {job.requirements.slice(0, 3).map((req, index) => (
              <Badge
                key={index}
                className="bg-soft-linen text-gray-700 border border-ash-grey/30 rounded-full text-xs font-medium hover:bg-ash-grey hover:text-white transition-colors"
              >
                {req.trim()}
              </Badge>
            ))}
            {job.requirements.length > 3 && (
              <Badge className="bg-soft-linen text-gray-600 border border-ash-grey/30 rounded-full text-xs font-medium">
                +{job.requirements.length - 3} more
              </Badge>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            onClick={() => navigate(`/description/${job?._id}`)}
            className="flex-1 bg-gradient-to-r from-vibrant-coral to-tropical-teal hover:from-vibrant-coral/90 hover:to-tropical-teal/90 text-white px-5 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-semibold"
          >
            View Details
          </Button>
          <Button
            variant="outline"
            className="border-ash-grey text-gray-600 hover:bg-soft-linen hover:border-ash-grey rounded-lg transition-all duration-200 font-semibold"
          >
            Save
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Job;
