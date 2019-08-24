import units from '@/assets/data/units.json';

export default {
  namespaced: true,

  state: {
      units
  },

  getters: {
    getById: state => id => state.units.find(unit => unit.id == id)
  }
};