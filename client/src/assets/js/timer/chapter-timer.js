import { Timer } from './timer';
import * as moment from 'moment';
import router from '@/router.js';

export class ChapterTimer extends Timer {
  constructor(duration, timeline, chapterId) {
    super();
    this.duration = duration || 5000;
    this.timeline = timeline;
    this.chapterId = chapterId;
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
      router.push('/')
    }, this.duration)
  }

  /**
   * Callback that will be executed
   * 
   */
  run = () => {
    console.log(`Starting chapter timer ${this.duration}`)
    router.push('/timeline/chapter/' + this.chapterId)
  }

  /**
   * Pauses the timer and sets the leftover duration
   * 
   */
  pause = () => {
    const diff = moment.duration(moment().diff(this.startTime))
    this.duration -= diff.asMilliseconds()
    clearTimeout(this.timeout)
  }

}