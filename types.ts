
export interface Device {
  id: string;
  name: string;
  type: 'light' | 'thermostat' | 'lock' | 'sensor' | 'camera';
  room: string;
  state: {
    power?: 'on' | 'off';
    brightness?: number;
    temperature?: number;
    humidity?: number;
    lockStatus?: 'locked' | 'unlocked';
    isStreaming?: boolean;
    energyUsage?: number;
  };
}

export interface Trigger {
  deviceId: string;
  property: string;
  operator: '>' | '<' | '==';
  value: any;
}

export interface DeviceAction {
  deviceId: string;
  property: string;
  value: any;
}

export interface Rule {
  id: string;
  name: string;
  trigger: Trigger;
  action: DeviceAction;
}
