<template>
    <Map />
</template>

<script>
import Map from '@/components/templates/Map.vue'
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'p-discover',
    components: {
        Map,
    },
    computed: {
        ...mapState('timeline', ['map'])
    },
    methods: {
        ...mapMutations('timeline', ['setTimelineFromJSON', 'playTimeline'])
    },
    mounted() {
        this.setTimelineFromJSON('discover-timeline')
        this.map.on("load", () => {
            this.playTimeline()
        });
    }
}
</script>