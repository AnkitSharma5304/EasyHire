import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setResumeAnalysis } from "@/redux/resumeSlice";
import MatchedJobs from "./MatchedJobs";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const dispatch = useDispatch();
  const { extractedSkills, recommendedJobs } = useSelector(
    (state) => state.resume
  );

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAnalyzed(false);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/upload-resume`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // send auth cookie
        }
      );

      // Directly dispatch backend response
      dispatch(setResumeAnalysis(res.data));
      setAnalyzed(true);

    } catch (error) {
      console.error("Error uploading resume:", error.response?.data || error.message);
      alert("Error analyzing resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-soft-linen px-6 py-12 text-gray-800 animate-fadeIn">
        <div className="max-w-4xl mx-auto bg-white border border-ash-grey rounded-3xl shadow-xl p-8 md:p-10 transition-transform hover:scale-[1.01]">
          <h2 className="text-3xl font-bold mb-4 text-tropical-teal">
            Upload Your Resume
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Upload a PDF resume to extract your skills and receive tailored job recommendations.
          </p>

          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full mb-4 px-4 py-2 bg-white border border-ash-grey text-gray-700 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-tropical-teal file:text-white hover:file:bg-tropical-teal/90 transition"
          />

          <button
            onClick={handleUpload}
            className="w-full bg-gradient-to-r from-vibrant-coral to-tropical-teal hover:from-vibrant-coral/90 hover:to-tropical-teal/90 text-white font-semibold py-3 px-6 rounded-md transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading || !file}
          >
            {loading ? "Analyzing..." : "Upload & Analyze"}
          </button>

          {analyzed && extractedSkills?.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Extracted Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {extractedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-sm font-medium rounded-full bg-tropical-teal/10 text-tropical-teal border border-tropical-teal/20 shadow-sm hover:scale-105 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {analyzed && recommendedJobs?.length > 0 && (
            <div className="mt-12 bg-white border border-ash-grey rounded-2xl p-6 shadow-inner">
              <MatchedJobs />
            </div>
          )}
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }
        `}</style>
      </div>

      <Footer />
    </>
  );
};

export default UploadResume;
