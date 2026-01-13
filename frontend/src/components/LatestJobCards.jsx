import React from 'react';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ListChecks } from 'lucide-react'; 

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/description/${job._id}`)}
      whileHover={{ scale: 1.02, y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative p-6 bg-white border border-ash-grey hover:border-vibrant-coral rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-soft-linen/0 to-lemon-chiffon/0 group-hover:from-soft-linen/50 group-hover:to-lemon-chiffon/30 transition-all duration-300 pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-14 h-14 border-2 border-ash-grey/30 shadow-md group-hover:shadow-lg transition-shadow">
            <AvatarImage src={job?.company?.logo} alt="logo" />
            <AvatarFallback className="bg-gradient-to-br from-tropical-teal to-ash-grey text-white font-bold text-lg">
              {job?.company?.name?.charAt(0) || 'C'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-tropical-teal font-bold text-lg group-hover:text-vibrant-coral transition-colors">
              {job?.company?.name || 'Unknown Company'}
            </h2>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4 text-vibrant-coral" />
              {job?.location || 'India'}
            </p>
          </div>
        </div>

        <div className="mt-2 mb-4">
          <h1 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-vibrant-coral transition-colors">
            {job?.title}
          </h1>
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {job?.description}
          </p>
        </div>

        {job?.requirements?.length > 0 && (
          <div className="mt-4 mb-4 p-3 bg-soft-linen rounded-lg border border-ash-grey/30">
            <p className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
              <ListChecks className="w-4 h-4 text-tropical-teal" />
              Key Requirements:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {job.requirements.slice(0, 3).map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <Badge className="bg-white text-vibrant-coral border border-vibrant-coral font-semibold rounded-full px-3 py-1 hover:bg-vibrant-coral hover:text-white transition-colors shadow-sm">
            {job?.position} Position{job?.position > 1 ? 's' : ''}
          </Badge>
          <Badge className="bg-white text-tropical-teal border border-tropical-teal font-semibold rounded-full px-3 py-1 hover:bg-tropical-teal hover:text-white transition-colors shadow-sm">
            {job?.jobType}
          </Badge>
          <Badge className="bg-white text-gray-700 border border-ash-grey font-semibold rounded-full px-3 py-1 hover:bg-ash-grey hover:text-white transition-colors shadow-sm">
            ₹ {job?.salary} LPA
          </Badge>
        </div>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
