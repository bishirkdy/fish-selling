import React from "react";
import { ShieldCheck, Truck, HeartHandshake } from "lucide-react";

const WhyUs = () => {
  const items = [
    {
      icon: <ShieldCheck size={28} />,
      title: "Healthy & Handpicked",
      desc: "Carefully selected fish to ensure quality and long life",
    },
    {
      icon: <Truck size={28} />,
      title: "Safe Delivery",
      desc: "Secure packaging to keep your fish safe during transit",
    },
    {
      icon: <HeartHandshake size={28} />,
      title: "Expert Support",
      desc: "Guidance and care tips whenever you need them",
    },
  ];

  return (
    <section className="bg-(--color-background) py-16 px-6 md:px-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Why Choose Aquora
        </h2>
        <p className="text-slate-400 mt-2">
          We bring you the best aquatic experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <div
            key={i}
            className="relative bg-(--color-surface) p-6 rounded-xl text-center group hover:shadow-lg hover:shadow-amber-500/10 transition duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_50%_30%,rgba(249,115,22,0.2),transparent_70%)]"></div>

            <div className="flex justify-center mb-4 text-(--color-primary)">
              {item.icon}
            </div>

            <h3 className="text-(--color-text) text-lg font-semibold mb-2">
              {item.title}
            </h3>

            <p className="text-slate-400 text-sm">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;