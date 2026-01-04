
import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  RotateCcw, 
  FileText, 
  ClipboardList, 
  LogOut, 
  AlertCircle,
  X 
} from 'lucide-react';
import MyLogo from '../assets/logo.png';

const Sidebar = ({ onLogout, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'User Management', path: '/users', icon: <Users size={20} /> },
    { name: 'Financial Controls', path: '/financial', icon: <DollarSign size={20} /> },
    { name: 'Round Explorer', path: '/round-explorer', icon: <RotateCcw size={20} /> },
    { name: 'System Reports', path: '/dashboard/reports', icon: <FileText size={20} /> },
    { name: 'Audit Trail', path: '/dashboard/audit', icon: <ClipboardList size={20} /> },
  ];

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    if (onLogout) {
      onLogout();
      navigate('/');
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Main Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-[#0E1624] flex flex-col transition-transform duration-300 ease-in-out border-r border-white
        lg:translate-x-0 lg:static 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Close Button for Mobile */}
        <button className="lg:hidden absolute top-4 right-4 text-gray-400" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>

        {/* Logo Section */}
        <div className="p-5 flex items-center justify-center ">


          <img src={MyLogo} alt="" />
        </div>

        <hr className="border-white  mb-4" />

        {/* Navigation Links */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium
                ${isActive 
                  ? 'bg-[#2a7d7d] text-white' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
              `}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 transition-colors group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </div>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111827] w-full max-w-sm rounded-2xl p-8 shadow-2xl border border-gray-800">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mb-4">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Do you want to exit?</h3>
              <p className="text-gray-400 text-sm mb-8">Confirming will log you out from your current session.</p>
              
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="flex-1 py-3 px-6 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-all"
                >
                  No
                </button>
                <button 
                  onClick={confirmLogout}
                  className="flex-1 py-3 px-6 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:bg-red-700 active:scale-95 transition-all"
                >
                  Yes, Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;