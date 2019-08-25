<template>
    <Map />
</template>

<script>
import Map from '@/components/templates/Map.vue';
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'p-story',
    components: {
        Map,
    },
    computed: {
        ...mapState('timeline', ['map']),
    },
    methods: {
        ...mapMutations('timeline', ['setTimelineFromJSON', 'playTimeline', 'stopTimeline'])
    },
    mounted() {
        this.setTimelineFromJSON('adventure-timeline')
        this.map.on("load", () => {
            this.playTimeline()
        });
    },
    beforeDestroy() {
        this.stopTimeline()
    }
}
</script>