<template>
  <div class="event-card" @click="navigateToEventDetails(event)">
    <img :src="event.image" alt="Event Image" />
    <div class="content">
      <h3>{{ event.title }}</h3>
      <p>{{ event.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  event: Object
})

const router = useRouter()

const navigateToEventDetails = (event) => {
  router.push({ name: 'event', params: { id: event.id } })
}
</script>

<style scoped>
.event-card {
  border-radius: 20px;
  /* width: clamp(100px, 60vw, 500px); */
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  height: 500px;
  border: 0.1px solid grey;
  transition: transform 0.3s ease;
}

.event-card:hover {
  transform: scale(1.05); 
}


.event-card img {
  width: 100%;
  object-fit: cover;
}

.event-card .content {
  padding: 20px;
}

.event-card h3,
.event-card p {
  margin: 10px 0;
}
</style>
