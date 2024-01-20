/* Instruments */
import { sendMessage } from '@/lib/redux';
import type { ReduxThunkAction, messageType } from '@/lib/redux';

export const messageParser: Record<
  string,
  (name: string, message: messageType) => ReduxThunkAction
> = {
  'public/heartbeat': (name, messge) => (dispatch, getState) => {
    const { id } = messge;
    sendMessage(name, { id, method: 'public/respond-heartbeat' });
  },
  subscribe: (name, messge) => (dispatch, getState) => {
    // const { result = {} } = messge;
    // const { channel, data, instrument_name, subscription, depth } = result;
  },
};
