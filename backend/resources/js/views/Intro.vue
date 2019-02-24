<template>
<section class="section" ref="section">
    <div class="section__bg" ref="section__bg"></div>
    <div class="section__wrap">
        <div class="section--1" ref="section_text">
            <h1>World War 2</h1>
        </div>
    </div>
</section>
</template>
<script>
import { TweenLite } from 'gsap';
export default {
    mounted() {
        const { section, section_text, section__bg } = this.$refs
        section.addEventListener('mousemove', (e) => { 
            const { clientY, clientX, pageX, pageY, offsetX, offsetY } = e
            let relX = e.pageX - section.getBoundingClientRect().left
            let relY = e.pageY - section.getBoundingClientRect().top
            console.log(section.clientWidth)
            // const relX = e.pageX - section.offset().left
            TweenLite.to(section__bg, 0.4, {
                x: (relX - section.clientWidth / 2) / section.clientWidth * - 10,
                y: (relY - section.clientHeight / 2) / section.clientHeight * - 10
            });
            TweenLite.to(section_text, 1, {
                x: (relX - section.clientWidth / 2) / section.clientWidth * - 30,
                y: (relY - section.clientHeight / 2) / section.clientHeight * - 30
            });
        });
    }
}
</script>

<style lang="scss" scoped>
.section {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    overflow: hidden;
}
.section__bg {
    background-image: url('../../../public/img/intro.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    left: -10px;
    right: -10px;
    top: -10px;
    bottom: -10px;
    z-index: 1;
}
.section__wrap {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 2;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.section--1 {
    text-align: center;
    h1 {
        font-size: 5rem;
    }
}
</style>

