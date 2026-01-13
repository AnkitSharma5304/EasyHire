import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ['Accepted', 'Rejected'];

const statusColors = {
  Accepted: 'bg-green-100 text-green-700 hover:bg-green-200',
  Rejected: 'bg-red-100 text-red-700 hover:bg-red-200',
};

const badgeColors = {
  Accepted: 'bg-tropical-teal text-white',
  Rejected: 'bg-vibrant-coral text-white',
};

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id, currentStatus) => {
    if (['Accepted', 'Rejected'].includes(currentStatus)) {
      toast.warning('Status is already finalized and cannot be changed.');
      return;
    }

    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
      if (res.data.success) {
        toast.success(res.data.message);
        // Optionally: trigger refresh or Redux update
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-ash-grey bg-white shadow-md animate-fadeIn">
      <Table>
        <TableCaption className="text-left text-gray-500 text-sm px-4 py-2">
          A list of your recent applicants.
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-soft-linen text-gray-700 font-semibold text-sm border-b border-ash-grey">
            <TableHead className="px-4 py-3 text-gray-700">Full Name</TableHead>
            <TableHead className="px-4 py-3 text-gray-700">Email</TableHead>
            <TableHead className="px-4 py-3 text-gray-700">Contact</TableHead>
            <TableHead className="px-4 py-3 text-gray-700">Resume</TableHead>
            <TableHead className="px-4 py-3 text-gray-700">Applied Date</TableHead>
            <TableHead className="px-4 py-3 text-gray-700">Status</TableHead>
            <TableHead className="px-4 py-3 text-right text-gray-700">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.applications?.length ? (
            applicants.applications.map((item) => {
              const jobId = typeof item?.job === 'string' ? item.job : item?.job?._id;
              const applicantId = item?.applicant?._id;
              const recruiterId = localStorage.getItem('userId');
              const currentStatus = item?.status;

              const displayStatus =
                currentStatus?.toLowerCase() === 'accepted'
                  ? 'Accepted'
                  : currentStatus?.toLowerCase() === 'rejected'
                  ? 'Rejected'
                  : null;

              return (
                <TableRow key={item._id} className="hover:bg-soft-linen/50 text-gray-800 transition border-ash-grey">
                  <TableCell className="px-4 py-3 font-medium text-gray-800">{item?.applicant?.fullname}</TableCell>
                  <TableCell className="px-4 py-3 break-words max-w-xs text-gray-600">{item?.applicant?.email}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600">{item?.applicant?.phoneNumber}</TableCell>
                  <TableCell className="px-4 py-3">
                    {item.applicant?.profile?.resume ? (
                      <a
                        className="text-tropical-teal hover:underline"
                        href={item.applicant.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={item.applicant.profile.resumeOriginalName}
                      >
                        {item.applicant.profile.resumeOriginalName}
                      </a>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500">
                    {item?.applicant?.createdAt
                      ? new Date(item.applicant.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    {displayStatus ? (
                      <span
                        className={`px-3 py-1 text-sm rounded-full font-semibold ${badgeColors[displayStatus]}`}
                      >
                        {displayStatus}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            className="p-1 text-gray-500 hover:text-tropical-teal transition disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="More actions"
                            disabled={displayStatus === 'Accepted' || displayStatus === 'Rejected'}
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-40 bg-white border border-ash-grey rounded-md shadow-lg p-2"
                          align="end"
                        >
                          {shortlistingStatus.map((status) => (
                            <div
                              key={status}
                              onClick={() => statusHandler(status, item._id, displayStatus)}
                              className={`px-3 py-2 text-sm font-medium rounded-md cursor-pointer text-center transition ${statusColors[status]}`}
                            >
                              {status}
                            </div>
                          ))}
                        </PopoverContent>
                      </Popover>

                      <button
                        className="px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-vibrant-coral to-tropical-teal text-white rounded hover:opacity-90 transition"
                        onClick={() => {
                          if (jobId && recruiterId && applicantId) {
                            window.location.href = `/chat/${jobId}/${recruiterId}/${applicantId}`;
                          } else {
                            toast.error('Missing job, recruiter, or applicant ID');
                          }
                        }}
                      >
                        Chat
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-gray-400">
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ApplicantsTable;
