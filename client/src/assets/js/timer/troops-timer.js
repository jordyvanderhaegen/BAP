import { Timer } from "./timer";
import store from '@/store/index.js';
import { FlyToInterpolator } from "@deck.gl/core";
import { ScatterplotLayer } from "@deck.gl/layers";
import cameras from '@/assets/data/cameras.json'
import * as pstimer from '@/assets/js/timer.js'
import * as d3 from 'd3';
import { createScatterPlotLayer } from '@/assets/js/utils.js'

export class TroopsTimer extends Timer {
  constructor(duration, timeline, fps, currentFilename, nextFilename, cameraId) {
    super()
    this.duration = duration
    this.timeline = timeline
    this.fps = fps || 60
    this.currentFrame = 0
    this.requestId = null
    this.currentFilename = currentFilename
    this.nextFilename = nextFilename
    this.geodataCurrentDate = null
    this.geodataNextDate = null
    this.deck = store.state.timeline.deck
    this.cameraId = cameraId
    this.timekeeper = null
    this.framesPerFetch = (this.duration / 1000) * this.fps
  }

  /**
   * Overwrites the base class start
   *
   */
  start = async () => {
    console.log(`Starting with new data ${this.currentFilename}`)
    if (this.timekeeper) {
      return this.timekeeper.resume()
    }
    await this.loadData()
    this.run()
  }

  stop = () => {
    this.timekeeper.stop()
    this.timekeeper = null
  }

  loadData = async () => {
    const geodataCurrentDate = await import(`@/assets/data/${this.currentFilename}.json`)
    const geodataNextDate = await import(`@/assets/data/${this.nextFilename}.json`)

    this.geodataNextDate = geodataNextDate.features
    this.geodataCurrentDate = geodataCurrentDate.features.map((feature) => {
      const {id, unit_name} = feature.properties
      const featureNextDate = geodataNextDate.features.find(feature =>
        feature.properties.unit_name == unit_name
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
        ...this.findCamera().pov,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: this.duration,
        transitionEasing: d3.easeCubic
      }
    })
  }

  findCamera = () => {
    return cameras.find(item => item.id === this.cameraId)
  }

  run = () => {
    this.startAnimation()
  }

  startAnimation = () => {
    /* if (this.timekeeper) {
      this.stop()
    } */

    this.currentFrame = 0
    this.timekeeper = pstimer.pausableTimer(this.animationFrame)

  }

  animationFrame = () => {
    if (this.currentFrame >= this.framesPerFetch) {
      this.stop()
      return this.timeline.next()
    }

    this.geodataCurrentDate.forEach(feature => {
      feature.geometry.coordinates = feature.interpolatePos(this.currentFrame / this.framesPerFetch);
    })

    this.deck.setProps({
      layers: createScatterPlotLayer([...this.geodataCurrentDate]),
      viewState: this.deck.viewState
    })

    this.currentFrame++
  }

  pause = () => {
    console.log('pausing the timer')
    this.timekeeper.pause()
  }

}
