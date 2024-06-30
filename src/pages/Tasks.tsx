import React from 'react';
import 'F:/Shopy-Framework/Shopy-Framework/src/index.css';
import telegramIcon from 'F:/Shopy-Framework/Shopy-Framework/src/images/icons8-telegram-48.png'; // Adjust the path as needed

const YouTubeIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a2.977 2.977 0 00-2.098-2.098C19.496 3.5 12 3.5 12 3.5s-7.496 0-9.4.588a2.977 2.977 0 00-2.098 2.098C0 8.1 0 12 0 12s0 3.9.502 5.814a2.977 2.977 0 002.098 2.098C4.504 20.5 12 20.5 12 20.5s7.496 0 9.4-.588a2.977 2.977 0 002.098-2.098C24 15.9 24 12 24 12s0-3.9-.502-5.814zM9.75 15.02V8.98l6.54 3.02-6.54 3.02z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.569a10 10 0 01-2.825.775 4.932 4.932 0 002.165-2.723 9.865 9.865 0 01-3.127 1.184 4.917 4.917 0 00-8.38 4.482A13.978 13.978 0 011.671 3.15a4.917 4.917 0 001.523 6.573A4.897 4.897 0 01.96 9.15v.061a4.917 4.917 0 003.946 4.827 4.897 4.897 0 01-2.212.084 4.923 4.923 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.396 0-.787-.023-1.175-.067a13.945 13.945 0 007.548 2.212c9.058 0 14.009-7.513 14.009-14.009 0-.213 0-.425-.015-.637a10.025 10.025 0 002.462-2.557z"/>
  </svg>
);

const openExternalLink = (url: string) => {
  window.open(url, '_blank');
};

const Tasks: React.FC = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${open ? 'block' : 'hidden'}`}>
      <div className="bg-gray-900 p-6 rounded-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl">Tasks List</h2>
        </div>
        <div className="space-y-4">
          <button onClick={() => openExternalLink('https://t.me/shopybot9')} className="flex items-center justify-between bg-gray-700 text-white p-3 rounded-lg w-full">
            <div className="flex items-center">
              <img src={telegramIcon} alt="Telegram" className="w-6 h-6" />
              <span className="ml-3">Join us</span>
            </div>
            <div className="text-gray-400">Pending</div>
          </button>
          <button onClick={() => openExternalLink('https://t.me/+rndgzax_ZsU4YzFl')} className="flex items-center justify-between bg-gray-700 text-white p-3 rounded-lg w-full">
            <div className="flex items-center">
              <img src={telegramIcon} alt="Telegram" className="w-6 h-6" />
              <span className="ml-3">Join Community</span>
            </div>
            <div className="text-gray-400">Pending</div>
          </button>
          <button onClick={() => openExternalLink('https://x.com/Shopy_bot?t=GCcPrIcraRSKivbaJEfrIA&s=35')} className="flex items-center justify-between bg-gray-700 text-white p-3 rounded-lg w-full">
            <div className="flex items-center">
              <TwitterIcon />
              <span className="ml-3">Follow us</span>
            </div>
            <div className="text-gray-400">Pending</div>
          </button>
          <button onClick={() => openExternalLink('https://www.youtube.com/@Shopy-bot')} className="flex items-center justify-between bg-gray-700 text-white p-3 rounded-lg w-full">
            <div className="flex items-center">
              <YouTubeIcon />
              <span className="ml-3">Subscribe Us</span>
            </div>
            <div className="text-gray-400">Pending</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
