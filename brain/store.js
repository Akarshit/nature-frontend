import create from 'zustand';
import { devtools } from 'zustand/middleware';
import * as search from 'brain/actions/search.action.js';
import * as tracker from 'brain/actions/tracker.action.js';
import * as auth from 'brain/actions/auth.action.js';

const useUIStore = create(
  devtools((set, get) => ({
    user: null,
    entryModal: false,
    toggleEntryModal: (entryModal) =>
      set({ entryModal: entryModal ?? !get().entryModal }, false, {
        type: 'setEntryModal',
        entryModal,
      }),
    searchInput: '',
    setSearchInput: (searchInput) =>
      set({ searchInput }, false, 'setSearchInput'),
    suggestedResults: [],
    getSuggestedResults: (query) => search.suggestAction(set, get, { query }),
    tracker: {},
    setTracker: (tracker) => set({ tracker }, false, 'setTracker'),
    createTracker: (tracker) => tracker.createTracker(set, get, { tracker }),
    oAuthLogin: (credential) => auth.oAuthLogin(set, get, { credential }),
  }))
);

module.exports = {
  useUIStore,
};
