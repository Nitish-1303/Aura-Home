import { GoogleGenAI, FunctionDeclaration, Type } from '@google/genai';
import { Device, DeviceAction } from '../types';

// This is a placeholder for the API key.
// In a real application, this should be handled securely.
const API_KEY = process.env.API_KEY; 
if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const setDeviceStateFunctionDeclaration: FunctionDeclaration = {
  name: 'setDeviceState',
  description: 'Sets the state of a smart home device, such as turning it on/off or adjusting brightness/temperature.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      deviceId: {
        type: Type.STRING,
        description: 'The unique identifier of the device to control.',
      },
      property: {
        type: Type.STRING,
        description: 'The property of the device to change (e.g., "power", "brightness", "temperature", "lockStatus").',
      },
      value: {
        // Fix: Property 'ANY' does not exist on type 'typeof Type'. Changed to STRING.
        type: Type.STRING,
        description: 'The new value for the property. For power, use "on" or "off". For lockStatus, use "locked" or "unlocked". For brightness or temperature, use a number as a string.',
      },
    },
    required: ['deviceId', 'property', 'value'],
  },
};

export const parseCommand = async (command: string, devices: Device[]): Promise<{actions: DeviceAction[], summary: string}> => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }
  
  const deviceContext = devices.map(d => `- Device: "${d.name}" (id: ${d.id}, type: ${d.type}, room: ${d.room})`).join('\n');

  const systemInstruction = `You are a smart home assistant. The user will give you a command to control their smart devices.
Your job is to identify the correct devices and properties and use the 'setDeviceState' function to perform the actions.
If a device name is ambiguous, choose the most likely one based on the context. 
If a command is unclear, ask for clarification.
After determining the function calls, provide a brief, friendly summary of the actions you are taking (e.g., "Okay, turning on the living room light.").

Available devices:
${deviceContext}`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: command,
    config: {
      systemInstruction,
      tools: [{ functionDeclarations: [setDeviceStateFunctionDeclaration] }],
    },
  });

  const actions: DeviceAction[] = [];
  if (response.functionCalls) {
    for (const fc of response.functionCalls) {
      if (fc.name === 'setDeviceState') {
        const { deviceId, property, value } = fc.args;
        // Fix: Add type checks for function call arguments which are of type 'unknown'.
        // This resolves the 'Type 'unknown' is not assignable to type 'string'' error.
        if (typeof deviceId === 'string' && typeof property === 'string' && value !== undefined) {
          const deviceExists = devices.some(d => d.id === deviceId);
          if (deviceExists) {
            let parsedValue = value;
            // The model might return a number as a string, so we parse it.
            if (typeof value === 'string' && value.trim() !== '' && !isNaN(Number(value))) {
              parsedValue = Number(value);
            }
            actions.push({ deviceId, property, value: parsedValue });
          }
        }
      }
    }
  }
  
  const summary = response.text || "Okay, done.";

  return { actions, summary };
};
