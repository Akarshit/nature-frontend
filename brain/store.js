import create from 'zustand';
import { devtools } from 'zustand/middleware';

const useUIStore = create(
  devtools((set) => ({
    bears: 0,
    increasePopulation: () =>
      set((state) => ({ bears: state.bears + 1 }), false, 'increasePopulation'),
  }))
);

module.exports = {
  useUIStore,
};
