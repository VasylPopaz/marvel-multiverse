interface Env {
  baseURL: string;
  publicKey: string;
  privateKey: string;
}
export const getEnv = (() => {
  const env: Readonly<Env> = Object.freeze({
    baseURL: import.meta.env.VITE_BASE_URL,
    publicKey: import.meta.env.VITE_PUBLIC_KEY,
    privateKey: import.meta.env.VITE_PRIVATE_KEY,
  });

  return () => env;
})();
