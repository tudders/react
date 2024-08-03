import { create } from 'zustand';

//refer: https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam
//@ts-ignore
import getBrowserFingerprint from 'get-browser-fingerprint';

const fingerprint = getBrowserFingerprint();

type State = {
  fingerprint: string;
  loggedIn: boolean;
};

const useStore = create<State>(() => ({
  fingerprint: fingerprint,
  loggedIn: false,
}));

export default useStore;
