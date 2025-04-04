import { useNavigate } from "react-router-dom";

function Features() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  return (
    <section id="features" className="py-16 px-8 text-center mb-10 relative flex flex-col justify-center items-center">
      <h2 className="text-5xl font-extrabold text-white mb-6">
        🚀{" "}
        <span className="bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
          Our Features
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
        {[
          {
            title: "Mock Interviews",
            description:
              "Practice real interview scenarios with AI-driven simulations.",
            icon: "🎤",
            route: "/StartInterview/" + user?.id,
          },
          {
            title: "Question Bank",
            description:
              "Access hundreds of frequently asked interview questions.",
            icon: "📚",
            route: "/QuestionBank",
          },
          {
            title: "AI Guidance",
            description: "Get tips and insights from industry professionals.",
            icon: "🤖",
            route: "/AI-Guidance",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-gray-900/60 border cursor-pointer border-gray-700 backdrop-blur-lg rounded-xl shadow-md 
                        hover:-translate-y-3 hover:scale-105 transition-all duration-300 hover:shadow-blue-500/50"
            onClick={() =>
              token ? navigate(feature.route) : navigate("/auth")
            }
          >
            <div className="text-5xl">{feature.icon}</div>
            <h3 className="text-2xl font-semibold text-white mt-4">
              {feature.title}
            </h3>
            <p className="mt-2 text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
