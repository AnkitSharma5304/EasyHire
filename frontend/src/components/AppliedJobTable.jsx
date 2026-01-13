import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const userId = localStorage.getItem("userId");

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto rounded-2xl border border-ash-grey shadow-lg bg-white text-gray-800 p-6 animate-fadeIn">
      <Table>
        <TableCaption className="text-sm text-gray-500 italic">
          A list of your applied jobs.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-soft-linen text-gray-700 border-b border-ash-grey">
            <TableHead className="font-semibold text-gray-700">📅 Date</TableHead>
            <TableHead className="font-semibold text-gray-700">🧑‍💻 Job Role</TableHead>
            <TableHead className="font-semibold text-gray-700">🏢 Company</TableHead>
            <TableHead className="text-right font-semibold text-gray-700">Status & Chat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500 italic">
                You haven't applied to any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow
                key={appliedJob._id}
                className="hover:bg-soft-linen/50 transition duration-200 border-b border-ash-grey/30"
              >
                <TableCell className="text-gray-600">
                  {appliedJob?.createdAt?.split('T')[0]}
                </TableCell>
                <TableCell className="font-semibold text-gray-800">
                  {appliedJob.job?.title}
                </TableCell>
                <TableCell className="text-gray-600">
                  {appliedJob.job?.company?.name}
                </TableCell>
                <TableCell className="text-right flex justify-end items-center gap-3">
                  <Badge
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      appliedJob.status === 'rejected'
                        ? 'bg-red-50 text-vibrant-coral border border-vibrant-coral'
                        : appliedJob.status === 'pending'
                        ? 'bg-lemon-chiffon text-gray-800 border border-ash-grey'
                        : 'bg-tropical-teal/10 text-tropical-teal border border-tropical-teal'
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                  {appliedJob.job?.company?.userId ? (
                    <button
                      onClick={() =>
                        navigate(`/chat/${appliedJob.job._id}/${appliedJob.job.company.userId}/${userId}`)
                      }
                      className="text-xs bg-tropical-teal hover:bg-tropical-teal/90 text-white px-3 py-1.5 rounded-md font-medium shadow-sm transition"
                    >
                       Chat
                    </button>
                  ) : (
                    <span className="text-xs text-gray-500 italic">No recruiter</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

   
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AppliedJobTable;
