import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css';
import Arrow from './icons/Arrow';
import { bear, coin, highVoltage, rocket, trophy, shopylogorbg, shopumbrella } from './images';
import Frens from './pages/Frens';  // Ensure correct import path
import Earn from './pages/Earn';
import Boost from './pages/Boost';

const App = () => {
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const pointsToAdd = 1;
  const energyToReduce = 1;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
        <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="radial-gradient-overlay"></div>
        </div>
        <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
          <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
            <div className="w-full cursor-pointer">
              <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
                <p className="text-lg">Join squad <Arrow size={18} className="ml-0 mb-1 inline-block" /></p>
              </div>
            </div>
            <div className="mt-12 text-5xl font-bold flex items-center total-coins">
              <img src={coin} width={44} height={44} />
              <span className="ml-2">{points.toLocaleString()}</span>
            </div>
            <div className="text-base mt-2 flex items-center">
              <img src={trophy} width={24} height={24} />
              <span className="ml-1">Gold <Arrow size={18} className="ml-0 mb-1 inline-block" /></span>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
            <div className="w-full bg-[#f9c035] rounded-full mt-4">
              <div className="bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full" style={{ width: `${(energy / 1000) * 100}%` }}></div>
            </div>
            <div className="w-full flex justify-between gap-2">
              <div className="w-1/3 flex items-center justify-start max-w-32">
                <div className="flex items-center justify-center">
                  <img src={highVoltage} width={44} height={44} alt="High Voltage" />
                  <div className="ml-2 text-left">
                    <span className="text-white text-l font-bold block">{energy}</span>
                    <span className="text-white text-large opacity-75">/ 1000</span>
                  </div>
                </div>
              </div>
              <div className="flex-grow flex items-center max-w-60 text-sm">
                <div className="w-full bg-[#fad258] py-4 rounded-2xl flex justify-around">
                  <Link to="/frens" className="flex flex-col items-center gap-1">
                    <img src={bear} width={24} height={24} alt="Frens" />
                    <span>Frens</span>
                  </Link>
                  <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                  <Link to="/earn" className="flex flex-col items-center gap-1">
                    <img src={coin} width={24} height={24} alt="Earn" />
                    <span>Earn</span>
                  </Link>
                  <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                  <Link to="/boosts" className="flex flex-col items-center gap-1">
                    <img src={rocket} width={24} height={24} alt="Boosts" />
                    <span>Boosts</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='phone'>
            <img src={shopumbrella} alt="dukan" className='dukan'/>
            <div className='phone-container'>
              <div className="flex-grow flex items-center justify-center">
                <div className="relative mt-4" onClick={handleClick}>
                  <img src={shopylogorbg} className='shopy-logo' width={256} height={256} alt="notcoin" />
                  {clicks.map((click) => (
                    <div
                      key={click.id}
                      className="absolute text-5xl font-bold opacity-0 one-plus"
                      style={{
                        top: `${click.y - 42}px`,
                        left: `${click.x - 30}px`,
                        animation: `float 0.7s ease-out`
                      }}
                      onAnimationEnd={() => handleAnimationEnd(click.id)}
                    >
                      +1
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/frens" element={<Frens />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/boosts" element={<Boost />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
