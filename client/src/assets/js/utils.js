import * as moment from 'moment'
import router from '@/router.js';

export class TimeLine {
  constructor() {
    this.duration = 3000
    this.timelineItems = []
    this.activeIndex = 0
  }

  addCamera() {
    this.timelineItems.push(new TimeLineCamera())
  }

  addContent() {
    this.timelineItems.push(new TimeLineContent(1, 3000))
  }

  play() {
    if(this.activeIndex >= this.timelineItems.length) return
    const { timer } = this.timelineItems[this.activeIndex]
    timer.start().then(() => {
      this.next()
    })
  }

  next() {
    this.activeIndex++
    this.play()
  }

  pause() {
    const { timer } = this.timelineItems[this.activeIndex]
    timer.pause()
  }
}

export const TIMER_STATE = {
  INITIALIZED: 'initialized',
  PAUSED: 'paused',
  STARTED: 'started',
  STOPPED: 'stopped'
};

export class Timer {
  constructor(duration, callback) {
    this.status = TIMER_STATE.INITIALIZED
    this.callback = callback
    this.duration = duration
    this.timeout = null
    this.startTime = null
  }

  start() {
    if (this.status === TIMER_STATE.STARTED) return
    return new Promise((res,rej) => {
      this.timeout = setTimeout(() => {
        this.callback()
        res()
      }, this.duration);
      this.startTime = moment()
      this.status = TIMER_STATE.STARTED
    })
  }

  pause() {
    if (this.status !== TIMER_STATE.STARTED) return
    const diff = moment.duration(moment().diff(this.startTime))
    this.duration -= diff.asMilliseconds()
    this.status = TIMER_STATE.PAUSED
    clearTimeout(this.timeout)
  }

  end() {
    this.status = TIMER_STATE.STOPPED
  }

}

export class TimeLineCamera {
  constructor(id, duration) {
    this.timer = new Timer(duration, this.flyTo)
    this.id = id
  }

  flyTo() {

  }

  foo() {
    console.log('foo')
  }
}

export class TimeLineContent {
  constructor(id, duration) {
    this.timer = new Timer(duration, this.presentModal)
    this.id = id
  }

  presentModal() {
    router.push('/timeline/story/' + this.id)
  }

  foo() {
    console.log('foo2')
  }
}