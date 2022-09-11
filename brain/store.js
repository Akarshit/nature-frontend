import create from 'zustand';
import { devtools } from 'zustand/middleware';
import * as search from 'brain/actions/search.action.js';

const useUIStore = create(
  devtools((set, get) => ({
    searchInput: '',
    setSearchInput: (val) => set({ searchInput: val }, false, 'setSearchInput'),
    suggestedResults: [],
    getSuggestedResults: (query) => search.suggestAction(set, get, { query }),
  }))
);

module.exports = {
  useUIStore,
};
