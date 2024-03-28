<template>
  <div class="horizontal-menu">
    <swiper
      :modules="modules"
      :slides-per-view="3"
      :centered-slides="false"
      navigation
      :freeMode="true"
      :mousewheel="{
        forceToAxis: true,
        invert: false,
        sensitivity: 1,
        releaseOnEdges: true
      }"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="event in events" :key="event.id">
        <EventCard :event="event" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Navigation, EffectCoverflow, Mousewheel } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import EventCard from '@/components/EventCard.vue' // Adjust path as needed

export default {
  components: {
    Swiper,
    SwiperSlide,
    EventCard
  },
  props: {
    events: Array // Accept events data as a prop
  },
  setup() {
    const onSwiper = () => {}
    const onSlideChange = () => {}
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, EffectCoverflow, Mousewheel] // Include Coverflow effect
    }
  }
}
</script>

<style scoped>

.horizontal-menu {
  border: 1px solid green;
  padding: 0 50px;
}
.swiper-slide {
  padding-bottom: 10px;
  overflow: hidden;
  margin: 0 15px;
  transition: border 0.3s ease;
}
</style>
