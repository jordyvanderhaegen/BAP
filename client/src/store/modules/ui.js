export default {
  namespaced: true,
  state: {
    menuOpen: false,
    menuTl: null,
    menuImageIndex: null,
    timelineToolbarModalOpen: false,
    modalOpen: false,
  },
  mutations: {
    toggleMenu(state) {
      state.menuOpen = !state.menuOpen;
    },
    setMenuTl(state, tl) {
      state.menuTl = tl;
    },
    setMenuCoverImageIndex(state, index) {
      state.menuImageIndex = index;
    },
    toggleMenuToolbarModal(state) {
      state.timelineToolbarModalOpen = !state.timelineToolbarModalOpen;
    },
    toggleModal(state) {
      state.modalOpen = !state.modalOpen
    }
  },
};
