import React, { useEffect, useState } from 'react';

const Stats = () => {
  const [stats, setStats] = useState({
    totalTouches: 0,
    totalPlayers: 0,
    dailyUsers: 0,
    onlinePlayers: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => ({
        totalTouches: prevStats.totalTouches + Math.floor(Math.random() * 2645),
        totalPlayers: prevStats.totalPlayers + Math.floor(Math.random() * 209),
        dailyUsers: prevStats.dailyUsers + Math.floor(Math.random() * 103),
        onlinePlayers: prevStats.onlinePlayers + Math.floor(Math.random() * 67),
      }));
    }, 1000); // Change number every 1 second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-900 text-yellow-400 goku-better'> Statistics
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-yellow-400 gohan-better">
        <div className="mb-4 text-center">
          <div className="text-2xl">Total Touches:</div>
          <div className="text-4xl font-bold">{stats.totalTouches}</div>
        </div>
        <div className="mb-4 text-center">
          <div className="text-2xl">Total Players:</div>
          <div className="text-4xl font-bold">{stats.totalPlayers}</div>
        </div>
        <div className="mb-4 text-center">
          <div className="text-2xl">Daily Users:</div>
          <div className="text-4xl font-bold">{stats.dailyUsers}</div>
        </div>
        <div className="mb-4 text-center">
          <div className="text-2xl">Online Players:</div>
          <div className="text-4xl font-bold">{stats.onlinePlayers}</div>
        </div>
      </div>
    </div>  
  );
};

export default Stats;
