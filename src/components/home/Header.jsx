import { useNavigate } from "react-router-dom";
import fish from "../../assets/header.jpg";
import Navbar from "../Navbar";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={fish}
          alt="Aquarium background"
          className="h-full w-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/80"></div>
      </div>

      <div className="relative z-10 text-white">
        <div className="flex flex-col items-center justify-center text-center h-[85vh] px-4">
          <h2 className="text-sm tracking-[0.3em] text-gray-300 mb-3">
            AQUORA
          </h2>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 text-white">
            Dive Into <br />
            <span className="bg-linear-to-r from-cyan-400 via-teal-200 to-cyan-200 bg-clip-text text-transparent">
              A World of Colorful Aquatic Life
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-8">
            Discover rare, vibrant aquatic life and transform your space into a
            living underwater paradise
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <button
              onClick={() => navigate("/shop")}
              className="cursor-pointer group relative overflow-hidden bg-linear-to-r from-cyan-400 to-teal-300 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-white/30 skew-x-12"></span>

              <span className="relative z-10 flex items-center gap-2">
                Explore Fish
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
