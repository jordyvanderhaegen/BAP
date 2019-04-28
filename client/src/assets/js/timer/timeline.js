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
   * 
   */
  addContent = (duration, contentId) => {
    this.items.push(new ContentTimer(duration, this, contentId))
  }

  /**
   * Add a troops timer to the items list
   * @param duration
   * 
   */
  addTroops = (duration, currentDate, nextDate, cameraId) => {
    this.items.push(new TroopsTimer(duration, this, 60, currentDate, nextDate, cameraId))
  }

  /**
   * Add a camera timer to the items list
   * @param duration
   * 
   */
  addCamera = (duration, cameraId, preExecute) => {
    this.items.push(new CameraTimer(duration, this, cameraId, preExecute))
  }

  addJSON = (duration, filename) => {
    this.items.push(new JSONTimer(duration, this, filename))
  }

}