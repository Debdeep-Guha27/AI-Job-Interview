import { Particles } from "@/components/ui/particles";
import { useAskAi } from "@/hooks/useAskAi";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AiGuidance() {
  const [techStack, setTechStack] = useState("Select Tech Stack");
  const [customTech, setCustomTech] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const { isPending, isSuccess, error, mutateAsync: askanything } = useAskAi();

  const navigate = useNavigate();

  const predefinedQuestions = [
    "Roadmap for an interview",
    "How should I behave in an interview?",
    "Main focus in an interview",
    "How to answer difficult questions?",
    "Common mistakes in interviews",
  ];

  const handleAsk = (query) => {
    const input = document.getElementById("question");
    input.value = query;
    setQuestion(query);
  };

  async function askAi() {
    const input = document.getElementById("question");
    if (input.value === "") {
      toast("Please enter or select a question");
      return;
    }
    const QuestionObject = {
      question: question,
      techStack: techStack === "Others" ? customTech : techStack,
    };
    try {
      const data = await askanything(QuestionObject);
      setResponse(data?.data);
    } catch (error) {
      toast("Something went wrong", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <Particles
        className="absolute max-h-screen inset-2"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />
      <div
        className="fixed top-5 left-5 border border-white rounded-full p-3 hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
        onClick={() => navigate("/")}    
      >
        <ArrowLeft className="w-6 h-6" />
      </div>
      <section className="text-center py-10 w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-[#38BDF8]">AI Guidance</h1>
        <p className="mt-3 text-lg text-gray-400">
          Get AI-driven interview insights
        </p>

        
      </section>

      <section className="max-w-3xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-[#38BDF8] flex items-center gap-2">
          <FaRobot className="text-[#38BDF8]" /> Ask AI a Question
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {predefinedQuestions.map((q, index) => (
            <button
              key={index}
              className="bg-[#2ca4cf] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#38BDF8] transition-all"
              onClick={() => handleAsk(q)}
            >
              {q}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <input
            type="text"
            placeholder="Ask something else..."
            className="w-full px-4 py-3 text-gray-200 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
            value={question}
            id="question"
            onChange={(e) => setQuestion(e.target.value)}
          />
          {isPending ? (
            <button
              className="mt-4 bg-gradient-to-r from-[#38BDF8] to-[#2ca4cf] px-6 py-3 rounded-lg text-lg font-semibold w-full flex justify-center items-center gap-3 cursor-not-allowed shadow-lg shadow-[#38BDF8]/50 animate-pulse"
              disabled
            >
              <div className="flex space-x-2">
                <span className="w-3 h-3 bg-white rounded-full animate-bounce"></span>
                <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-150"></span>
                <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-300"></span>
              </div>
              <span className="text-white text-lg font-semibold">
                Analyzing...
              </span>
            </button>
          ) : (
            <button
              className="mt-4 bg-gradient-to-r from-[#38BDF8] to-[#2ca4cf] px-6 py-3 rounded-lg text-lg font-semibold text-white hover:shadow-xl  transition-all w-full"
              onClick={askAi}
            >
              Ask AI
            </button>
          )}
        </div>
        {response && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
            <p className="text-gray-300">{response}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default AiGuidance;
