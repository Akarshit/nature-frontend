import create from 'zustand';
import { devtools } from 'zustand/middleware';
import * as search from 'brain/actions/search.action.js';
import * as tracker from 'brain/actions/tracker.action.js';
import * as auth from 'brain/actions/auth.action.js';
import produce from 'immer';
import { persist } from 'zustand/middleware';

const useUIStore = create(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        entryModal: false,
        toggleEntryModal: (entryModal) =>
          set({ entryModal: entryModal ?? !get().entryModal }, false, {
            type: 'setEntryModal',
            entryModal,
          }),
        searchInput: '',
        trackerInput: {
          entityId: '',
          startDate: new Date().toJSON().slice(0, 10),
          endDate: new Date().toJSON().slice(0, 10),
        },
        setSearchInput: (val) => {
          set({ searchInput: val }, false, 'setSearchInput');
        },
        setEntityId: (val) => {
          set(
            produce((state) => {
              state.trackerInput.entityId = val;
            }),
            false,
            { type: 'setEntityId', val }
          );
        },
        setStartDate: (val) => {
          set(
            produce((state) => {
              state.trackerInput.startDate = val;
            }),
            false,
            'setStartDate'
          );
        },
        setEndDate: (val) => {
          set(
            produce((state) => {
              state.trackerInput.endDate = val;
            }),
            false,
            'setEndDate'
          );
        },

        suggestedResults: [],
        getSuggestedResults: (query) =>
          search.suggestAction(set, get, { query }),
        showSuggestions: false,
        setShowSuggestions: (val) => {
          set({ showSuggestions: val }, false, 'setShowSuggestions');
        },
        createTracker: () => tracker.createTracker(set, get),
        oAuthLogin: (credential) => auth.oAuthLogin(set, get, { credential }),
        logoutUser: () => auth.logoutUser(set, get),
      }),
      {
        name: 'ui-storage', // name of item in the storage (must be unique)
        partialize: (state) => ({}),
      }
    )
  )
);

module.exports = {
  useUIStore,
};
