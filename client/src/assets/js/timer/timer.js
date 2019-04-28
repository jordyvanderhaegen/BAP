import * as moment from 'moment';

export class Timer {
  constructor(duration, timeline, preExecute) {
    this.duration = duration || 5000
    this.timeline = timeline
    this.timeout = null
    this.startTime = null
  }

  /**
   * Starts the timer with a specific duration
   * 
   */
  start = () => {
    this.startTime = moment()
    this.run()

    this.timeout = setTimeout(this.timeline.next, this.duration)
  }

  /**
   * Callback that will be executed
   * 
   */
  run = () => {
    console.log(`Starting base timer ${this.duration}`)
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