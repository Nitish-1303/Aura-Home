
import React, { useState, useEffect, useCallback } from 'react';
import { Device, Rule, DeviceAction } from './types';
import { INITIAL_DEVICES } from './constants';
import Header from './components/Header';
import DeviceGrid from './components/DeviceGrid';
import RuleList from './components/RuleList';
import DataChart from './components/DataChart';
import RuleCreatorModal from './components/RuleCreatorModal';
import SmartAssistant from './components/SmartAssistant';
import SecurityPanel from './components/SecurityPanel';

const App: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [rules, setRules] = useState<Rule[]>([]);
  const [isRuleModalOpen, setRuleModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(devices[1]);
  const [history, setHistory] = useState<Record<string, { time: string; value: number }[]>>({
    'thermostat-1': [{ time: '10:00', value: 21 }]
  });

  const handleDeviceChange = useCallback((id: string, property: string, value: any) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === id ? { ...device, state: { ...device.state, [property]: value } } : device
      )
    );
  }, []);

  const executeActions = useCallback((actions: DeviceAction[]) => {
      actions.forEach(action => {
          handleDeviceChange(action.deviceId, action.property, action.value);
      });
  }, [handleDeviceChange]);

  const addRule = (rule: Rule) => {
    setRules(prevRules => [...prevRules, rule]);
  };
  
  const deleteRule = (ruleId: string) => {
    setRules(prevRules => prevRules.filter(rule => rule.id !== ruleId));
  };

  useEffect(() => {
    const simulationInterval = setInterval(() => {
      // 1. Simulate environmental changes
      setDevices(prevDevices => {
        return prevDevices.map(device => {
          if (device.type === 'sensor' && device.state.temperature) {
            const change = (Math.random() - 0.5) * 0.5; // Small fluctuation
            const newTemp = parseFloat((device.state.temperature + change).toFixed(1));
            return { ...device, state: { ...device.state, temperature: newTemp } };
          }
          if (device.type === 'light' && device.state.power === 'on' && device.state.energyUsage !== undefined) {
             const newEnergy = parseFloat((device.state.energyUsage + Math.random() * 0.01).toFixed(2));
             return { ...device, state: { ...device.state, energyUsage: newEnergy } };
          }
          return device;
        });
      });

      // 2. Update history for chart
      const now = new Date();
      const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const thermostat = devices.find(d => d.id === 'thermostat-1');
      if (thermostat && thermostat.state.temperature) {
        setHistory(prevHistory => {
          const newHistory = [...(prevHistory['thermostat-1'] || [])];
          if(newHistory.length > 20) newHistory.shift();
          newHistory.push({time: timeString, value: thermostat.state.temperature as number});
          return {...prevHistory, 'thermostat-1': newHistory};
        });
      }

    }, 3000);

    return () => clearInterval(simulationInterval);
  }, [devices]);

  useEffect(() => {
    // 3. Rule Engine
    const ruleEngineInterval = setInterval(() => {
      const deviceMap = new Map(devices.map(d => [d.id, d]));
      
      rules.forEach(rule => {
        const triggerDevice = deviceMap.get(rule.trigger.deviceId);
        if (!triggerDevice) return;

        const currentValue = triggerDevice.state[rule.trigger.property];
        let conditionMet = false;
        
        switch (rule.trigger.operator) {
          case '>': conditionMet = currentValue > rule.trigger.value; break;
          case '<': conditionMet = currentValue < rule.trigger.value; break;
          case '==': conditionMet = currentValue === rule.trigger.value; break;
        }

        if (conditionMet) {
          handleDeviceChange(rule.action.deviceId, rule.action.property, rule.action.value);
        }
      });
    }, 1000);

    return () => clearInterval(ruleEngineInterval);
  }, [rules, devices, handleDeviceChange]);

  return (
    <div className="min-h-screen bg-gray-900 font-sans p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          <DeviceGrid devices={devices} onDeviceChange={handleDeviceChange} onSelectDevice={setSelectedDevice} />
          <SmartAssistant onExecuteActions={executeActions} devices={devices} />
        </div>
        <div className="space-y-8">
          <RuleList rules={rules} devices={devices} onAddRule={() => setRuleModalOpen(true)} onDeleteRule={deleteRule} />
          {selectedDevice && (
            <DataChart 
              device={selectedDevice} 
              history={history[selectedDevice.id]}
            />
          )}
          <SecurityPanel />
        </div>
      </main>
      <RuleCreatorModal 
        isOpen={isRuleModalOpen}
        onClose={() => setRuleModalOpen(false)}
        devices={devices}
        onAddRule={addRule}
      />
    </div>
  );
};

export default App;
