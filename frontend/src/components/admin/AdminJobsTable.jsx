import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setAllAdminJobs } from '@/redux/jobSlice';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const [filterJobs, setFilterJobs] = useState([]);
  const [deletingJobId, setDeletingJobId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    const filteredJobs = allAdminJobs.filter(job => {
      const matchesSearch =
        !searchJobByText ||
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());

      const isCreatedByUser =
        job?.created_by === user._id || job?.created_by?._id === user._id;

      return matchesSearch && isCreatedByUser;
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText, user]);

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingJobId(jobId);
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success('Job deleted successfully');
        // Remove the deleted job from the list
        const updatedJobs = allAdminJobs.filter(job => job._id !== jobId);
        dispatch(setAllAdminJobs(updatedJobs));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete job');
    } finally {
      setDeletingJobId(null);
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-ash-grey shadow bg-white text-gray-800 animate-fadeIn">
      <Table className="min-w-full">
        <TableHeader className="bg-soft-linen border-b border-ash-grey">
          <TableRow>
            <TableHead className="py-3 px-6 text-left font-semibold text-gray-700">Company Name</TableHead>
            <TableHead className="py-3 px-6 text-left font-semibold text-gray-700">Role</TableHead>
            <TableHead className="py-3 px-6 text-left font-semibold text-gray-700">Date</TableHead>
            <TableHead className="py-3 px-6 text-right font-semibold text-gray-700">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-gray-500 italic">
                No jobs found matching your search.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map(job => (
              <TableRow
                key={job._id}
                className="hover:bg-soft-linen/50 transition duration-200 cursor-pointer border-b border-ash-grey"
              >
                <TableCell className="py-3 px-6 font-medium text-gray-800">
                  {job?.company?.name || '—'}
                </TableCell>
                <TableCell className="py-3 px-6 text-gray-600">{job?.title || '—'}</TableCell>
                <TableCell className="py-3 px-6 text-gray-500">
                  {job?.createdAt?.split('T')[0] || '—'}
                </TableCell>
                <TableCell className="py-3 px-6 text-right">
                  <Popover>
                    <PopoverTrigger>
                      <button
                        aria-label="Actions"
                        className="p-2 rounded hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      >
                        <MoreHorizontal size={20} className="text-gray-500" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 bg-white text-gray-800 border border-ash-grey rounded-md shadow-xl space-y-2">
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                        className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-tropical-teal/10 cursor-pointer transition"
                      >
                        <Edit2 className="w-4 h-4 text-tropical-teal" />
                        <span className="text-sm font-medium">Edit Job</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/show`)}
                        className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-tropical-teal/10 cursor-pointer transition"
                      >
                        <Eye className="w-4 h-4 text-tropical-teal" />
                        <span className="text-sm font-medium">Show Job</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-tropical-teal/10 cursor-pointer transition"
                      >
                        <Eye className="w-4 h-4 text-vibrant-coral" />
                        <span className="text-sm font-medium">Applicants</span>
                      </div>
                      <div className="border-t border-ash-grey my-1"></div>
                      <div
                        onClick={() => handleDeleteJob(job._id)}
                        disabled={deletingJobId === job._id}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded hover:bg-red-50 cursor-pointer transition ${
                          deletingJobId === job._id ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <Trash2 className="w-4 h-4 text-vibrant-coral" />
                        <span className="text-sm font-medium text-vibrant-coral">
                          {deletingJobId === job._id ? 'Deleting...' : 'Delete Job'}
                        </span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminJobsTable;
