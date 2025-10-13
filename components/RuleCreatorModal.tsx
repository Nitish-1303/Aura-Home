
import React, { useState, useMemo } from 'react';
import { Device, Rule, Trigger, DeviceAction } from '../types';

interface RuleCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  devices: Device[];
  onAddRule: (rule: Rule) => void;
}

const RuleCreatorModal: React.FC<RuleCreatorModalProps> = ({ isOpen, onClose, devices, onAddRule }) => {
  const [ruleName, setRuleName] = useState('');
  const [triggerDeviceId, setTriggerDeviceId] = useState('');
  const [triggerProperty, setTriggerProperty] = useState('');
  const [triggerOperator, setTriggerOperator] = useState('>');
  const [triggerValue, setTriggerValue] = useState('');
  
  const [actionDeviceId, setActionDeviceId] = useState('');
  const [actionProperty, setActionProperty] = useState('');
  const [actionValue, setActionValue] = useState('');

  const triggerDevice = useMemo(() => devices.find(d => d.id === triggerDeviceId), [devices, triggerDeviceId]);
  const actionDevice = useMemo(() => devices.find(d => d.id === actionDeviceId), [devices, actionDeviceId]);

  const triggerProperties = triggerDevice ? Object.keys(triggerDevice.state) : [];
  const actionProperties = actionDevice ? Object.keys(actionDevice.state) : [];

  const handleAddRule = () => {
    if (!ruleName || !triggerDeviceId || !triggerProperty || !triggerValue || !actionDeviceId || !actionProperty || actionValue === '') {
        alert('Please fill all fields');
        return;
    }
    const newRule: Rule = {
      id: `rule-${Date.now()}`,
      name: ruleName,
      trigger: {
        deviceId: triggerDeviceId,
        property: triggerProperty,
        operator: triggerOperator as Trigger['operator'],
        value: isNaN(Number(triggerValue)) ? triggerValue : Number(triggerValue),
      },
      action: {
        deviceId: actionDeviceId,
        property: actionProperty,
        value: isNaN(Number(actionValue)) ? actionValue : Number(actionValue),
      },
    };
    onAddRule(newRule);
    // Reset form and close
    setRuleName('');
    setTriggerDeviceId('');
    setActionDeviceId('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-2xl text-white">
        <h2 className="text-2xl font-bold mb-6">Create New Automation Rule</h2>
        
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">Rule Name</label>
            <input type="text" value={ruleName} onChange={e => setRuleName(e.target.value)} placeholder="e.g., 'Evening Mode'" className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500"/>
        </div>

        {/* IF / Trigger */}
        <fieldset className="border border-gray-600 p-4 rounded-md">
          <legend className="px-2 font-semibold text-cyan-400">IF (Trigger)</legend>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <select value={triggerDeviceId} onChange={e => setTriggerDeviceId(e.target.value)} className="md:col-span-2 w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500">
              <option value="">Select Device...</option>
              {devices.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <select value={triggerProperty} onChange={e => setTriggerProperty(e.target.value)} disabled={!triggerDevice} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50">
              <option value="">Select Property...</option>
              {triggerProperties.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <div className="flex">
              <select value={triggerOperator} onChange={e => setTriggerOperator(e.target.value)} className="bg-gray-700 border border-gray-600 rounded-l-md p-2 focus:ring-cyan-500 focus:border-cyan-500">
                <option value=">">&gt;</option>
                <option value="<">&lt;</option>
                <option value="==">==</option>
              </select>
              <input type="text" value={triggerValue} onChange={e => setTriggerValue(e.target.value)} placeholder="Value" className="w-full bg-gray-700 border border-gray-600 rounded-r-md p-2 focus:ring-cyan-500 focus:border-cyan-500"/>
            </div>
          </div>
        </fieldset>

        {/* THEN / Action */}
        <fieldset className="border border-gray-600 p-4 rounded-md mt-6">
          <legend className="px-2 font-semibold text-cyan-400">THEN (Action)</legend>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <select value={actionDeviceId} onChange={e => setActionDeviceId(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500">
              <option value="">Select Device...</option>
              {devices.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <select value={actionProperty} onChange={e => setActionProperty(e.target.value)} disabled={!actionDevice} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50">
              <option value="">Select Property...</option>
              {actionProperties.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <input type="text" value={actionValue} onChange={e => setActionValue(e.target.value)} placeholder="Set Value to..." className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
        </fieldset>

        <div className="flex justify-end mt-8 space-x-4">
          <button onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors">Cancel</button>
          <button onClick={handleAddRule} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md transition-colors">Save Rule</button>
        </div>
      </div>
    </div>
  );
};

export default RuleCreatorModal;
