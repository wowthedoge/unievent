<template>
  <main class="main">
    <div class="title">Upcoming Events</div>
    <EventGrid :events="events" />
    <button class="create-event-button" @click="onCreateEventButtonClick"> + Create an event </button>
  </main>
</template>

<script setup>




// import EventCard from "../components/EventCard.vue";
import EventGrid from "../components/EventGrid.vue"

import { onMounted, ref } from 'vue';
import { getFirestore, collection, query, getDocs, orderBy } from 'firebase/firestore';
import { useRouter } from 'vue-router';
const events = ref([]);

const fetchEvents = async () => {
  try {
    const db = getFirestore(); // Get Firestore instance
    const eventsCollection = collection(db, 'events'); // Reference to the 'events' collection
    const eventsQuery = query(eventsCollection, orderBy('date', 'desc'));
    
    const querySnapshot = await getDocs(eventsQuery);

    // Process querySnapshot
    events.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      picture: doc.data().picture ?? 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
    }));
  } catch (error) {
    // Handle any errors that occur during fetching or processing
    console.error('Error fetching events:', error);
  }
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
  height: 100%;
  min-height: 100vh;
  padding: 50px 0; /* Adjust this value based on your header's height */
}

.title {
  font-family: 'League Spartan', sans-serif;
  font-size: clamp(40px, 5vw, 50px);  
  color: var(--color-black);
  margin-top: 50px;
  margin-bottom: 20px;
  margin-left: 40px;
}

.create-event-button {
  z-index: 999;
  position: fixed;
  bottom: 30px;
  right: 30px;
  border-radius: 25px;
  background-color: var(--color-yellow);
  color: var(--color-dark);
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  border: 2px solid var(--color-dark);
}

.create-event-button:hover {
  background-color: var(--color-dark);
  color: var(--color-yellow);
}
</style>

