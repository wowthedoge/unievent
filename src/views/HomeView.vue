<template>
  <main class="main">
    <div class="title">Upcoming Events</div>
    <HorizontalMenu :events="events" />
    <button class="create-event-button" @click="onCreateEventButtonClick"> + Create an event </button>
  </main>
</template>

<script setup>




// import EventCard from "../components/EventCard.vue";
import HorizontalMenu from "../components/HorizontalMenu.vue"

import { onMounted, ref } from 'vue';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { useRouter } from 'vue-router';
// Example events data
const events = ref([]); // Use a ref to hold your events

const fetchEvents = async () => {
  const db = getFirestore(); // Get Firestore instance
  const eventsCollection = collection(db, 'events'); // Reference to the 'events' collection
  const eventsQuery = query(eventsCollection);
  const querySnapshot = await getDocs(eventsQuery);

  events.value = querySnapshot.docs.map(doc => ({
    id: doc.id, // Use the document ID from Firestore as the event ID
    ...doc.data(), // Spread the document data
    image: doc.image ?? 'https://www.business2community.com/wp-content/uploads/2015/10/42454567_m.jpg.jpg',
  }));
};

onMounted(fetchEvents);

const router = useRouter();
const onCreateEventButtonClick = () => {
  router.push('/create-event');
}
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
  z-index: 999;
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

<!-- 
{
  id: 2,
  image: 'https://www.business2community.com/wp-content/uploads/2015/10/42454567_m.jpg.jpg',
  title: 'Event 2',
  description: 'This is a description of event 2.'
}, -->