import { Timer } from "./timer";
import store from '@/store/index.js';
import { FlyToInterpolator } from "@deck.gl/core";
import { ScatterplotLayer } from "@deck.gl/layers";
import cameras from '@/assets/data/cameras.json'
import * as pstimer from '@/assets/js/timer.js'
import * as d3 from 'd3';

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
  }

  /**
   * Overwrites the base class start
   * 
   */
  start = async () => {
    console.log(`Starting with new data ${this.currentFilename}`)
    // setTimeout(() => this.timeline.next())
    await this.loadData()
    this.run()
  }

  loadData = async () => {
    const geodataCurrentDate = await import(`@/assets/data/${this.currentFilename}-troops.json`)
    const geodataNextDate = await import(`@/assets/data/${this.nextFilename}-troops.json`)

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
    // console.log(this.currentFrame);
    /* if (this.currentFrame >= 1) {
      console.log('higher than 1')
      this.currentFrame = 0
      return this.timeline.next()
    } */

    /* if (!this.timekeeper) {
      this.timekeeper = pstimer.pausableTimer(this.run)
    }
    this.startAnimation() */
    // this.timekeeper.resume()
    
    /* if (this.currentFrame >= 1) {
      this.currentFrame = 0
      console.log('next jfklqsmjk');
      
      return this.timeline.next()
    } */
    this.timekeeper = pstimer.pausableTimer(this.startAnimation)
    /* setTimeout(() => {
      
      // this.requestId = requestAnimationFrame(this.startAnimation)
    }, 1000 / (this.duration / this.fps)) */
    
      
  }

  startAnimation = () => {

    if (this.currentFrame >= 1) {
      console.log('higher than 1')
      this.currentFrame = 0
      this.timekeeper.stop()
      return this.timeline.next()
    }

    this.geodataCurrentDate.forEach(feature => {
      feature.geometry.coordinates = feature.interpolatePos(this.currentFrame);
    })

    this.deck.setProps({
      layers: this.createScatterPlotLayer(),
      viewState: this.deck.viewState
    })

    this.currentFrame += .003
  }

  pause = () => {
    console.log('pausing the timer')
    this.timekeeper.pause()
    // console.log(this.requestId)
    // return
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