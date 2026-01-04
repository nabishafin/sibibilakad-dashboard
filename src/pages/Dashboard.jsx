import React from 'react';
import OverviewSection from '../components/OverviewSection';
import WageredVsWinnings from '../components/WageredVsWinnings';
import RTPTrendChart from '../components/RTPTrendChart';
import RecentGameRounds from '../components/RecentGameRounds';
import RecentUsers from '../components/RecentUsers';

const Dashboard = () => {
    return (
        <div>
            <OverviewSection />
            <div className='grid grid-cols-2 gap-4 m-10'>
                <div>
                    <WageredVsWinnings />
                </div>
                <div>
                    <RTPTrendChart />
                </div>
            </div>
            <div className='grid grid-cols-2 gap-4 m-10'>
                <div>
                    <RecentGameRounds />
                </div>
                <div>
                    <RecentUsers />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
