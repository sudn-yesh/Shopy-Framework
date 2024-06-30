import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './index.css';
import Arrow from './icons/Arrow';
import { highVoltage, trophy, shopy, shopylogorbg, home, friends, tasks, stats, boost } from './images';
import Friends from './pages/Friends';
import Tasks from './pages/Tasks';
import Statistics from './pages/Statistics';
// import BoostModal from './pages/Boost';
import { db } from './FirebaseConfig';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore/lite';

const MAX_ENERGY = 1000;
const ENERGY_REGEN_RATE = 1;

const App: React.FC = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);
  const [userId, setUserId] = useState<string>('');
  const [points, setPoints] = useState<number>(0);
  const [energy, setEnergy] = useState<number | null>(null);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pointsToAdd: number = 1;
  const energyToReduce: number = 1;

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const chatIdParam = query.get('chat_id');

    if (chatIdParam) {
      setUserId(chatIdParam);
      fetchUserData(chatIdParam);
    }

    // Energy regeneration
    const interval = setInterval(() => {
      setEnergy(prevEnergy => {
        if (prevEnergy !== null && prevEnergy < MAX_ENERGY) {
          const newEnergy = Math.min(prevEnergy + ENERGY_REGEN_RATE, MAX_ENERGY);
          localStorage.setItem('energy', newEnergy.toString());
          localStorage.setItem('lastUpdated', new Date().toISOString());
          return newEnergy;
        }
        return prevEnergy;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const userCollectionRef = collection(db, 'users');
      const userDocRef = doc(userCollectionRef, userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const lastUpdated = new Date(localStorage.getItem('lastUpdated') || userData.lastUpdated?.toDate() || new Date());
        const currentTime = new Date();
        const timeDiff = (currentTime.getTime() - lastUpdated.getTime()) / 1000;
        const regeneratedEnergy = Math.min(MAX_ENERGY, (userData.energy || MAX_ENERGY) + Math.floor(timeDiff * ENERGY_REGEN_RATE));

        setPoints(userData.points || 0);
        setEnergy(regeneratedEnergy);

        localStorage.setItem('energy', regeneratedEnergy.toString());
        localStorage.setItem('lastUpdated', new Date().toISOString());
      }
    } catch (e) {
      console.error('Error fetching user data: ', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (x: number, y: number) => {
    if (energy !== null && energy - energyToReduce >= 0) {
      const newPoints = points + pointsToAdd;
      const newEnergy = energy - energyToReduce;

      updateFirestoreData(newPoints);
      setPoints(newPoints);
      setEnergy(newEnergy);
      localStorage.setItem('energy', newEnergy.toString());
      localStorage.setItem('lastUpdated', new Date().toISOString());

      setClicks([...clicks, { id: Date.now(), x, y }]);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const updateFirestoreData = async (newPoints: number) => {
    try {
      const userCollectionRef = collection(db, 'users');
      const userDocRef = doc(userCollectionRef, userId);
      await setDoc(userDocRef, { points: newPoints, lastUpdated: new Date() }, { merge: true });
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  };

  const handleTouchClick = (e: React.TouchEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      handleClick(x, y);
    }
  };

  const handleAnimationEnd = (id: number) => {
    setClicks(prevClicks => prevClicks.filter(click => click.id !== id));
  };

  if (isLoading || energy === null) {
    return <div className="flex items-center justify-center h-screen text-sky-500">Loading...</div>;
  }

  return (
    <Router>
      <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
        <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
          <div className="w-full fixed bottom-5 mb-0 p-2 z-20">
            <div className="text-center py-2 rounded-xl mt-5 flex justify-around">
              {/* <div className="p-4">
                <button
                  onClick={openModal}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Open Boost Modal
                </button>
                <BoostModal isOpen={isModalOpen} onClose={closeModal} />
              </div> */}
              <Link className="button-with-icon" to="/tasks">
                <div className="button-icon-container">
                  <img src={tasks} alt="Tasks" className="button-icon" />
                </div>
                <span>Tasks</span>
              </Link>
              <Link className="button-with-icon" to="/friends">
                <div className="button-icon-container">
                  <img src={friends} alt="Friends" className="button-icon" />
                </div>
                <span>Friends</span>
              </Link>
              <Link className="button-with-icon" to="/">
                <div className="button-icon-container">
                  <img src={home} alt="Home" className="button-icon" />
                </div>
                <span>Tap</span>
              </Link>
              <Link className="button-with-icon" to="/boost">
                <div className="button-icon-container">
                  <img src={boost} alt="Boost" className="button-icon" />
                </div>
                <span>Boost</span>
              </Link>
              <Link className="button-with-icon" to="/statistics">
                <div className="button-icon-container">
                  <img src={stats} alt="Statistics" className="button-icon" />
                </div>
                <span>Stats</span>
              </Link>
            </div>
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex-grow flex items-center justify-center">
                  <img
                    src={shopy}
                    alt="dukan"
                    className="absolute shopy-logo max-w-full max-h-full mb-20"
                    onTouchStart={handleTouchClick}
                  />
                  <img
                    src={shopylogorbg}
                    alt="dukan"
                    className={`relative shopy-logo max-w-44 max-h-44 mb-16 ${isAnimating ? 'tilt-shake' : ''}`}
                    onTouchStart={handleTouchClick}
                  />
                  <div className="fixed top-0 left-0 w-full px-4 pt-2 z-10 flex flex-col items-center text-white">
                    <div className="mt-10 text-5xl font-bold flex items-center total-coins">
                      <img src={shopylogorbg} width={60} height={60} />
                      <span className="ml-1">{points.toLocaleString()}</span>
                    </div>
                    <div className="text-base mt-2 flex items-center">
                      <img src={trophy} width={24} height={24} />
                      <span className="ml-1">
                        Gold <Arrow size={18} className="ml-0 mb-1 inline-block" />
                      </span>
                    </div>
                  </div>
                  <div className="fixed bottom-14 w-72 pb-4 ">
                    <div className="w-full bg-[#f9c035] rounded-full mt-4">
                      <div
                        className="bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full"
                      // style={{ width: `${(energy / MAX_ENERGY) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-center mb-14">
                      <img src={highVoltage} width={30} height={30} alt="High Voltage" />
                      <div className="ml-2 text-center">
                        <span className="text-white text-center font-bold block">
                          {energy}/{MAX_ENERGY}
                        </span>
                      </div>
                    </div>
                  </div>
                  {clicks.map(click => (
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
              }
            />
            <Route path="/friends" element={<Friends />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/statistics" element={<Statistics />} />
            {/* <Route path="/boost" element={<Boost />} /> */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
