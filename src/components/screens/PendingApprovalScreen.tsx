import React from 'react';
import Header from '../ui/Header';

interface PendingApprovalScreenProps {
  userEmail?: string;
  onSignOut: () => void;
}

const PendingApprovalScreen: React.FC<PendingApprovalScreenProps> = ({ userEmail, onSignOut }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center animate-fade-in">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-yellow-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <Header 
        title="Account Pending Approval" 
        subtitle={userEmail ? `Your account (${userEmail}) is waiting for approval.` : 'Your account is waiting for approval.'}
      />
      <p className="mt-4 text-gray-400">An administrator has been notified. Please wait for an approval notification before you can proceed. You may close this page.</p>
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
