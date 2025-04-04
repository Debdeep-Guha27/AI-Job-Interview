import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Particles } from "@/components/ui/particles";
import UserContext from "@/contexts/UserContext";
import { ArrowLeft } from "lucide-react";
import { useInterview } from "@/hooks/useInterview";

const Chat1 = () => {
  const navigate = useNavigate();
  const { userid } = useParams();
  const { course, setCourse, level, setLevel, setQuestions } =
    useContext(UserContext);
  const { isPending, mutateAsync } = useInterview();

  async function handleClick() {
    const data = await mutateAsync({
      topic: course,
      experience: level,
    });
    console.log(data?.data);
    setQuestions(data?.data);
    navigate(`/InterView/${course}/${level}`);
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center relative">
      {/* Particle Effect */}
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />

      {/* Header */}
      <div
        className="fixed top-5 left-5 border border-white rounded-full p-3 hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <ArrowLeft className="w-6 h-6" />
      </div>

      {/* Course Selection Section */}
      <div className="flex justify-center items-center w-full h-screen px-6">
        <div className="flex flex-col items-center gap-6 bg-gray-900/70 p-8 rounded-2xl shadow-lg max-w-lg w-full">
          <h2 className="text-2xl md:text-3xl font-bold">Select Your Course</h2>

          <div className="flex flex-col md:flex-col items-center gap-6 w-full">
            {/* Course Dropdown */}
            <div className="flex flex-col items-start w-full">
              <label htmlFor="course" className="text-sm text-gray-400 mb-1">
                Enter Course
              </label>
              <input
                type="text"
                placeholder="Course here..."
                className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>

            {/* Level Dropdown */}
            <div className="flex flex-col items-start w-full">
              <label htmlFor="level" className="text-sm text-gray-400 mb-1">
                Choose Difficulty
              </label>
              <select
                id="level"
                className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer w-full"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Medium">Medium</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            
          </div>

          {/* Start Course Button */}
          <button
            className="mt-4 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300 w-full text-center flex items-center justify-center gap-2"
            onClick={handleClick}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              "Start Interview"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat1;
