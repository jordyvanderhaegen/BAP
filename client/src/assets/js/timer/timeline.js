import { Timer } from './timer'
import { ContentTimer } from './content-timer';
import { TroopsTimer } from './troops-timer';
import { CameraTimer } from './camera-timer';
import { JSONTimer } from './json-timer';

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
    this.activeItemIndex++
    this.play()
  }

  /**
   * Subtracts 1 from the next index and plays the timer
   * 
   */
  previous = () => {
    this.activeItemIndex--
    this.play
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
    if (this.activeItemIndex >= this.items.length) return
    this.getActiveTimer().start()
  }

  /**
   * Finds the active timer and pasuses it
   * 
   */
  pause = () => {
    this.getActiveTimer().pause()
  }

  /**
   * Add a base timer to the items list
   * @param duration
   * 
   */
  addTimer = (duration) => {
    this.items.push(new Timer(duration, this))
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

  /**
   * Add a troops timer to the items list
   * @param duration
   * @param currentDate
   * @param nextDate
   * @param cameraId
   * 
   */
  addTroops = (duration, currentDate, nextDate, cameraId) => {
    this.items.push(new TroopsTimer(duration, this, 60, currentDate, nextDate, cameraId))
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
      const { refId, duration, startDate, endDate, cameraId } = item
      switch (item.type) {
        case 'camera':
          return this.addCamera(duration, refId)
        case 'content':
          return this.addContent(duration, refId)
        case 'troops':
          return this.addTroops(duration, startDate, endDate, cameraId)
        default:
          return this.addTimer(duration)
      }
    })

  }

}