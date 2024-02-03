import PocketBase from 'pocketbase';
import eventsource from 'react-native-sse';
// @ts-ignore
global.EventSource = eventsource;

// http://10.0.0.104:19000
export const pb = new PocketBase('http://10.0.2.2:8090');
