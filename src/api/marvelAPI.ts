import axios from "axios";
import md5 from "md5";

import { getEnv } from "./../utils";

const { baseURL, publicKey, privateKey } = getEnv();

const ts = new Date().getTime();
const hash = md5(ts + privateKey + publicKey);

export const marvelAPI = axios.create({
  baseURL,
  params: {
    apikey: publicKey,
    ts,
    hash,
  },
});
