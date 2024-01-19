/* Instruments */
// import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import { sendMessage  } from '@/lib/redux';
import type { ReduxThunkAction, messageType } from '@/lib/redux';

// export const messageParser = createAppAsyncThunk(
//   "websocket/message",
//   async (message) => {
//     const response = await fetchIdentityCount(amount);

//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   },
// );

export const messageParser:Record<string, (name: string, message: messageType) => ReduxThunkAction> = {
  "public/heartbeat": (name, messge) =>
  (dispatch, getState) => {
    const { id } = messge;
    sendMessage(name, { id, type: 'public/respond-heartbeat' });
  },
};


  
