// Timeline consits out of a map.
export default {
  namespaced: true,
  
  state: {
    timer: null,
    map: null,
    deck: null,
    activeDateId: 1,
    cameraLocked: true
  },

  mutations: {
    setMap(state, map) {
      state.map = map;
    },
    setDeck(state, deck) {
      state.deck = deck;
    },
    setTimer(state, timer) {
      state.timer = timer;
    },
    setActiveDateId(state, id) {
      state.activeDateId = id;
    },
    incrementActiveDateId(state) {
      state.activeDateId++;
    },
    setCameraLocked(state, bool) {
      state.cameraLocked = bool;
    },
    pauseTimer(state) {
      state.timer.pause();
    },
    resumeTimer(state) {
      state.timer.resume();
    }
  },
}