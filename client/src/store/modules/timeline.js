import timelineDates from '@/assets/data/map.json';

export default {
  namespaced: true,
  
  state: {
    timer: null,
    map: null,
    deck: null,
    activeDateId: 1,
    cameraLocked: true,
    tooltipPos: {x: 0, y: 1 },
    timelineDates,
    showCasualties: false,
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
      state.timer.play();
    },
    restartTimer(state) {
      state.timer.restart();
    },
    setTooltipPos(state, pos) {
      state.tooltipPos = pos
    },
    setShowCasualties(state, bool) {
      state.showCasualties = bool;
    },
  },

}