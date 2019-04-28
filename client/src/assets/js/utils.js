import * as moment from 'moment'
import router from '@/router.js';
import store from '@/store/index.js';
import { FlyToInterpolator, LinearInterpolator } from '@deck.gl/core';
import { ScatterplotLayer, GeoJsonLayer } from '@deck.gl/layers';
import * as d3 from 'd3';
import * as pstimer from '@/assets/js/timer.js'

export class TimeLine {
  constructor() {
    this.timelineItems = []
    this.activeIndex = 0
  }

  next = () => {
    this.activeIndex++
    this.play()
  }

  play = () => {
    if(this.activeIndex >= this.timelineItems.length) return
    const timelineItem = this.timelineItems[this.activeIndex]
    timelineItem.startTimer()
  }

  pause = () => {
    const timelineItem = this.timelineItems[this.activeIndex]
    timelineItem.pauseTimer()
  }

  resume = () => {
    const timelineItem = this.timelineItems[this.activeIndex]
    timelineItem.resumeTimer()
  }

  restart = () => {
    this.activeIndex = 0
    this.play()
  }

  addGeoData = (duration, curdate, nextdate) => {
    this.timelineItems.push(new GeoData(duration, curdate, nextdate))
  }

  addContent = (duration, id) => {
    this.timelineItems.push(new Content(duration, id))
  }

  addCamera = (duration, camera) => {
    this.timelineItems.push(new Camera(duration, camera))
  }

  addJSON = (filename) => {
    this.timelineItems.push(new JSON(filename))
  }
}

export class Timer {
  constructor() {
    this.duration = 0
    this.timer = null
    this.callback = null
    this.startTime = null
    this.timeout = null
  }

  startTimer = () => {
    this.callback()
  }

  pauseTimer = () => {
    const diff = moment.duration(moment().diff(this.startTime))
    this.duration -= diff.asMilliseconds()
    clearTimeout(this.timeout)
  }

  stopTimer = () => {
    console.log('going onto the next one')
    store.state.timeline.timer.next()
  }
}

export class Content extends Timer {
  constructor(duration, id) {
    super()
    this.duration = duration
    this.callback = this.playContent
    this.id = id
  }

  playContent = () => {
    router.push('/timeline/story/' + this.id)
    this.startTime = moment()
    this.timeout = setTimeout(() => {
      this.stopTimer()
      this.closeModal()
    }, this.duration)
  }

  resumeTimer = () => {
    this.playContent()
  }

  closeModal = () => {
    router.push('/')
  }

}

export class Camera extends Timer {
  constructor(duration, camera) {
    super()
    this.duration = duration
    this.callback = this.playCamera
    this.deck = store.state.timeline.deck
    this.camera = camera
  }

  playCamera = () => {
    this.flyTo()
    this.timeout = setTimeout(this.stopTimer, this.duration)
  }

  resumeTimer = () => {
    this.playCamera()
  }

  flyTo = () => {
    this.deck.setProps({
      viewState: {
        ...this.camera,
        transitionInterpolator: new LinearInterpolator(),
        transitionDuration: this.duration,
        transitionEasing: d3.easeCubic
      }
    })
  }

}

export class JSON extends Timer {
  constructor(filename) {
    super()
    this.filename = filename
    this.deck = store.state.timeline.deck
    this.geodata = null
    this.callback = this.loadGeodata
  }

  loadGeodata = async () => {
    const data = await import(`@/assets/data/${this.filename}.json`)
    const layer = new GeoJsonLayer({
      id: 'geojson-layer',
    data,
    stroked: true,
    lineWidthScale: 20,
    filled: false,
    lineWidthMinPixels: 2,
    // wireframe: true,
    getFillColor: [160, 160, 180, 200],
    getLineColor: [255, 0, 0, 200],
    getRadius: 100,
    getLineWidth: 1,
    getElevation: 30,
    })
    this.deck.setProps({
      layers: layer
    })
    this.stopTimer()
    console.log(this.deck)
  }
}

export class GeoData extends Timer {
  constructor(duration, curdate, nextdate) {
    super()
    this.duration = duration
    this.deck = store.state.timeline.deck
    this.callback = this.loadGeodata
    this.currentDateObject = curdate
    this.nextDateObject = nextdate
    this.geodataCurrentDate = null
    this.geodataNextDate = null
    this.currentFrame = null
    this.timekeeper = null
  }

  pauseTimer = () => {
    this.timekeeper.pause()
  }

  resumeTimer = () => {
    this.timekeeper.resume()
  }


  loadGeodata = async () => {
    const geodataCurrentDate = await import(`@/assets/data/${this.currentDateObject.date}-troops.json`)
    const geodataNextDate = await import(`@/assets/data/${this.nextDateObject.date}-troops.json`)
    this.geodataNextDate = geodataNextDate.features
    this.geodataCurrentDate = geodataCurrentDate.features.map((feature) => {
      const {id, front} = feature.properties
      const featureNextDate = geodataNextDate.features.find(feature =>
        feature.properties.id == id && feature.properties.front == front
      );
      return {
        ...feature,
        interpolatePos: d3.geoInterpolate(feature.geometry.coordinates,
        featureNextDate ? featureNextDate.geometry.coordinates : feature.geometry.coordinates
        ),
      }
    })

    this.deck.setProps({
      viewState: {
        ...this.currentDateObject.camera,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 3000,
        transitionEasing: d3.easeCubic
      }
    })

    this.startAnimation()
  }

