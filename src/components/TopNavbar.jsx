import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  User,
  Settings,
  Shield,
  LogOut,
  ChevronDown,
  EyeOff,
  X,
  Mail,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ onLogout }) => {
  const navigate = useNavigate();


  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true); 
  const [activeModal, setActiveModal] = useState(null); 
  const [showPassword, setShowPassword] = useState(false); 

  const profileRef = useRef(null);
  const notificationRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleLogout = () => {
    if (onLogout) {
      onLogout(); 
    }
    setActiveModal(null);
    navigate("/");
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setHasNewNotifications(false); 
    setIsProfileOpen(false);
  };

  const userData = {
    name: "Shivani Chauhan",
    email: "User123@gmail.com",
    role: "Pro Account",
    joinedDate: "11/14/2025",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shivani",
  };

  const notifications = [
    { id: 1, text: "New user registered", time: "2 min ago" },
    { id: 2, text: "System update completed", time: "1 hour ago" },
    { id: 3, text: "New report generated", time: "5 hours ago" },
  ];

  return (
    <div className="relative bg-[#0E1624] h-20 px-6 flex items-center justify-between border-b border-white">
      <div className="relative w-96">
        <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Search ..."
          className="w-full bg-[#0a111a] border border-gray-700 rounded-xl py-2 pl-10 pr-4 text-gray-300 focus:outline-none focus:border-yellow-600/50"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* 2. Notification Dropdown Section */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={handleNotificationClick}
            className="relative p-2.5 bg-[#0a111a] border border-gray-800 rounded-full text-gray-400 hover:text-white transition-all"
          >
            <Bell size={20} />
            {hasNewNotifications && (
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border border-[#0a111a]"></span>
            )}
          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-[#0a111a] border border-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                <h3 className="text-white font-bold text-sm">Notifications</h3>
                <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded">
                  Recent
                </span>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-4 border-b border-gray-800/50 hover:bg-gray-800/30 cursor-pointer transition-colors"
                  >
                    <p className="text-sm text-gray-300">{n.text}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Profile Dropdown Section */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationOpen(false);
            }}
            className="flex items-center gap-3 bg-[#0a111a] border border-gray-800 rounded-2xl p-2 pr-4 hover:border-gray-600 transition-all"
          >
            <img
              src={userData.avatar}
              alt="avatar"
              className="w-9 h-9 rounded-full border border-yellow-500/50"
            />
            <div className="text-left hidden md:block">
              <h4 className="text-xs font-bold text-white flex items-center gap-1">
                {userData.name} <ChevronDown size={14} />
              </h4>
              <p className="text-[10px] text-gray-500">{userData.role}</p>
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-[#0f172a] border border-gray-800 rounded-2xl shadow-2xl z-50 p-2 text-gray-400">
              <button
                onClick={() => {
                  setActiveModal("profile");
                  setIsProfileOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-800 rounded-xl transition-all"
              >
                <User size={18} /> <span className="text-sm">Profile</span>
              </button>
              <button
                onClick={() => {
                  setActiveModal("settings");
                  setIsProfileOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-800 rounded-xl transition-all"
              >
                <Settings size={18} />{" "}
                <span className="text-sm">Account Setting</span>
              </button>
              <hr className="border-gray-800 my-1" />
              <button
                onClick={() => {
                  setActiveModal("logout");
                  setIsProfileOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold"
              >
                <LogOut size={18} /> <span className="text-sm">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- MODALS --- */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#111827] border border-gray-800 w-full max-w-md rounded-[24px] overflow-hidden shadow-2xl">
            <div className="p-6">
              {activeModal === "profile" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                    <h3 className="text-white font-bold">User Profile</h3>
                    <X
                      className="text-gray-500 cursor-pointer hover:text-white"
                      onClick={() => setActiveModal(null)}
                    />
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-[#1e293b] rounded-2xl border border-gray-700">
                    <img
                      src={userData.avatar}
                      className="w-14 h-14 rounded-full border-2 border-emerald-500"
                      alt=""
                    />
                    <div>
                      <h2 className="text-white font-bold">{userData.name}</h2>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar size={12} /> Joined: {userData.joinedDate}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 ml-1">
                      Email Address
                    </label>
                    <div className="p-4 bg-[#0a111a] border border-gray-800 rounded-xl text-gray-300 flex items-center gap-2">
                      <Mail size={16} className="text-gray-500" />{" "}
                      {userData.email}
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveModal("settings")}
                    className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl transition-all uppercase text-xs"
                  >
                    Account Settings
                  </button>
                </div>
              )}


              {activeModal === "settings" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-bold">Account Setting</h3>
                    <X
                      className="text-gray-500 cursor-pointer"
                      onClick={() => setActiveModal(null)}
                    />
                  </div>
                  <div className="p-3 bg-gray-900/50 border border-yellow-600/30 rounded-xl">
                    <h4 className="text-yellow-500 font-bold text-xs uppercase">
                      General Password Management
                    </h4>
                  </div>
                  {["Current Password", "New Password", "Confirm Password"].map(
                    (label) => (
                      <div key={label} className="space-y-1.5">
                        <label className="text-xs text-gray-400 ml-1">
                          {label}
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full bg-[#0a111a] border border-gray-800 rounded-xl py-3 px-4 text-sm text-gray-300 focus:border-yellow-600/50 outline-none transition-all"
                          />
                          <EyeOff
                            onClick={() => setShowPassword(!showPassword)}
                            size={16}
                            className="absolute right-4 top-3.5 text-gray-600 cursor-pointer hover:text-gray-300"
                          />
                        </div>
                      </div>
                    )
                  )}
                  <button className="w-full mt-4 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl shadow-lg uppercase text-xs tracking-wider transition-all">
                    Change Password
                  </button>
                </div>
              )}

              {/* Logout Modal */}
              {activeModal === "logout" && (
                <div className="text-center space-y-4 py-4">
                  <div className="w-16 h-16 bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Do you want to exit?
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Confirming will log you out from your current session.
                  </p>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setActiveModal(null)}
                      className="flex-1 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-all"
                    >
                      No
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all"
                    >
                      Yes, Exit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
