import timelineDates from '@/assets/data/map.json';
import { Timeline } from '@/assets/js/timer/index.js';
import chapters from '@/assets/data/chapters.json';

const TIMELINE_PLAYING_STATE = {
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
}

export default {
  namespaced: true,

  state: {
    timer: null,
    timeline: new Timeline(),
    map: null,
    deck: null,
    activeDateId: 1,
    cameraLocked: true,
    tooltip: {},
    timelineDates,
    showCasualties: false,
    timelinePlayingState: null,
  },

  mutations: {
    /**
     * Sets a mapbox object
     * @param {*} map 
     */
    setMap(state, map) {
      state.map = map;
    },

    /**
     * Sets a deck.gl object
     * @param {*} deck 
     */
    setDeck(state, deck) {
      state.deck = deck;
    },

    /**
     * Sets a timeline object
     * @param {Timeline} timeline 
     */
    setTimeline(state, timeline) {
      state.timeline = timeline;
    },

    /**
     * Loads a timeline from a JSON file
     * @param {String} filename 
     */
    setTimelineFromJSON(state, filename) {
      state.timeline.setTimelineFromJSON(filename);
    },

    /**
     * Calls the play function on the timeline instance
     */
    playTimeline(state) {
      state.timeline.play();
      state.timelinePlayingState = TIMELINE_PLAYING_STATE.PLAYING;
    },

    /**
     * Calls the pause function on the timeline instance
     */
    pauseTimeline(state) {
      state.timeline.pause();
      state.timelinePlayingState = TIMELINE_PLAYING_STATE.PAUSED;
    },

    previousTimelineItem(state) {
      state.timeline.previous()
    },

    nextTimelineItem(state) {
      state.timeline.next();
    },

    /**
     * Calls the restart function on the timeline instance
     */
    restartTimeline(state) {
      state.timeline.restart();
    },

    incrementActiveDateId(state) {
      state.activeDateId++;
    },
    setCameraLocked(state, bool) {
      state.cameraLocked = bool;
    },
    setTooltip(state, pos) {
      state.tooltip = pos
    },
    setShowCasualties(state, bool) {
      state.showCasualties = bool;
    },
  },

  getters: {
    activeTimelineIndex: state => {
      return state.timeline ? state.timeline.activeItemIndex : null
    },
    activeChapterIndex: state => {
      const { activeItemIndex } = state.timeline
      const chapter = chapters.find(item => item.indexRange[0] <= activeItemIndex && item.indexRange[1] >= activeItemIndex)
      return chapter && chapter.id || 1
    }
  },

}