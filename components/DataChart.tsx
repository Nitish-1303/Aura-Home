
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Device } from '../types';

interface DataChartProps {
  device: Device;
  history?: { time: string; value: number }[];
}

const DataChart: React.FC<DataChartProps> = ({ device, history }) => {
  if (!history || history.length === 0) {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 text-white">History: {device.name}</h2>
            <div className="h-60 flex items-center justify-center">
                <p className="text-gray-400">No historical data available for this device.</p>
            </div>
        </div>
    );
  }

  const property = device.type === 'thermostat' || device.type === 'sensor' ? 'temperature' : 'value';

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg animate-fade-in">
        <h2 className="text-xl font-semibold mb-4 text-white">History: {device.name}</h2>
        <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3c3c3c" />
                    <XAxis dataKey="time" stroke="#a0a0a0" fontSize={12} />
                    <YAxis stroke="#a0a0a0" fontSize={12} domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #3c3c3c' }} />
                    <Legend />
                    <Line type="monotone" dataKey="value" name={property} stroke="#22d3ee" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};

export default DataChart;
