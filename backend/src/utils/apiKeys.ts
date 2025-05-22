// Stored Key to be used when fetching data
// eslint-disable to ignore Content-Type naming-convention

import { API_KEY } from "./config";

 // assigned the key to the variable apiKey.
const apiKey: string = API_KEY as string;

// Use this defaultHeader when fetching the external API
export const defaultHeaderFetch = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
    'authorization': `Bearer ${apiKey}`
};