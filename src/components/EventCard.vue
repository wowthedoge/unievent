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
  width: clamp(100px, 60vw, 500px);
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
}

.event-card img {
  width: 100%;
  object-fit: cover;
}

.event-card .content {
  padding: 15px;
}

.event-card h3,
.event-card p {
  margin: 10px 0;
}
</style>
