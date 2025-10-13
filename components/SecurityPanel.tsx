
import React from 'react';

const SecurityPanel: React.FC = () => {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 text-white">Security Status</h2>
            <div className="space-y-3">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500/20 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l4.5-4.5a2 2 0 012.828 0l4.5 4.5a12.02 12.02 0 008.618-14.47z" /></svg>
                    </div>
                    <div>
                        <p className="font-medium text-sm text-white">System Secure</p>
                        <p className="text-xs text-gray-400">End-to-end encryption active.</p>
                    </div>
                </div>
                 <div className="flex items-center space-x-3">
                    <div className="p-2 bg-cyan-500/20 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    </div>
                    <div>
                        <p className="font-medium text-sm text-white">Network Status</p>
                        <p className="text-xs text-gray-400">All devices connected locally.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityPanel;
