import create from 'zustand';
import { devtools } from 'zustand/middleware';
import * as search from '#actions/search';
import * as tracker from '#actions/tracker';
import * as auth from '#actions/auth';
import * as contact from '#actions/contact';
import produce from 'immer';

const useUIStore = create(
  devtools((set, get) => ({
    user: null,
    setUser: (user) => {
      set({ user }, false, { type: 'setUser', user });
    },
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
    getSuggestedResults: (query) => search.suggestAction(set, get, { query }),
    showSuggestions: false,
    setShowSuggestions: (val) => {
      set({ showSuggestions: val }, false, 'setShowSuggestions');
    },
    contactModal: false,
    toggleContactModal: (showContactModal) =>
      set(
        { showContactModal: showContactModal ?? !get().showContactModal },
        false,
        {
          type: 'toggleEntryModal',
          showContactModal,
        }
      ),
    contactInput: {
      contactId: '',
      type: 'phone',
    },
    setContactIdInput: (contactId) => {
      set(
        produce((state) => {
          state.contactInput.contactId = contactId;
        }),
        false,
        {
          type: 'setContactInput',
          contactId,
        }
      );
    },
    registerContact: () => contact.register(set, get),
    verifyContact: () => contact.verify(set, get),
    createTracker: () => tracker.createTracker(set, get),
    oAuthLogin: (credential) => auth.oAuthLogin(set, get, { credential }),
    logoutUser: () => auth.logoutUser(set, get),
    otp: '',
    setOTP: (val) => {
      set({ otp: val }, false, 'setOTP');
    },
    showUserDropdown: false,
    toggleUserDropdown: (showUserDropdown) =>
      set(
        { showUserDropdown: showUserDropdown ?? !get().showUserDropdown },
        false,
        {
          type: 'toggleUserDropdown',
          showUserDropdown,
        }
      ),
  }))
);

module.exports = {
  useUIStore,
};
