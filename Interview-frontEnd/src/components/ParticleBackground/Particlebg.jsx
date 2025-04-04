import { Particles } from "../ui/particles";

function ParticlesDemo() {
    return (
      <div className="relative flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden bg-black">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-3xl md:text-6xl font-semibold leading-none text-transparent">
          Welcome to{"\n"}Our{" "}
          <span className="text-4xl md:text-8xl text-[#38BDF8]">InterView</span>{" "}
          Website
        </span>
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color="#ffffff"
          refresh
        />

        <button
          className="hover:bg-white hover:text-black font-semibold px-6 py-3 rounded-lg text-lg shadow-lg transition-all duration-300 border border-white text-white hover:shadow-xl"
          onClick={() => {
            navigate("/auth");
          }}
        >
          Get Started for Free
        </button>


          

      </div>
    );
}

export default ParticlesDemo;