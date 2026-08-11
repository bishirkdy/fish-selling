import { useState } from "react";
import {
  User,
  Settings,
  Gift,
  Mail,
  Shield,
  Bell,
  Lock,
  Star,
  User2,
  Stamp,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useGetCurrentUser } from "../tanstack/hooks/queries/auth/authQueries";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");
    const { data: user } = useGetCurrentUser();


  const menuItems = [
    {
      id: "personal",
      label: "Personal Info",
      icon: <User size={18} />,
    },
    {
      id: "settings",
      label: "User Settings",
      icon: <Settings size={18} />,
    },
    {
      id: "rewards",
      label: "Rewards",
      icon: <Gift size={18} />,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-(--color-background) p-5 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-3 mb-2">
                  <User2 className="text-(--color-secondary)" />
                  <p className="text-zinc-400 text-sm">Id</p>
                </div>
                <h3 className="text-lg font-semibold">{user?.id}</h3>
              </div>

              <div className="bg-(--color-background) p-5 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-3 mb-2">
                  <User className="text-(--color-secondary)" />
                  <p className="text-zinc-400 text-sm">Name</p>
                </div>
                <h3 className="text-lg font-semibold">{user?.name}</h3>
              </div>

              <div className="bg-(--color-background) p-5 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="text-(--color-secondary)" />
                  <p className="text-zinc-400 text-sm">Email</p>
                </div>
                <h3 className="text-lg font-semibold">{user?.email}</h3>
              </div>
              <div className="bg-(--color-background) p-5 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-3 mb-2">
                  <Stamp className="text-(--color-secondary)" />
                  <p className="text-zinc-400 text-sm">Current Status</p>
                </div>
                <h3 className="text-lg font-semibold">{user?.isBlocked ? "Blocked by admin" : "Active"}</h3>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">User Settings</h2>

            <div className="space-y-4">
              <div className="bg-(--color-background) hover:scale-101 p-5 rounded-xl border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="text-yellow-400" />
                  <div>
                    <h3 className="font-semibold">Notifications</h3>
                    <p className="text-sm text-zinc-400">
                      Manage notification preferences
                    </p>
                  </div>
                </div>

                <button className="bg-(--color-accent) hover:bg-transparent hover:border hover:border-(--color-accent) transition-all duration-300 ease-in-out cursor-pointer px-4 py-2 rounded-lg">
                  Manage
                </button>
              </div>

              <div className="bg-(--color-background) hover:scale-101 p-5 rounded-xl border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="text-red-400" />
                  <div>
                    <h3 className="font-semibold">Password & Security</h3>
                    <p className="text-sm text-zinc-400">
                      Update Password and Security
                    </p>
                  </div>
                </div>

                <button className="bg-(--color-accent) hover:bg-transparent hover:border hover:border-(--color-accent) transition-all duration-300 ease-in-out cursor-pointer px-4 py-2 rounded-lg">
                  Update
                </button>
              </div>

              <div className="bg-(--color-background) hover:scale-101 p-5 rounded-xl border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="text-green-400" />
                  <div>
                    <h3 className="font-semibold">Privacy</h3>
                    <p className="text-sm text-zinc-400">
                      Control your privacy settings
                    </p>
                  </div>
                </div>

                <button className="bg-(--color-accent) hover:bg-transparent hover:border hover:border-(--color-accent) transition-all duration-300 ease-in-out cursor-pointer px-4 py-2 rounded-lg">
                  Open
                </button>
              </div>
            </div>
          </div>
        );

      case "rewards":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Rewards</h2>

            <div className="bg-(--color-background) p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Star size={28} />
                <h3 className="text-2xl font-bold">{user.level}</h3>
              </div>

              <p className="text-lg">
                You have <span className="font-bold">{user.points} Points</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-(--color-background) p-5 rounded-xl border border-zinc-800 text-center">
                <Gift className="mx-auto mb-3 text-pink-400" size={32} />
                <h3 className="font-semibold">Free Delivery</h3>
                <p className="text-sm text-zinc-400 mt-2">
                  Unlock free shipping rewards
                </p>
              </div>

              <div className="bg-(--color-background) p-5 rounded-xl border border-zinc-800 text-center">
                <Gift className="mx-auto mb-3 text-yellow-400" size={32} />
                <h3 className="font-semibold">Discount Coopen</h3>
                <p className="text-sm text-zinc-400 mt-2">
                  Get Exclusive Coopen
                </p>
              </div>

              <div className="bg-(--color-background) p-5 rounded-xl border border-zinc-800 text-center">
                <Gift className="mx-auto mb-3 text-green-400" size={32} />
                <h3 className="font-semibold">VIP Asses</h3>
                <p className="text-sm text-zinc-400 mt-2">
                  Early Product Access
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 md:pt-0 flex items-center justify-center bg-(--color-background) text-(--color-text) p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-(--color-surface) border border-white/60 rounded-2xl p-5 min-w-64">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-(--color-accent) flex items-center justify-center text-3xl font-bold mb-4">
              B
            </div>

            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm">{user.email}</p>
          </div>

          <div className="space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                  activeTab === item.id
                    ? "bg-(--color-primary) text-black font-semibold"
                    : "bg-(--color-background) hover:bg-zinc-800"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-(--color-surface) border border-white/60 rounded-2xl p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
