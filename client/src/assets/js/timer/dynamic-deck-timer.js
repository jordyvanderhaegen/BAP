import { createScatterPlotLayer } from '@/assets/js/utils.js'
import { Timer } from "./timer";
import * as pstimer from '@/assets/js/timer.js'
import * as d3 from 'd3';
import store from '@/store/index.js';

export class DynamicDeckTimer extends Timer {
  constructor(duration, timeline, fileName, nextFileName, fps) {
    super();
    this.duration = duration
    this.timeline = timeline
    this.timeout = null
    this.fileName = fileName
    this.nextFileName = nextFileName
    this.fps = fps || 60
    this.adaptiveFps = (this.duration / 1000) * fps
    this.currentFrame = 0
    this.data = null
    this.deck = store.state.timeline.deck
  }

  start = async () => {
    // Resume the timer if one exists, this skips unnecessary file loading
    if (this.timeout) {
      return this.timeout.resume()
    }

    const unitData = await import(`@/assets/data/${this.fileName}.json`)
    const unitDataNextDate = await import(`@/assets/data/${this.nextFileName}.json`)

    this.data = unitData.features.map(feature => {
      // Destruct object
      const { unit_name } = feature.properties
      // Find the corresponding feature in the next date
      const correspondingFeature = unitDataNextDate.features.find(feature => feature.properties.unit_name == unit_name)
      // Return a new object for each feature with the interpolation values
      return {
        ...feature,
        interpolatePos: d3.geoInterpolate(
          feature.geometry.coordinates,
          correspondingFeature ? correspondingFeature.geometry.coordinates : feature.geometry.coordinates
        ),
      }
    })

    // Set an initial layer for skipping through days
    this.deck.setProps({
      layers: createScatterPlotLayer(this.data)
    })

    if (store.state.timeline.timelinePlayingState === 'PLAYING') {
      this.run()
    }
  }

  run = () => {
    this.currentFrame = 0
    this.timeout = pstimer.pausableTimer(this.getAnimationFrame)
  }

  getAnimationFrame = () => {
    // Check if animation has already reached the end
    if(this.currentFrame >= this.adaptiveFps) {
      return this.timeline.next()
    }

    // Update the inerpolation position for each feature
    this.data.forEach(feature => {
      feature.geometry.coordinates = feature.interpolatePos(this.currentFrame / this.adaptiveFps);
    })

    // Update deck.gl with the updated positions
    this.deck.setProps({
      layers: createScatterPlotLayer([...this.data])
    })

    this.currentFrame++
  }

  stop = () => {
    if (this.timeout) {
      this.timeout.stop()
      this.timeout = null
    }
  }

  pause = () => {
    this.timeout.pause()
  }

  clear = () => {
    this.stop()
  }
}