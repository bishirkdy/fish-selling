import freshwater from "../../assets/categories/freshwater.jpg";
import saltwater from "../../assets/categories/saltwater.jpg";


const categories = [
  { title: "Freshwater Fish", img: freshwater },
  { title: "Saltwater Fish", img: saltwater },
  { title: "Exotic Fish", img: "https://plus.unsplash.com/premium_photo-1723351183913-f1015b61b230?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJvcGljYWwlMjBmaXNofGVufDB8fDB8fHww" },
  { title: "Beginner Friendly", img: "https://plus.unsplash.com/premium_photo-1765174942977-b41755e4ea1f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEJlZ2lubmVyJTIwRnJpZW5kbHlmaXNofGVufDB8fDB8fHww" },
  { title: "Popular Fish", img: "https://plus.unsplash.com/premium_photo-1722908885997-b50e0cf08681?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UG9wdWxhciUyMEZpc2glMjBhcXVyaWN8ZW58MHx8MHx8fDA%3D" },
];

const CategorySection = () => {
  return (
    <section className="bg-(--color-background) py-16 px-6 md:px-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Explore Categories
        </h2>
        <p className="text-slate-400 mt-2">
          Find the perfect fish for your aquarium
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="relative group rounded-xl overflow-hidden cursor-pointer"
          >
            <img
              src={cat.img}
              alt={cat.title}
              className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.25),transparent_60%)]"></div>

            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-lg font-semibold group-hover:text-(--color-primary) transition">
                {cat.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
