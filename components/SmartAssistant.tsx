
import React, { useState } from 'react';
import { parseCommand } from '../services/geminiService';
import { Device, DeviceAction } from '../types';

interface SmartAssistantProps {
    onExecuteActions: (actions: DeviceAction[]) => void;
    devices: Device[];
}

const SmartAssistant: React.FC<SmartAssistantProps> = ({ onExecuteActions, devices }) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [lastResponse, setLastResponse] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError('');
        setLastResponse('');

        try {
            const result = await parseCommand(prompt, devices);
            if (result.actions.length > 0) {
                onExecuteActions(result.actions);
            }
            setLastResponse(result.summary);
        } catch (err) {
            console.error(err);
            setError('Sorry, I couldn\'t understand that command. Please try again.');
        } finally {
            setIsLoading(false);
            setPrompt('');
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 text-white">Aura Assistant</h2>
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 'Turn on the living room lamp and lock the front door'"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                    disabled={isLoading}
                />
                <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    )}
                </button>
            </form>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            {lastResponse && <p className="text-cyan-400 text-sm mt-2">Aura: {lastResponse}</p>}
        </div>
    );
};

export default SmartAssistant;
