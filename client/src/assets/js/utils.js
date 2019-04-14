import * as moment from 'moment'
import router from '@/router.js';
import store from '@/store/index.js';
import { FlyToInterpolator } from '@deck.gl/core';
import * as d3 from 'd3';

export class TimeLine {
  constructor() {
    this.duration = 3000
    this.timelineItems = []
    this.activeIndex = 0
  }

  addCamera = (id, camera, duration) => {
    this.timelineItems.push(new TimeLineCamera(id, duration, camera))
  }

  addContent = (id, duration) => {
    this.timelineItems.push(new TimeLineContent(id, duration))
  }

  play = () => {
    if(this.activeIndex >= this.timelineItems.length) return
    const timelineItem = this.timelineItems[this.activeIndex]
    const { timer } = timelineItem
    timer.start().then(() => {
      if (timelineItem instanceof TimeLineContent) {
        timelineItem.closeModal()
      }
      this.next()
    })
  }

  next = () => {
    this.activeIndex++
    this.play()
  }

  pause = () => {
    const { timer } = this.timelineItems[this.activeIndex]
    timer.pause()
  }

  restart = () => {
    this.activeIndex = 0
    this.play()
  }
}

export const TIMER_STATE = {
  INITIALIZED: 'initialized',
  PAUSED: 'paused',
  STARTED: 'started',
  STOPPED: 'stopped'
};

export class Timer {
  constructor(duration, callback, precallback) {
    this.status = TIMER_STATE.INITIALIZED
    this.callback = callback
    this.duration = duration
    this.timeout = null
    this.startTime = null
  }

  start = () => {
    if (this.status === TIMER_STATE.STARTED) return
    return new Promise((res,rej) => {
      this.callback()
      this.timeout = setTimeout(() => {
        res()
      }, this.duration);
      this.startTime = moment()
      this.status = TIMER_STATE.STARTED
    })
  }

  pause = () => {
    if (this.status !== TIMER_STATE.STARTED) return
    const diff = moment.duration(moment().diff(this.startTime))
    this.duration -= diff.asMilliseconds()
    this.status = TIMER_STATE.PAUSED
    clearTimeout(this.timeout)
  }

  end = () => {
    this.status = TIMER_STATE.STOPPED
  }

}

export class TimeLineCamera {
  constructor(id, duration, camera) {
    this.id = id
    this.duration = duration
    this.camera = camera
    this.timer = new Timer(duration, this.flyTo)
    this.deck = store.state.timeline.deck
  }

  flyTo = () => {
    this.deck.setProps({
      viewState: {
        ...this.camera,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: this.duration,
        transitionEasing: d3.easeCubic
      }
    })
  }

}

export class TimeLineContent {
  constructor(id, duration) {
    this.timer = new Timer(duration, this.init)
    this.id = id
  }

  init = () => {
    router.push('/timeline/story/' + this.id)
  }

  closeModal = () => {
    router.push('/')
  }
}