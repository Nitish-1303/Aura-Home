
import React from 'react';
import { Device } from '../types';
import DeviceCard from './DeviceCard';

interface DeviceGridProps {
  devices: Device[];
  onDeviceChange: (id: string, property: string, value: any) => void;
  onSelectDevice: (device: Device) => void;
}

const DeviceGrid: React.FC<DeviceGridProps> = ({ devices, onDeviceChange, onSelectDevice }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg animate-fade-in">
        <h2 className="text-xl font-semibold mb-4 text-white">My Devices</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {devices.map(device => (
            <DeviceCard 
              key={device.id} 
              device={device} 
              onDeviceChange={onDeviceChange}
              onSelectDevice={onSelectDevice}
            />
        ))}
        </div>
    </div>
  );
};

export default DeviceGrid;
