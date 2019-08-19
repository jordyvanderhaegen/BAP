import { createScatterPlotLayer, createGeoJsonLayer } from '@/assets/js/utils.js'
import { Timer } from "./timer";
import * as moment from 'moment';
import store from '@/store/index.js';

export class StaticDeckTimer extends Timer {
    constructor(duration, timeline, fileName) {
        super()
        this.duration = duration
        this.fileName = fileName
        this.timeline = timeline
        this.deck = store.state.timeline.deck
    }

    start = async () => {
        this.startTime = moment()
        const unitsData = await import(`@/assets/data/${this.fileName}.json`)
        const frontlineData = await import(`@/assets/data/${this.fileName}-frontline.json`)
        this.deck.setProps({
            layers: [
                createScatterPlotLayer(unitsData.features),
                createGeoJsonLayer(frontlineData)
            ]
        })

        if (store.state.timeline.timelinePlayingState === 'PLAYING') {
            this.run()
        }
    }

    run = () => {
        this.timeout = setTimeout(this.timeline.next, this.duration)
    }
}