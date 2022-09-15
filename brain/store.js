import * as auth from '#actions/auth';
import * as checkout from '#actions/checkout';
import * as contact from '#actions/contact';
import * as search from '#actions/search';
import * as sub from '#actions/sub';
import * as tracker from '#actions/tracker';

import create from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';

const useUIStore = create(
  devtools((set, get) => ({
    user: null,
    planId: '63211c1238b1cbed6f8b2c4c',
    paymentResult: {},
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
      outingId: '',
      startDate: new Date().toJSON().slice(0, 10),
      endDate: new Date().toJSON().slice(0, 10),
      equipmentType: 'Tent',
      groupSize: 1,
    },
    setSearchInput: (val) => {
      set({ searchInput: val }, false, 'setSearchInput');
    },
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
    toast: {},
    setToast: (toast) => set({ toast }, false, { type: 'setToast', toast }),
    initializePayment: (card) =>
      checkout.handlePaymentMethodSubmission(set, get, { card }),
    cardError: '',
    setCardError: (cardError) =>
      set({ cardError }, false, { type: 'setCardError', cardError }),
    createSub: (sub) => sub.create(set, get, { sub }),
    activateTracker: ({ trackerId, subId }) =>
      tracker.activateTracker(set, get, { trackerId, subId }),
  }))
);

module.exports = {
  useUIStore,
};
