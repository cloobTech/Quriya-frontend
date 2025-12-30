if (!import.meta.env.VITE_QUARIYA_BASE_URL) {
  throw new Error(
    "❌ VITE_QUARIYA_BASE_URL is not defined! Check your .env file."
  );
}

export const BASE_URL = import.meta.env.VITE_QUARIYA_BASE_URL;
