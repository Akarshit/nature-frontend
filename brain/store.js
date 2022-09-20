import * as auth from '#actions/auth';
import * as checkout from '#actions/checkout';
import * as contact from '#actions/contact';
import * as plans from '#actions/plan';
import * as search from '#actions/search';
import * as tracker from '#actions/tracker';

import create from 'zustand';
import { devtools } from 'zustand/middleware';
import moment from 'moment';
import { persist } from 'zustand/middleware';
import pipe from 'pipe-functions';
import produce from 'immer';

const store = (set, get) => ({
  user: null,
  sub: {},
  plans: [],
  getPlans: () => plans.getPlans(set, get),
  setUser: (user) => {
    set({ user }, false, { type: 'setUser', user });
  },
  updateUser: ({ user, calle } = {}) =>
    auth.updateUser(set, get, { user, calle }),
  planSlug: null,
  setPlanSlug: (slug) =>
    set({ planSlug: slug }, false, { type: 'setPlanSlug', slug }),
  trackErrors: {},
  setTrackErrors: (trackErrors) =>
    set({ trackErrors }, false, { type: 'setTrackErrors', trackErrors }),
  loading: null,
  setLoading: (loading) =>
    set({ loading }, false, { type: 'setLoading', loading }),
  entryModal: false,
  toggleEntryModal: (entryModal) =>
    set({ entryModal: entryModal ?? !get().entryModal }, false, {
      type: 'setEntryModal',
      entryModal,
    }),
  searchInput: '',
  trackerInput: {
    outingId: '',
    startDate: null,
    endDate: null,
    equipmentType: 'Tent',
    groupSize: 1,
  },
  setSearchInput: (val) => {
    set({ searchInput: val }, false, 'setSearchInput');
  },
  outing: {},
  setOuting: (outing) => set({ outing }, false, 'setOuting'),
  setOutingId: (val) => {
    set(
      produce((state) => {
        state.trackerInput.outingId = val;
      }),
      false,
      { type: 'setOutingId', val }
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
  setEquipmentType: (val) => {
    set(
      produce((state) => {
        state.trackerInput.equipmentType = val;
      }),
      false,
      'setEquipmentType'
    );
  },

  setGroupSize: (val) => {
    set(
      produce((state) => {
        state.trackerInput.groupSize = val;
      }),
      false,
      'setGroupSize'
    );
  },

  suggestedResults: [],
  getSuggestedResults: (query) => search.suggestAction(set, get, { query }),
  showSuggestions: false,
  setShowSuggestions: (val) => {
    set({ showSuggestions: val }, false, 'setShowSuggestions');
  },
  showContactModal: false,
  contactModalError: '',
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
  showPricingModal: false,
  setShowPricingModal: (val) => {
    set({ showPricingModal: val }, false, 'setShowPricingModal');
  },
  togglePricingModal: (showPricingModal) =>
    set(
      { showPricingModal: showPricingModal ?? !get().showPricingModal },
      false,
      {
        type: 'toggleEntryModal',
        showPricingModal,
      }
    ),
  registerContact: () => contact.register(set, get),
  verifyContact: () => contact.verify(set, get),
  createTracker: ({ subId }) => tracker.createTracker(set, get, { subId }),
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
  toast: {},
  setToast: (toast) => set({ toast }, false, { type: 'setToast', toast }),
  initializePayment: ({ card }) =>
    checkout.initializePayment(set, get, { card }),
  card: null,
  setCard: (card) => set({ card }, false, { type: 'setCard', card }),
  cardError: '',
  setCardError: (cardError) =>
    set({ cardError }, false, { type: 'setCardError', cardError }),
  createSub: (sub) => sub.create(set, get, { sub }),
  address: {
    firstName: '',
    lastName: '',
    line1: '',
    line2: '',
    state: '',
    country: 'US',
    city: '',
    zipcode: '',
  },
  setAddress: (address) =>
    set({ address }, false, { type: 'setAddress', address }),
  getTrackers: () => tracker.getTrackers(set, get),
  trackers: [],
});

const persistParams = {
  partialize: (state) =>
    Object.fromEntries(
      Object.entries(state).filter(
        ([key]) => !['trackerInput', 'loading'].includes(key)
      )
    ),
  getStorage: () => ({
    // Returning a promise from getItem is necessary to avoid issues with hydration
    getItem: async (name) =>
      new Promise((res) => {
        if (!localStorage) return;
        setTimeout(() => res(localStorage.getItem(name)), 1000);
      }),
    setItem: (name, value) => {
      if (!localStorage) return;
      localStorage.setItem(name, value);
    },
    removeItem: (name) => {
      if (!localStorage) return;
      localStorage.removeItem(name);
    },
  }),
};

const useUIStore = create(devtools(persist(store, persistParams)));

module.exports = {
  useUIStore,
};
