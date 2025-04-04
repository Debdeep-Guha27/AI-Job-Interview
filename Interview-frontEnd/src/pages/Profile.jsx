import Card from "@/components/profileComponent/Card";
import { Particles } from "@/components/ui/particles";
import { ArrowLeft, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedInterviews = JSON.parse(localStorage.getItem("interviews")) || [];
    setInterviews(storedInterviews);
  }, []);

  const [expandedInterview, setExpandedInterview] = useState(null);

  // Delete an interview
  const handleDelete = (index) => {
    const updatedInterviews = interviews.filter((_, i) => i !== index);
    setInterviews(updatedInterviews);
    localStorage.setItem("interviews", JSON.stringify(updatedInterviews));
  };

  // Extract Interview Names & Scores for Graph
  const interviewNames = interviews.map((interview) => {
    const response = interview.response || [];
    return response.length > 1 ? response[response.length - 1] : "Unknown";
  });

  const interviewScores = interviews.map((interview) => {
    const response = interview.response || [];
    const score = response.length > 1 ? parseFloat(response[response.length - 2]) : 0;
    return isNaN(score) ? 0 : score;
  });

  // Chart Data
  const chartData = {
    labels: interviewNames,
    datasets: [
      {
        label: "Interview Scores",
        data: interviewScores,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start relative px-6 py-10 overflow-hidden">
      {/* Background Particles */}
      <Particles
        className="absolute inset-0 h-full"
        quantity={120}
        ease={80}
        color="#ffffff"
        refresh
      />

      {/* Back Button */}
      <button
        className="fixed top-5 left-5 border border-white rounded-full p-3 hover:bg-white hover:text-black transition-all duration-200"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* User Profile Card */}
      <div className="z-10 w-full max-w-4xl flex flex-col items-center gap-8 pb-0">
        <Card user={user} />

        {/* Stored Interviews Section */}
        <div className="w-full bg-gray-900 p-6 rounded-xl shadow-lg pb-0">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Your Interviews
          </h2>

          {interviews.length === 0 ? (
            <p className="text-gray-400 text-center pb-0">
              No interviews found.
            </p>
          ) : (
            <div className="space-y-4 pb-0">
              {interviews.map((interview, index) => {
                const response = interview.response || [];
                const topic =
                  response.length > 1 ? response[response.length - 1] : "N/A";
                const score =
                  response.length > 1 ? response[response.length - 2] : "N/A";
                const details = response.slice(0, -2); // Exclude topic & score

                return (
                  <div
                    key={index}
                    className="bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition mb-0"
                  >
                    {/* Header Section with Topic, Score & Delete Button */}
                    <div className="flex justify-between items-center">
                      <div
                        className="cursor-pointer flex-grow"
                        onClick={() =>
                          setExpandedInterview(
                            expandedInterview === index ? null : index
                          )
                        }
                      >
                        <h3 className="text-xl font-medium text-white">
                          {topic}
                        </h3>
                        <span className="text-sm bg-blue-600 px-3 py-1 rounded-md font-medium">
                          Score: {score}
                        </span>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(index)}
                        className="ml-4 text-red-500 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Expandable Interview Details */}
                    {expandedInterview === index && (
                      <div className="mt-3 bg-gray-700 p-4 rounded-lg space-y-2">
                        {details.length > 0 ? (
                          details.map((item, idx) => (
                            <p key={idx} className="text-gray-300 text-sm">
                              - {item}
                            </p>
                          ))
                        ) : (
                          <p className="text-gray-400 text-sm">
                            No details available.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 📊 Interview Score Graph */}
        {interviews.length > 0 &&
          interviewScores.some((score) => score > 0) && (
            <div className="w-full bg-gray-900 p-6 rounded-xl shadow-lg mt-6">
              <h2 className="text-2xl font-semibold text-white text-center mb-4">
                Interview Score Graph
              </h2>
              <div className="w-full h-72">
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        suggestedMax: 25, // Max score is 25
                        ticks: {
                          stepSize: 5, // Better readability
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Profile;
