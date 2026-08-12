const ProfileMenu = ({
  loggedUser,
  navigate,
  onClose,
  handleLogout,
}) => {
  return (
    <div
      className="fixed inset-0 z-9999 bg-black/40 backdrop-blur-sm flex justify-end"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[320px] h-full bg-zinc-950 border-l border-zinc-800 shadow-2xl p-6 flex flex-col"
      >

        {/* User */}
        <div className="flex items-center gap-4 border-b border-zinc-800 pb-5">

          <div className="w-14 h-14 rounded-full bg-(--color-accent) flex items-center justify-center text-2xl font-bold text-white">
            {loggedUser?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-white text-lg font-semibold">
              {loggedUser?.name}
            </h2>

            <p className="text-gray-400 text-sm">
              {loggedUser?.email}
            </p>
          </div>

        </div>

        {/* Menu */}
        <div className="mt-6 flex flex-col gap-3">

          <button
            onClick={() => {
              navigate(`/profile/${loggedUser?.id}`);
              onClose();
            }}
            className="w-full text-left px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white"
          >
            My Profile
          </button>

          <button
            onClick={() => {
              navigate(`/orders/${loggedUser?.id}`);
              onClose();
            }}
            className="w-full text-left px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white"
          >
            Orders
          </button>

          <button
            onClick={() => {
              navigate(`/favorite/${loggedUser?.id}`);
              onClose();
            }}
            className="w-full text-left px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white"
          >
            Favorites
          </button>

        </div>

        {/* Bottom */}
        <div className="mt-auto pt-6 border-t border-zinc-800 space-y-2">

          {loggedUser?.role === "Admin" && (
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="w-full border border-(--color-accent) text-white py-3 rounded-xl font-semibold"
            >
              Switch To Admin
            </button>
          )}

          <button
            onClick={handleLogout}
            className="w-full bg-(--color-accent) text-white py-3 rounded-xl font-semibold"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
};

export default ProfileMenu;