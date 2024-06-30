import { useState } from 'react';

const Friends = ({ onInvite }:any) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleInvite = () => {
    if (email) {
      // Call the onInvite function passed from the parent component
      onInvite(email);
      setMessage(`Invitation sent to ${email}. You will receive 2500 coins when they accept.`);
      setEmail('');
    } else {
      setMessage('Please enter a valid email.');
    }
  };

  return (
    <div className="invite-friends-page p-4">
      <h2 className="text-2xl font-bold mb-4">Invite Friends</h2>
      <p className="mb-4">Invite your friends to join the game and earn 2500 coins for each friend who joins!</p>
      <div className="invite-form mb-4">
        <input
          type="email"
          placeholder="Enter friend's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button onClick={handleInvite} className="ml-2 p-2 bg-blue-500 text-white rounded">
          Invite
        </button>
      </div>
      {message && <p className="message text-green-500">{message}</p>}
    </div>
  );
};

export default Friends;
