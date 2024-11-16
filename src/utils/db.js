import PocketBase from 'pocketbase';

export const pbdb = new PocketBase(import.meta.env.VITE_POCKET_BASE_URL);
