<template>
  <div class="event-card" @click="navigateToEventDetails(event)">
    <img :src="event.picture" alt="Event Picture" />
    <div class="content">
      <h3>{{ event.title }}</h3>
      <div class="date-time-location">
        <p><font-awesome-icon icon="calendar-days" class="icon" />{{ event.date }}
        <span>{{ formatTime(event.time) }}</span></p>
        <div><font-awesome-icon icon="location-dot" class="icon" />{{ event.location }}</div>
      </div>
      <p class="description">{{ event.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faLocationDot, faCalendarDays)

defineProps({
  event: Object
})

const router = useRouter()

const navigateToEventDetails = (event) => {
  router.push({ name: 'event', params: { id: event.id } })
}

function formatTime(time) {
  const [hour, minute] = time.split(':');
  const hours = parseInt(hour);
  const suffix = hours >= 12 ? "PM" : "AM";
  const adjustedHour = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
  return `${adjustedHour}:${minute} ${suffix}`;
}
</script>

<style scoped>
.event-card {
  border-radius: 20px;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  height: 500px;
  border: 0.1px solid grey;
  transition: transform 0.3s ease;
}

img {
  max-height: 35%;
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

.description {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  text-overflow: ellipsis;
}
.date-time-location {
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 30px;
  align-items: center;
}

.icon {
  margin-right: 8px;
}
</style>
