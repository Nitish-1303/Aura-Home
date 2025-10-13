
import { Device } from './types';

export const INITIAL_DEVICES: Device[] = [
  {
    id: 'light-1',
    name: 'Living Room Lamp',
    type: 'light',
    room: 'Living Room',
    state: {
      power: 'off',
      brightness: 75,
      energyUsage: 0,
    },
  },
  {
    id: 'thermostat-1',
    name: 'Main Thermostat',
    type: 'thermostat',
    room: 'Hallway',
    state: {
      temperature: 21,
    },
  },
  {
    id: 'lock-1',
    name: 'Front Door',
    type: 'lock',
    room: 'Entrance',
    state: {
      lockStatus: 'locked',
    },
  },
  {
    id: 'sensor-1',
    name: 'Bedroom Sensor',
    type: 'sensor',
    room: 'Bedroom',
    state: {
      temperature: 22.5,
      humidity: 45,
    },
  },
  {
    id: 'light-2',
    name: 'Kitchen Overhead',
    type: 'light',
    room: 'Kitchen',
    state: {
        power: 'on',
        brightness: 90,
        energyUsage: 0.08,
    }
  },
  {
    id: 'camera-1',
    name: 'Porch Camera',
    type: 'camera',
    room: 'Outside',
    state: {
        isStreaming: false,
    }
  }
];
