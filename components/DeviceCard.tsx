
import React from 'react';
import { Device } from '../types';

interface DeviceCardProps {
  device: Device;
  onDeviceChange: (id: string, property: string, value: any) => void;
  onSelectDevice: (device: Device) => void;
}

const ICONS: Record<Device['type'], React.ReactNode> = {
    light: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707M12 21v-1m0-16a4 4 0 00-4 4h8a4 4 0 00-4-4z" /></svg>,
    thermostat: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /><path d="M7 12a5 5 0 0110 0v5a5 5 0 01-10 0v-5z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /><path d="M12 4a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>,
    lock: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    sensor: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0h6" /></svg>,
    camera: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
};

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onDeviceChange, onSelectDevice }) => {
    const { id, name, type, room, state } = device;
    const isActive = state.power === 'on' || state.lockStatus === 'unlocked' || state.isStreaming === true;

    const renderControls = () => {
        switch (type) {
            case 'light':
                return (
                    <>
                        <button
                            onClick={() => onDeviceChange(id, 'power', state.power === 'on' ? 'off' : 'on')}
                            className={`w-full py-2 rounded-md text-sm font-semibold transition-colors ${state.power === 'on' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-gray-600 hover:bg-gray-500'}`}
                        >
                            {state.power === 'on' ? 'Turn Off' : 'Turn On'}
                        </button>
                        {state.power === 'on' && (
                            <div className="mt-4">
                                <label htmlFor={`brightness-${id}`} className="block text-xs text-gray-400 mb-1">Brightness: {state.brightness}%</label>
                                <input
                                    id={`brightness-${id}`}
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={state.brightness}
                                    onChange={(e) => onDeviceChange(id, 'brightness', parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                                />
                            </div>
                        )}
                    </>
                );
            case 'thermostat':
                return (
                     <div className="flex items-center justify-center space-x-2 mt-2">
                        <button onClick={() => onDeviceChange(id, 'temperature', (state.temperature || 0) - 1)} className="p-2 bg-gray-600 rounded-full hover:bg-gray-500">-</button>
                        <span className="text-lg font-bold w-16 text-center">{state.temperature}°C</span>
                        <button onClick={() => onDeviceChange(id, 'temperature', (state.temperature || 0) + 1)} className="p-2 bg-gray-600 rounded-full hover:bg-gray-500">+</button>
                    </div>
                );
            case 'lock':
                return (
                     <button
                        onClick={() => onDeviceChange(id, 'lockStatus', state.lockStatus === 'locked' ? 'unlocked' : 'locked')}
                        className={`w-full py-2 rounded-md text-sm font-semibold transition-colors ${state.lockStatus === 'unlocked' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                    >
                        {state.lockStatus === 'locked' ? 'Unlock' : 'Lock'}
                    </button>
                );
            case 'camera':
                 return (
                     <button
                        onClick={() => onDeviceChange(id, 'isStreaming', !state.isStreaming)}
                        className={`w-full py-2 rounded-md text-sm font-semibold transition-colors ${state.isStreaming ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-gray-600 hover:bg-gray-500'}`}
                    >
                        {state.isStreaming ? 'Stop Stream' : 'Start Stream'}
                    </button>
                 );
            default:
                return null;
        }
    };
    
    const renderStatus = () => {
       switch(type) {
           case 'light': return state.power === 'on' ? `${state.brightness}%` : 'Off';
           case 'thermostat': return `${state.temperature}°C`;
           case 'lock': return state.lockStatus === 'locked' ? 'Locked' : 'Unlocked';
           case 'sensor': return `${state.temperature}°C / ${state.humidity}%`;
           case 'camera': return state.isStreaming ? 'Streaming' : 'Offline';
           default: return null;
       }
    }

    return (
        <div 
            className={`bg-gray-700 p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-cyan-500/20 hover:ring-1 hover:ring-cyan-500/50 ${type === 'thermostat' || type === 'sensor' ? 'cursor-pointer' : ''}`}
            onClick={() => {if (type === 'thermostat' || type === 'sensor') onSelectDevice(device);}}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="font-semibold text-white">{name}</h3>
                    <p className="text-xs text-gray-400">{room}</p>
                </div>
                <div className={`p-2 rounded-full ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-gray-600/50 text-gray-400'}`}>
                    {ICONS[type]}
                </div>
            </div>
            <div className="mt-4 min-h-[4rem]">
                <p className={`text-2xl font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                    {renderStatus()}
                </p>
                {type === 'light' && state.power === 'on' && state.energyUsage !== undefined && (
                    <p className="text-xs text-gray-400 mt-1">Energy: {state.energyUsage.toFixed(2)} kWh</p>
                )}
            </div>
            <div className="mt-4">
                {renderControls()}
            </div>
        </div>
    );
};

export default DeviceCard;
