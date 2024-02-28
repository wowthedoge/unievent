<template>
  <swiper
    :modules="modules"
    :slides-per-view="2"
    :space-between="0"
    :centered-slides="true"
    navigation
    :freeMode="true"
    :effect="'coverflow'"
    :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 50,
      modifier: 0.8,
      slideShadows: false,
    }"
    :mousewheel="{
      forceToAxis: true,
      invert: false,
      sensitivity: 1,
      releaseOnEdges: true
    }"
    :breakpoints="{
        640: {
          slidesPerView: 2,
          spaceBetween:'40px',
        },
        320: {
          slidesPerView: 1.2,
          spaceBetween:0,
        },
      }"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="event in events" :key="event.id">
      <EventCard :event="event" />
    </swiper-slide>
  </swiper>
</template>

<script>
import { Navigation, EffectCoverflow, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import EventCard from '@/components/EventCard.vue'; // Adjust path as needed

export default {
  components: {
    Swiper,
    SwiperSlide,
    EventCard,
  },
  props: {
    events: Array, // Accept events data as a prop
  },
  setup() {
    const onSwiper = () => {};
    const onSlideChange = () => {};
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, EffectCoverflow, Mousewheel], // Include Coverflow effect
    };
  },
};
</script>

<style scoped>
/* Target the swiper-slide directly */
.swiper-slide {
  border-radius: 50px;
  padding-bottom: 10px;
  overflow: hidden; /* Ensures that any child elements or effects adhere to the border radius */
}

.swiper-slide .swiper-button-next::after, .swiper-button-prev::after {
  color: yellow !important;
  fill: yellow !important;
  border: 100px solid brown;
} 

</style>