  interpolateGeodata = () => {
    if (this.currentFrame <= 1) {
      // console.log('interpolling')
      this.geodataCurrentDate.forEach(feature => {
        feature.geometry.coordinates = feature.interpolatePos(this.currentFrame);
      })

      this.deck.setProps({
        layers: this.createScatterPlotLayer(),
        viewState: this.deck.viewState
      })

      this.currentFrame += 0.005;
      return
    }
    this.timekeeper.stop()
    this.stopTimer()
    
  }

  startAnimation = () => {
    if (this.timekeeper) {
      this.timekeeper.stop();
    }

    this.currentFrame = 0;
    this.timekeeper = pstimer.pausableTimer(this.interpolateGeodata)
  }

  createScatterPlotLayer = () => {
    // console.log('creating layer')
    return new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: [...this.geodataCurrentDate],
      autoHighlight: true,
      pickable: true,
      radiusScale: 2,
      radiusMinPixels: 2,
      radiusMaxPixels: 6,
      getPosition: d => [d.geometry.coordinates[0], d.geometry.coordinates[1]],
      getFillColor: d => this.getUnitColor(d.properties.country),
      getRadius: 1000
    })
  }

  getUnitColor = (name) => {
    const GER_COLOR = [173, 27, 27];
    const ALLIED_COLOR = [0, 35, 149];
    const UK_COLOR = [32, 142, 201];
    const CA_COLOR = [221, 215, 215];
    switch (name) {
      case 'GE':
        return GER_COLOR;
      case 'CA':
        return CA_COLOR;
      case 'UK':
        return UK_COLOR;
      case 'US':
        return ALLIED_COLOR;
      default:
        return ALLIED_COLOR;
    }
  }

}
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


/* export class TimeLine {
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

  addGeodata = (curdate, nextdate) => {
    this.timelineItems.push(new TimeLineGeodata(curdate, nextdate))
  }

  play = () => {
    if(this.activeIndex >= this.timelineItems.length) return
    const timelineItem = this.timelineItems[this.activeIndex]
    const { timer } = timelineItem
    timer.start().then((val) => {
      console.log('val', val)
      if (timelineItem instanceof TimeLineContent) {
        timelineItem.closeModal()
      }
      this.next()
    })
  }

  playCamera = () => {
    const timelineItem = this.timelineItems[this.activeIndex]
    const { timer } = timelineItem
    
  }

  next = () => {
    this.activeIndex++
    this.play()
  }

  pause = () => {
    console.log('pausing')
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

export class TimeLineGeodata {
  constructor(currentGeo, nextGeo) {
    this.currentDateObject = currentGeo
    this.nextDateObject = nextGeo
    this.geodataCurrentDate = null
    this.geodataNextDate = null
    this.currentFrame = null
    this.timekeeper = null
    this.timer = new Timer(9000, this.loadGeodata)
    this.deck = store.state.timeline.deck
  }

  loadGeodata = async () => {
    console.log('loading data')
    const geodataCurrentDate = await import(`@/assets/data/${this.currentDateObject.date}-troops.json`)
    const geodataNextDate = await import(`@/assets/data/${this.nextDateObject.date}-troops.json`)
    console.log(geodataCurrentDate)
    console.log(geodataNextDate)
    this.geodataNextDate = geodataNextDate.features
    this.geodataCurrentDate = geodataCurrentDate.features.map((feature) => {
      const {id, front} = feature.properties
      const featureNextDate = geodataNextDate.features.find(feature =>
        feature.properties.id == id && feature.properties.front == front
      );
      return {
        ...feature,
        interpolatePos: d3.geoInterpolate(feature.geometry.coordinates,
        featureNextDate ? featureNextDate.geometry.coordinates : feature.geometry.coordinates
        ),
      }
    })

    this.deck.setProps({
      viewState: {
        ...this.currentDateObject.camera,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 3000,
        transitionEasing: d3.easeCubic
      }
    })

    this.startAnimation()
  }

  interpolateGeodata = () => {
    if (this.currentFrame <= 1) {
      // console.log('interpolling')
      this.geodataCurrentDate.forEach(feature => {
        feature.geometry.coordinates = feature.interpolatePos(this.currentFrame);
      })

      this.deck.setProps({
        layers: this.createScatterPlotLayer(),
        viewState: this.deck.viewState
      })

      this.currentFrame += 0.005;
      return
    }
    this.timekeeper.stop()
    return new Promise((res,rej) => {
      res('returning promise')
    })
    
  }

  startAnimation = () => {
    if (this.timekeeper) {
      this.timekeeper.stop();
    }

    this.currentFrame = 0;
    this.timekeeper = pstimer.pausableTimer(this.interpolateGeodata)
  }

  createScatterPlotLayer = () => {
    // console.log('creating layer')
    return new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: [...this.geodataCurrentDate],
      autoHighlight: true,
      pickable: true,
      radiusScale: 2,
      radiusMinPixels: 2,
      radiusMaxPixels: 6,
      getPosition: d => [d.geometry.coordinates[0], d.geometry.coordinates[1]],
      getFillColor: d => this.getUnitColor(d.properties.country),
      getRadius: 1000
    })
  }

  getUnitColor = (name) => {
    const GER_COLOR = [173, 27, 27];
    const ALLIED_COLOR = [0, 35, 149];
    const UK_COLOR = [32, 142, 201];
    const CA_COLOR = [221, 215, 215];
    switch (name) {
      case 'GE':
        return GER_COLOR;
      case 'CA':
        return CA_COLOR;
      case 'UK':
        return UK_COLOR;
      case 'US':
        return ALLIED_COLOR;
      default:
        return ALLIED_COLOR;
    }
  }
}
 */