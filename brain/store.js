import * as auth from '#actions/auth';
import * as checkout from '#actions/checkout';
import * as contact from '#actions/contact';
import * as search from '#actions/search';
import * as tracker from '#actions/tracker';

import create from 'zustand';
import { devtools } from 'zustand/middleware';
import moment from 'moment';
import produce from 'immer';

const useUIStore = create(
  devtools((set, get) => ({
    user: null,
    planSlug: 'pay-as-you-go',
    setPlanSlug: (slug) =>
      set({ planSlug: slug }, false, { type: 'setPlanSlug', slug }),
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
      startDate: moment(),
      endDate: moment(),
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
    initializePayment: () => checkout.handlePaymentMethodSubmission(set, get),
    card: null,
    setCard: (card) => set({ card }, false, { type: 'setCard', card }),
    cardError: '',
    setCardError: (cardError) =>
      set({ cardError }, false, { type: 'setCardError', cardError }),
    createSub: (sub) => sub.create(set, get, { sub }),
    activateTracker: ({ trackerId, subId }) =>
      tracker.activateTracker(set, get, { trackerId, subId }),
    address: {
      firstName: '',
      lastName: '',
      line1: '',
      line2: '',
      state: '',
      country: 'USA',
      city: '',
      zipcode: '',
    },
    setAddress: (address) =>
      set({ address }, false, { type: 'setAddress', address }),
  }))
);

module.exports = {
  useUIStore,
};
