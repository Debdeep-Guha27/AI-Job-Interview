import { useState } from "react";
import { useGetsampleQuestion } from "@/hooks/useGetsampleQuestions";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Particles } from "@/components/ui/particles";

function QuestionPage() {
  const { isPending, mutateAsync } = useGetsampleQuestion();
  const [selectedTech, setSelectedTech] = useState("Mern stack");
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  async function handleClick() {
    const response = await mutateAsync({ topic: selectedTech });
    setData(response);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
    <Particles
        className="absolute inset-0"
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
      {/* Main Container */}
      <div className="w-[800px] h-[400px] flex flex-col md:flex-row gap-8 p-6 bg-gray-900/30 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700">
        {/* Left Section: Technology Selector */}
        <div className="w-[280px] h-full flex flex-col gap-6 p-6 bg-gray-800/80 rounded-xl shadow-lg border border-gray-700">
          <h1 className="text-xl font-bold text-blue-400 text-center">
            Select a Technology
          </h1>

          <select
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none border border-gray-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
          >
            <option value="Mern stack">MERN Stack</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
          </select>

          <button
            className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300 font-semibold text-white flex items-center justify-center gap-2 shadow-md active:scale-95"
            onClick={handleClick}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Fetch Questions"
            )}
          </button>
        </div>

        {/* Right Section: Fixed Questions Box */}
        <div className="w-[460px] h-full flex flex-col p-6 bg-gray-800/80 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">
            Questions
          </h2>

          {/* Scrollable Questions List */}
          <div className="h-[250px] overflow-y-auto space-y-3 pr-2">
            {data?.data?.questions.length > 0 ? (
              data.data.questions.map((v, i) => (
                <div
                  key={i}
                  className="p-3 bg-gray-700/80 rounded-lg border border-gray-600 hover:bg-gray-600 transition duration-200 shadow-md text-md font-medium"
                >
                  {v}
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">
                No questions available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
