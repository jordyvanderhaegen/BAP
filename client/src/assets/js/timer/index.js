import { Timer } from './timer'
import { ContentTimer } from './content-timer';
import { CameraTimer } from './camera-timer';
import { JSONTimer } from './json-timer';
import chapters from '@/assets/data/chapters.json';
import { ChapterTimer } from './chapter-timer';
import { StaticDeckTimer } from './static-deck-timer';
import store from '@/store/index.js';
import { DynamicDeckTimer } from './dynamic-deck-timer';

export class Timeline {
  constructor() {
    this.items = []
    this.activeItemIndex = 0
  }

  /**
   * Adds 1 to the active index and plays the timer
   *
   */
  next = () => {
    this.clearTimer()
    this.activeItemIndex++
    this.play()
  }

  /**
   * Subtracts 1 from the next index and plays the timer
   *
   */
  previous = () => {
    this.clearTimer()
    this.activeItemIndex--
    this.play()
  }

  /**
   * Gets the active timer instance
   *
   */
  getActiveTimer = () => {
    return this.items[this.activeItemIndex]
  }

  /**
   * Finds the active timer and starts it
   *
   */
  play = () => {
    if (this.activeItemIndex >= this.items.length || this.activeItemIndex < 0) {
      // throw new Error('Index out of range')
      console.warn('Index out of range, resetting')
      this.activeItemIndex = 0
    }
    this.getActiveTimer().start()
  }

  /**
   * Plays the timeline from a certain index.
   *
   */
  playFromIndex = (index) => {
    // TODO: Clear active deck layers
    this.activeItemIndex = index
    this.play()
  }

  /**
   * Restarts the timeline from the first index.
   *
   */
  restart = () => {
    this.getActiveTimer().stop()
    this.resetDeckLayers()
    this.playFromIndex(0)
  }

  /**
   * Removes all the current deck.gl layers.
   */
  resetDeckLayers = () => {
    console.log('resetting layer')
    console.log(store.state.timeline.deck)
    store.state.timeline.deck.setProps({
      layers: [],
    })
  }

  /**
   * Finds the active timer and pasuses it
   *
   */
  pause = () => {
    this.getActiveTimer().pause()
  }

  /**
   * Returns the active chapter object
   */
  getActiveChapter = () => {
    return chapters.find(item => item.indexRange[0] <= this.activeItemIndex && item.indexRange[1] >= this.activeItemIndex)
  }

  /**
   * Add a base timer to the items list
   * @param duration
   *
   */
  addTimer = (duration) => {
    this.items.push(new Timer(duration, this))
  }

  clearTimer = () => {
    this.getActiveTimer().clear()
  }

  /**
   * Add a content timer to the items list
   * @param duration
   * @param contentId
   *
   */
  addContent = (duration, contentId) => {
    this.items.push(new ContentTimer(duration, this, contentId))
  }

  addChapter = (duration, chapterId) => {
    this.items.push(new ChapterTimer(duration, this, chapterId))
  }

  /**
   * Add a troops timer to the items list
   * @param duration
   * @param currentDate
   * @param nextDate
   * @param cameraId
   *
   */
  addTroops = (duration, currentDate, nextDate, cameraId) => {
    this.items.push(new DynamicDeckTimer(duration, this, currentDate, nextDate, 60))
  }
  /**
   * Add a static deck timer to the items list
   * @param duration
   * @param fileName
   */
  addStaticDeck = (duration, fileName) => {
    this.items.push(new StaticDeckTimer(duration, this, fileName))
  }

  /**
   * Add a camera timer to the items list
   * @param duration
   * @param cameraId
   * @param preExecute
   *
   */
  addCamera = (duration, cameraId, preExecute) => {
    this.items.push(new CameraTimer(duration, this, cameraId, preExecute))
  }

  /**
   * Add a JSON timer to the items list
   *
   */
  addJSON = (duration, filename) => {
    this.items.push(new JSONTimer(duration, this, filename))
  }

  /**
   * Load a timeline from a JSON object
   * @param filename
   *
   */
  setTimelineFromJSON = async (filename) => {
    const timeline = await import(`@/assets/data/${filename}.json`)

    timeline.default.forEach(item => {
      const { refId, duration, startDate, endDate, cameraId, filename } = item
      switch (item.type) {
        case 'camera':
          return this.addCamera(duration, refId)
        case 'content':
          return this.addContent(duration, refId)
        case 'chapter':
          return this.addChapter(duration, refId)
        case 'troops':
          return this.addTroops(duration, startDate, endDate, cameraId)
        case 'static-deck':
          return this.addStaticDeck(duration, filename)
        default:
          return this.addTimer(duration)
      }
    })

  }

}
