import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Background from "@/components/ParticleBackground/Background";
import { Particles } from "@/components/ui/particles";

const Home = () => {

  return (
    <div className="bg-black text-gray-300 w-screen min-h-fit flex flex-col font-poppins">
      <Particles
        className="absolute min-h-[350vh] inset-2"
        quantity={1000}
        ease={80}
        color="#ffffff"
        refresh
      />
      <Navbar />
      <Background />
      <Footer />
    </div>
  );
};

export default Home;
