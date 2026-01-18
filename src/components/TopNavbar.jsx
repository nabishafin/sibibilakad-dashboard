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
  Edit2,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useLogoutMutation
} from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Form states
  const [newUsername, setNewUsername] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const { data: profileRes, isLoading: isProfileLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
  const [deleteAccount, { isLoading: isDeletingAccount }] = useDeleteAccountMutation();
  const [logoutApi] = useLogoutMutation();

  const userData = profileRes?.data || {
    username: "Loading...",
    email: "...",
    role: "...",
    createdAt: new Date().toISOString(),
  };

  useEffect(() => {
    if (userData.username && !isEditingProfile) {
      setNewUsername(userData.username);
    }
  }, [userData.username, isEditingProfile]);

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

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      if (onLogout) onLogout();
      setActiveModal(null);
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to logout");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile({ username: newUsername }).unwrap();
      toast.success("Profile updated successfully");
      setIsEditingProfile(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword
      }).unwrap();
      toast.success("Password changed successfully");
      setActiveModal(null);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount().unwrap();
      toast.success("Account deleted successfully");
      handleLogout();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete account");
    }
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setHasNewNotifications(false);
    setIsProfileOpen(false);
  };

  const notifications = [
    { id: 1, text: "New user registered", time: "2 min ago" },
    { id: 2, text: "System update completed", time: "1 hour ago" },
    { id: 3, text: "New report generated", time: "5 hours ago" },
  ];

  return (
    <div className="relative bg-[#0E1624] h-20 px-6 flex items-center justify-between border-b border-white">
      <div className="relative w-96">

        <input
          type="text"
          placeholder="Search ..."
          className="w-full bg-[#0a111a] border border-gray-700 rounded-xl py-2 pl-10 pr-4 text-gray-300 focus:outline-none focus:border-yellow-600/50"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Dropdown */}
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

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationOpen(false);
            }}
            className="flex items-center gap-3 bg-[#0a111a] border border-gray-800 rounded-2xl p-2 pr-4 hover:border-gray-600 transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center text-yellow-500 font-bold">
              {userData.username?.charAt(0).toUpperCase()}
            </div>
            <div className="text-left hidden md:block">
              <h4 className="text-xs font-bold text-white flex items-center gap-1">
                {userData.username} <ChevronDown size={14} />
              </h4>
              <p className="text-[10px] text-gray-500 uppercase">{userData.role}</p>
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
                      onClick={() => {
                        setActiveModal(null);
                        setIsEditingProfile(false);
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-[#1e293b] rounded-2xl border border-gray-700">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 text-xl font-bold">
                      {userData.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      {isEditingProfile ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            className="bg-[#0a111a] border border-gray-700 rounded-lg px-2 py-1 text-white text-sm focus:outline-none focus:border-yellow-500 w-full"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <h2 className="text-white font-bold">{userData.username}</h2>
                          <button
                            onClick={() => setIsEditingProfile(true)}
                            className="text-gray-500 hover:text-yellow-500 transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>
                        </div>
                      )}
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Calendar size={12} /> Joined: {new Date(userData.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#0a111a] p-3 rounded-xl border border-gray-800">
                      <p className="text-[10px] text-yellow-500 font-bold uppercase mb-1">Balance</p>
                      <p className="text-sm font-bold text-white">${userData.balance?.toFixed(4)}</p>
                    </div>
                    <div className="bg-[#0a111a] p-3 rounded-xl border border-gray-800">
                      <p className="text-[10px] text-yellow-500 font-bold uppercase mb-1">Total Won</p>
                      <p className="text-sm font-bold text-white">${userData.totalWon?.toFixed(4)}</p>
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

                  {isEditingProfile ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsEditingProfile(false)}
                        className="flex-1 py-3 bg-gray-800 text-white font-bold rounded-xl transition-all uppercase text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        disabled={isUpdatingProfile}
                        onClick={handleUpdateProfile}
                        className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl transition-all uppercase text-xs flex items-center justify-center gap-2"
                      >
                        {isUpdatingProfile && <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>}
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveModal("settings")}
                      className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl transition-all uppercase text-xs"
                    >
                      Account Settings
                    </button>
                  )}
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
                    <h4 className="text-yellow-500 font-bold text-xs uppercase text-center">
                      Security & Account Management
                    </h4>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400 ml-1">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                          placeholder="Current Password"
                          className="w-full bg-[#0a111a] border border-gray-800 rounded-xl py-3 px-4 text-sm text-gray-300 focus:border-yellow-600/50 outline-none transition-all"
                        />
                        <EyeOff
                          onClick={() => setShowPassword(!showPassword)}
                          size={16}
                          className="absolute right-4 top-3.5 text-gray-600 cursor-pointer hover:text-gray-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400 ml-1">New Password</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        placeholder="New Password"
                        className="w-full bg-[#0a111a] border border-gray-800 rounded-xl py-3 px-4 text-sm text-gray-300 focus:border-yellow-600/50 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400 ml-1">Confirm New Password</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        placeholder="Confirm New Password"
                        className="w-full bg-[#0a111a] border border-gray-800 rounded-xl py-3 px-4 text-sm text-gray-300 focus:border-yellow-600/50 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    disabled={isChangingPassword}
                    onClick={handleChangePassword}
                    className="w-full mt-4 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl shadow-lg uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    {isChangingPassword && <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>}
                    Update Password
                  </button>

                  <div className="pt-4 border-t border-gray-800">
                    <button
                      onClick={() => setActiveModal("delete_account")}
                      className="w-full py-3 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white border border-red-600/30 font-bold rounded-xl transition-all uppercase text-xs flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} /> Delete Account Permanently
                    </button>
                  </div>
                </div>
              )}

              {/* Delete Account Confirmation */}
              {activeModal === "delete_account" && (
                <div className="text-center space-y-4 py-4">
                  <div className="w-16 h-16 bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase">
                    Delete Account?
                  </h3>
                  <p className="text-gray-400 text-sm">
                    This action is <span className="text-red-500 font-bold underline">PERMANENT</span> and cannot be undone. All your gaming history and balance will be lost.
                  </p>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setActiveModal("settings")}
                      className="flex-1 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-all font-bold uppercase text-xs"
                    >
                      No, Cancel
                    </button>
                    <button
                      disabled={isDeletingAccount}
                      onClick={handleDeleteAccount}
                      className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all font-bold uppercase text-xs flex items-center justify-center gap-2"
                    >
                      {isDeletingAccount && <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                      Yes, Delete
                    </button>
                  </div>
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
                      className="flex-1 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-all font-bold uppercase text-xs"
                    >
                      No
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all font-bold uppercase text-xs"
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
