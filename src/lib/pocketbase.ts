import PocketBase from 'pocketbase';
import eventsource from 'react-native-sse';
// @ts-ignore
global.EventSource = eventsource;

export const pb = new PocketBase('http://10.0.2.2:8090');
