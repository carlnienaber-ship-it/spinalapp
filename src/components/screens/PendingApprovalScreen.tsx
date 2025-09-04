import React from 'react';
import Header from '../ui/Header';

interface PendingApprovalScreenProps {
  userEmail?: string;
  onSignOut: () => void;
}

const PendingApprovalScreen: React.FC<PendingApprovalScreenProps> = ({ userEmail, onSignOut }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center animate-fade-in">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-red-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <Header 
        title="Account Not Activated" 
        subtitle={userEmail ? `Your account (${userEmail}) has not been assigned a role.` : 'Your account requires activation.'}
      />
      <p className="mt-4 text-gray-400">Please contact an administrator to have your account approved. Once a role has been assigned, you will be able to log in.</p>
      <div className="w-full max-w-sm mt-10">
        <button 
          onClick={onSignOut}
          className="w-full text-gray-400 hover:text-white text-sm transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default PendingApprovalScreen;