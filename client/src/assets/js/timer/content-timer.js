import { Timer } from './timer'
import * as moment from 'moment'
import store from '@/store/index.js';

export class ContentTimer extends Timer {
  constructor(duration, timeline, contentId) {
    super()
    this.duration = duration || 5000
    this.timeline = timeline
    this.contentId = contentId
  }

  /**
   * Overwrites the base class method start
   * 
   */
  start = () => {
    this.startTime = moment()
    this.run()
    this.timeout = setTimeout(() => {
      this.timeline.next()
      store.commit('modal/hideModal')
    }, this.duration)
  }

  /**
   * Callback that will be executed
   * 
   */
  run = () => {
    console.log(`Starting content timer ${this.duration}`)
    store.commit('modal/showModal', 'StoryModal')
    store.commit('modal/setDuration', this.duration)
  }

  /**
   * Pauses the timer and sets the leftover duration
   * 
   */
  pause = () => {
    const diff = moment.duration(moment().diff(this.startTime))
    this.duration -= diff.asMilliseconds()
    clearTimeout(this.timeout)
    store.commit('modal/setDuration', this.duration)
  }

}