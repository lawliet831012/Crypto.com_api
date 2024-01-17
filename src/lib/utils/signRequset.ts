import crypto from "crypto-js";

const apiKey: string = "zVgfCkKmF6zaPWENNgiD8E"; /* User API Key */
const apiSecret: string = "NYTBk69YtHKFqNYWD2ErrR"; /* User API Secret */

export const signRequest = (payload: Payload): string => {
    const { id, method, params, nonce } = payload;
  
    // eslint-disable-next-line eqeqeq
    function isObject(obj: any): boolean { return obj !== undefined && obj !== null && obj.constructor == Object; }
    // eslint-disable-next-line eqeqeq
    function isArray(obj: any): boolean { return obj !== undefined && obj !== null && obj.constructor == Array; }
    function arrayToString(obj: any[]): string { return obj.reduce((a,b) => { return a + (isObject(b) ? objectToString(b) : (isArray(b) ? arrayToString(b) : b)); }, ""); }
    function objectToString(obj: object): string { return (obj == null ? "" : Object.keys(obj).sort().reduce((a, b) => { return a + b + (isArray(obj[b]) ? arrayToString(obj[b]) : (isObject(obj[b]) ? objectToString(obj[b]) : obj[b])); }, "")); }
  
    const paramsString = objectToString(params);
  
    const sigPayload = method + id + apiKey + paramsString + nonce;
    return crypto.HmacSHA256(sigPayload, apiSecret).toString(crypto.enc.Hex);
};

type Payload = {
    sig?: any;
    id?: number | string;
    method: string;
    params?: any;
    nonce?: number | string;
}
  
//   const request = {
//     id: 11,
//     method: "private/get-order-detail",
//     api_key: apiKey,
//     params: {
//       order_id: 53287421324
//     },
//     nonce: 1587846358253,
//   };
  
//   const requestBody = JSON.stringify(signRequest(request, apiKey, apiSecret));