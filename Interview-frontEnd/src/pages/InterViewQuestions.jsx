import Questions from "@/components/InterviewComponents/Questions";
import { Particles } from "@/components/ui/particles";
import UserContext from "@/contexts/UserContext";
import { useAnalysis } from "@/hooks/useAnalysis";
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const InterViewQuestions = () => {
  const { course, level, questions } = useContext(UserContext);
  const [answers, setAnswers] = useState({});
  const [apiResponse, setApiResponse] = useState(null);
  const navigate = useNavigate();

  const { isPending, isSuccess, error, mutateAsync } = useAnalysis();

  const handleAnswerChange = (index, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [`question${index + 1}`]: questions[index],
      [`answer${index + 1}`]: answer,
    }));
  };

  const handleSubmit = async () => {
    setApiResponse(null);
    try {
      const data = await mutateAsync(answers);
      setApiResponse(data?.data);
      const interviewId = Date.now().toString();
      const existingInterviews = JSON.parse(localStorage.getItem("interviews")) || [];
      const updatedInterviews = [...existingInterviews, { id: interviewId, response: data?.data }];
      localStorage.setItem("interviews", JSON.stringify(updatedInterviews));
    } catch (err) {
      setApiResponse(["Something went wrong. Please try again."]);
    }
  };

  return (
    <div className="bg-black w-screen min-h-screen text-white flex flex-col items-center relative py-10">
      <Particles
        className="absolute inset-0"
        quantity={150}
        ease={80}
        color="#ffffff"
        refresh
      />

      {/* Back Button */}
      <div
        className="fixed top-5 left-5 border border-white rounded-full p-3 hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-6 h-6" />
      </div>

      {/* Title */}
      <div className="text-center mb-6 px-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          Questions on <span className="text-blue-500">{course}</span> ({level}{" "}
          Level)
        </h1>
      </div>

      {/* Questions Section */}
      {!questions ? (
        <div className="text-lg text-gray-400">Loading questions...</div>
      ) : (
        <>
          <div className="w-full max-w-3xl space-y-4 px-6 pb-10">
            {questions.map((question, index) => (
              <Questions
                key={index}
                question={question}
                onAnswerChange={(answer) => handleAnswerChange(index, answer)}
              />
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex flex-col items-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" /> Submitting...
                </>
              ) : (
                "Submit Answers"
              )}
            </button>

            {/* API Response Section */}
            {apiResponse && (
              <div className="mt-6 w-full max-w-2xl bg-gray-900 p-6 rounded-lg shadow-lg transition-all duration-300">
                <h2 className="text-lg text-green-400 font-semibold mb-3">
                  AI Feedback:
                </h2>
                <ul className="space-y-2">
                  {apiResponse.map((line, index) => (
                    <li
                      key={index}
                      className="bg-gray-800 p-3 rounded-lg text-white text-sm flex items-start gap-2 shadow-md hover:bg-gray-700 transition"
                    >
                      <CheckCircle className="text-green-400 w-5 h-5" /> {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Error Handling */}
            {error && (
              <div className="mt-4 text-lg text-red-400 bg-gray-900 p-4 rounded-lg max-w-2xl text-center shadow-lg">
                Something went wrong. Please try again.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default InterViewQuestions;
