/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import ReconnectingWebSocket from 'reconnecting-websocket';

const initialState: websocketState = {
  connection: {},
};

function initialWebSocket(url: string, protocols = [], options = {}): any {
  const wss = new ReconnectingWebSocket(`wss://${url}`, protocols, {
    ...options,
    minReconnectionDelay: 3000,
    connectionTimeout: 3000,
    minUptime: 3000,
  });

  wss.onopen = onOpen;
  wss.onclose = onClose;
  wss.onmessage = onMessage;
  wss.onerror = onError;
  return wss;
}

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    connect: (state, action: PayloadAction<websocketOption>) => {
      const { url, id } = action.payload;
      const wss = initialWebSocket(url);
      state.connection = { ...state.connection, [id]: wss };
    },
    disconnect: (state, action: PayloadAction<string>) => {
      state.connection[action.payload].close();
      state.connection[action.payload] = undefined;
    },
  },
  extraReducers: builder => {},
});

function onOpen(event: any): void {}
function onClose(event: any): void {}
function onMessage(event: any): void {}
function onError(event: any): void {}

/* Types */
export type websocketState = {
  connection: Record<string, any>;
};

export type websocketOption = {
  id: string;
  url: string;
};
