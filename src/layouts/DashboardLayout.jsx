import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

const DashboardLayout = () => {
  return (
    <div className='flex h-screen bg-[#0E1624] overflow-hidden w-full'>

            <aside className='hidden lg:block  h-full'>
                <Sidebar />
            </aside>


            <div className="flex flex-col flex-1 h-full overflow-hidden">


                <header className='flex-shrink-0'>
                    <TopNavbar />
                </header>

                <main className="flex-1 overflow-y-auto  md:pt-0">
                    <Outlet />
                </main>

            </div>
        </div>
  );
};

export default DashboardLayout;
