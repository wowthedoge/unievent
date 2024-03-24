<template>
  <main class="main">
    <div class="title">Today's Events</div>
    <HorizontalMenu :events="events" />
    <button class="create-event-button" @click="onCreateEventButtonClick"> + Create an event </button>
  </main>
</template>

<script setup>

import { useRouter } from 'vue-router';
const router = useRouter();
const onCreateEventButtonClick = () => {
  router.push('/create-event');
} 

// import EventCard from "../components/EventCard.vue";
import HorizontalMenu from "../components/HorizontalMenu.vue"
// Example events data
const events = [
  {
    id: 1,
    image:
      'data:image/jpeg;base64,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',
    title: 'Event 1',
    description: 'This is a description of event 1.'
  },
  {
    id: 2,
    image: 'https://www.business2community.com/wp-content/uploads/2015/10/42454567_m.jpg.jpg',
    title: 'Event 2',
    description: 'This is a description of event 2.'
  },
  {
    id: 3,
    image: 'https://www.business2community.com/wp-content/uploads/2015/10/42454567_m.jpg.jpg',
    title: 'Event 3',
    description: 'This is a description of event 3.'
  },
  {
    id: 4,
    image: 'https://www.business2community.com/wp-content/uploads/2015/10/42454567_m.jpg.jpg',
    title: 'Event 4',
    description: 'This is a description of event 4.'
  },
  {
    id: 5,
    image: 'https://www.business2community.com/wp-content/uploads/2015/10/42454567_m.jpg.jpg',
    title: 'Event 5',
    description: 'This is a description of event 5.'
  }
  // Add more events as needed
]
</script>

<style scoped>
.main {
  background-color: var(--color-light);
  height: 100vh;
  padding-top: 50px; /* Adjust this value based on your header's height */
}

.title {
  font-family: 'League Spartan', sans-serif;
  font-size: clamp(40px, 5vw, 50px);  
  color: var(--color-black);
  margin-top: 50px;
  margin-bottom: 20px;
  margin-left: 40px;
}

/* Ensure the carousel takes full width and the Swiper navigation buttons are visible */
.carousel {
  width: 100%;
}

.swiper {
  width: 100%;
}

.swiper-slide {
  display: flex;
  justify-content: center;
}

.create-event-button {
  position: absolute;
  bottom: 30px;
  right: 30px;
  border-radius: 25px;
  background-color: var(--color-yellow);
  color: var(--color-dark);
  border: none;
  padding: 10px 20px;
}
</style>
