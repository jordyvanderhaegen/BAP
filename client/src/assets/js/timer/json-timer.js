import { Timer } from './timer'
import * as moment from 'moment'
import store from '@/store/index.js';
import { GeoJsonLayer } from '@deck.gl/layers';

export class JSONTimer extends Timer {
  constructor(duration, timeline, filename) {
    super()
    this.duration = duration || 5000
    this.timeline = timeline
    this.deck = store.state.timeline.deck
    this.filename = filename
  }

  /**
   * Overwrites the base class start
   * 
   */
  start = () => {
    this.startTime = moment()
    this.run()
    this.timeout = setTimeout(this.clear, this.duration)
  }

  /**
   * Callback that will be executed
   * 
   */
  run = async () => {
    console.log(`Starting independent json timer ${this.duration}`)

    this.timeline.next()

    const data = await import(`@/assets/data/${this.filename}.json`)
    const layer = new GeoJsonLayer({
      id: 'geojson-layer',
      data,
      stroked: true,
      lineWidthScale: 20,
      filled: false,
      lineWidthMinPixels: 2,
      getFillColor: [160, 160, 180, 200],
      getLineColor: [255, 0, 0, 200],
      getRadius: 100,
      getLineWidth: 1,
      getElevation: 30,
    })

    this.deck.setProps({
      layers: layer
    })
  }

  clear = () => {
    console.log('Clearing independent json layer')
    this.deck.setProps({
      layers: [],
      viewState: this.deck.viewState
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

}