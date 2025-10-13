
import React from 'react';
import { Rule, Device } from '../types';

interface RuleListProps {
  rules: Rule[];
  devices: Device[];
  onAddRule: () => void;
  onDeleteRule: (ruleId: string) => void;
}

const RuleList: React.FC<RuleListProps> = ({ rules, devices, onAddRule, onDeleteRule }) => {
  const getDeviceName = (id: string) => devices.find(d => d.id === id)?.name || 'Unknown Device';

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Automation Rules</h2>
        <button onClick={onAddRule} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md transition-colors text-sm">
          + Add Rule
        </button>
      </div>
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {rules.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">No rules created yet. Click 'Add Rule' to start automating!</p>
        ) : (
          rules.map(rule => (
            <div key={rule.id} className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
              <div>
                <p className="font-semibold text-sm text-white">{rule.name}</p>
                <p className="text-xs text-gray-400">
                  IF {getDeviceName(rule.trigger.deviceId)} is {rule.trigger.operator} {rule.trigger.value} 
                  THEN {getDeviceName(rule.action.deviceId)} {rule.action.property} to {rule.action.value}
                </p>
              </div>
               <button onClick={() => onDeleteRule(rule.id)} className="text-gray-500 hover:text-red-500 transition-colors p-1">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RuleList;
