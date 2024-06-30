import React from 'react';
import { tasks } from '../images';

interface BoostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BoostModal: React.FC<BoostModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBoost = (boostType: string) => {
    // Implement the logic for each boost type
    console.log(`Boost activated: ${boostType}`);
    onClose(); // Close the modal after selecting a boost
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <button className="absolute top-2 right-2" onClick={onClose}>
          &times;
        </button>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-black rounded-lg shadow-lg p-4">
            <button className="w-full text-left" onClick={() => handleBoost('jumboJett')}>
              <div className="flex items-center">
                <img src={tasks} alt="Jumbo Jett" className="w-10 h-10 mr-4" />
                <div>
                  <span className="text-lg font-semibold">Jumbo Jett</span>
                  <p className="mt-2">Increase your click speed for free!</p>
                </div>
              </div>
            </button>
          </div>
          <div className="bg-black rounded-lg shadow-lg p-4">
            <button className="w-full text-left" onClick={() => handleBoost('fullTank')}>
              <div className="flex items-center">
                <img src={tasks} alt="Full Tank" className="w-10 h-10 mr-4" />
                <div>
                  <span className="text-lg font-semibold">Full Tank</span>
                  <p className="mt-2">Refill your energy to the max for free!</p>
                </div>
              </div>
            </button>
          </div>
          <div className="bg-black rounded-lg shadow-lg p-4">
            <button className="w-full text-left" onClick={() => handleBoost('multiTap')}>
              <div className="flex items-center">
                <img src={tasks} alt="Multi Tap" className="w-10 h-10 mr-4" />
                <div>
                  <span className="text-lg font-semibold">Multi Tap</span>
                  <p className="mt-2">Double your tap power!</p>
                </div>
              </div>
            </button>
          </div>
          <div className="bg-black rounded-lg shadow-lg p-4">
            <button className="w-full text-left" onClick={() => handleBoost('energyLimit')}>
              <div className="flex items-center">
                <img src={tasks} alt="Energy Limit" className="w-10 h-10 mr-4" />
                <div>
                  <span className="text-lg font-semibold">Energy Limit</span>
                  <p className="mt-2">Increase your maximum energy limit!</p>
                </div>
              </div>
            </button>
          </div>
          <div className="bg-black rounded-lg shadow-lg p-4">
            <button className="w-full text-left" onClick={() => handleBoost('rechargeSpeed')}>
              <div className="flex items-center">
                <img src={tasks} alt="Recharge Speed" className="w-10 h-10 mr-4" />
                <div>
                  <span className="text-lg font-semibold">Recharge Speed</span>
                  <p className="mt-2">Boost your energy recharge speed!</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostModal;
