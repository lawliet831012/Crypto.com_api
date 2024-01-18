/* Instruments */
// import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";

import type { ReduxThunkAction } from "@/lib/redux";


// export const messageParser = createAppAsyncThunk(
//   "websocket/message",
//   async (message) => {
//     const response = await fetchIdentityCount(amount);

//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   },
// );

export const messageParser =
  (messge: any): ReduxThunkAction =>
  (dispatch, getState) => {
    
  };
