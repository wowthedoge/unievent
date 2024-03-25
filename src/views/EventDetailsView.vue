<template>
  <div v-if="event" class="event-details-main">
    <div>
      <h2 class="title">{{ event.title }}</h2>
      <p>{{ event.description }}</p>
      <p>{{ formatDateTime(event.date, event.time) }}</p>
      <img :src="event.image" alt="Event Picture" />
    </div>
    <ChatComponent />
  </div>
  <div v-else>Could not find this event!</div>
</template>

<script setup>
import ChatComponent from '@/components/ChatComponent.vue'
import { ref, onMounted } from 'vue'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useRoute } from 'vue-router'

const route = useRoute()

const event = ref(null)

onMounted(() => {
  fetchEventFromFirestore()
})
const fetchEventFromFirestore = async () => {
  console.log('fetch event from firestore called')
  const firestore = getFirestore()
  const eventDocRef = doc(firestore, 'events', route.params.id) // Assuming 'route.params.id' is your document ID
  const eventDocSnapshot = await getDoc(eventDocRef)
  if (eventDocSnapshot.exists) {
    event.value = eventDocSnapshot.data() // Assign the document data to event.value
  } else {
    console.log('Event does not exist in Firestore!')
  }
}

function formatDateTime(date, time) {
  // Combine date and time into a single string
  const dateTimeString = `${date}T${time}`
  const dateTime = new Date(dateTimeString)

  // Format the combined date and time in a more readable format
  return dateTime.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}
</script>

<style scoped>
.event-details-main {
  padding: 100px 40px 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

h2 {
  font-family: 'League Spartan', sans-serif;
  font-size: clamp(40px, 5vw, 50px);
  color: var(--color-black);
}

@media (min-width: 841px) {
  .event-details-main {
    padding: 100px 40px 0 40px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
  }
}
</style>
