import React from "react";
import banner from "../../assets/header.jpg";
import { useNavigate } from "react-router-dom";

const BannerSection = () => {
  const navigate = useNavigate()
  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      <img
        src={banner}
        alt="Exotic Fish"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-[#020617]/90 via-[#020617]/70 to-transparent"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,211,238,0.25),transparent_50%)]"></div>

      <div className="relative z-10 flex items-center h-full px-6 md:px-12">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Discover Rare <br />
            <span className="bg-linear-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">
              Exotic Fish Collection
            </span>
          </h2>

          <p className="text-slate-300 mb-6">
            Explore unique and vibrant species that bring life and color to your
            aquarium
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="cursor-pointer group relative overflow-hidden bg-linear-to-r from-cyan-400 to-teal-300 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-95"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-white/30 skew-x-12"></span>

            <span className="relative z-10 flex items-center gap-2">
              Shop Exotic Fish
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
