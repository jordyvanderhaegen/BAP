import { Timer } from './timer'
import * as moment from 'moment'
import store from '@/store/index.js';
import { FlyToInterpolator, LinearInterpolator } from '@deck.gl/core';
import cameras from '@/assets/data/cameras.json'
import * as d3 from 'd3';

export class CameraTimer extends Timer {
  constructor(duration, timeline, cameraId, preExecute) {
    super()
    this.duration = duration || 5000
    this.timeline = timeline
    this.cameraId = cameraId
    this.deck = store.state.timeline.deck
    this.preExecute = preExecute
  }

  /**
   * Overwrites the base class start
   * 
   */
  start = () => {
    this.startTime = moment()
    this.run()

    if (this.preExecute) {
      return this.timeout = setTimeout(this.timeline.next, this.duration - this.preExecute)
    }

    this.timeout = setTimeout(this.timeline.next, this.duration)
  }

  /**
   * Callback that will be executed
   * 
   */
  run = () => {
    console.log(`Starting camera timer ${this.duration}`)
    this.deck.setProps({
      viewState: {
        ...this.findCamera().pov,
        transitionInterpolator: new LinearInterpolator(),
        transitionDuration: this.duration,
        transitionEasing: d3.easeCubic,
      }
    })
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

  findCamera = () => {
    return cameras.find(item => item.id === this.cameraId)
  }

}