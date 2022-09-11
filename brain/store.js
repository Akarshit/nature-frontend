import create from 'zustand';
import { devtools } from 'zustand/middleware';
import * as search from 'brain/actions/search.action.js';
import * as tracker from 'brain/actions/tracker.action.js';

const useUIStore = create(
  devtools((set, get) => ({
    searchInput: '',
    setSearchInput: (val) => set({ searchInput: val }, false, 'setSearchInput'),
    suggestedResults: [],
    getSuggestedResults: (query) => search.suggestAction(set, get, { query }),
    tracker: {},
    setTracker: (tracker) => set({ tracker }, false, 'setTracker'),
    createTracker: (tracker) => tracker.createTracker(set, get, { tracker }),
  }))
);

module.exports = {
  useUIStore,
};
