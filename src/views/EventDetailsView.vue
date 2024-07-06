<template>
  <div v-if="event" class="event-details-main">
    <div class="event-details">
      <img :src="event.picture" alt="Event Picture" />
      <h2 class="title">{{ event.title }}</h2>
      <!-- <div class="detail author-tag">
        <h6 class="label">By:</h6>
        <EventAuthorTag :author-id="event.authorId" />
      </div> -->
      <div class="detail datetime">
        <h4 class="label">Date and Time:</h4>
        <p>{{ formatDateTime(event.date, event.time) }}</p>
      </div>
      <div class="detail location">
        <h4 class="label">Location:</h4>
        <p>{{ event.location }}</p>
      </div>
      <div class="detail description">
        <h4 class="label">About Event:</h4>
        <p>{{ event.description }}</p>
      </div>
    </div>
    <ChatComponent />
  </div>
  <div v-else>Could not find this event!</div>
</template>

<script setup>
import ChatComponent from '@/components/ChatComponent.vue'
import EventAuthorTag from '@/components/EventAuthorTag.vue'
import { ref, onMounted } from 'vue'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useRoute } from 'vue-router'

const route = useRoute()

const event = ref(null)

onMounted(() => {
  fetchEventFromFirestore()
})

const fetchEventFromFirestore = async () => {
  const firestore = getFirestore()
  const eventDocRef = doc(firestore, 'events', route.params.id)
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
.event-details {
  padding: 0 40px;
  margin-bottom: 100px;
}

.event-details img {
  width: 100%;
  min-width: 250px;
  object-fit: cover;
  border-radius: 25px;
  margin-bottom: 20px;
  max-width: 360px;
}

.event-details-main {
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

h2 {
  font-family: 'League Spartan', sans-serif;
  font-size: clamp(40px, 5vw, 50px);
  color: var(--color-black);
  margin-bottom: 0;
}

.author-tag {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
    margin-bottom: 10px;
  }

.author-tag h6 {
  margin: 0;
}

h4 {
  margin-top: 20px;
}

.description {
  max-width: 360px;

}

.detail {
  margin-bottom: 30px;
}

@media (min-width: 841px) {
  .event-details-main {
    padding: 100px 40px 0 40px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    max-width: 50vw;
  }


}
</style>
