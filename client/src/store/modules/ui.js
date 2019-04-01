export default {
  namespaced: true,
  state: {
    menuOpen: false,
    menuTl: null,
  },
  mutations: {
    toggleMenu(state) {
      state.menuOpen = !state.menuOpen;
    },
    setMenuTl(state, tl) {
      state.menuTl = tl;
    },
  },
};
