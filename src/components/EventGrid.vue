<template>
  <div class="event-grid">
    <div v-for="event in events" :key="event.id" class="event-card-container">
      <EventCard :event="event" />
    </div>
  </div>
</template>

<script>
import EventCard from './EventCard.vue' // Assuming EventCard component exists

export default {
  components: {
    EventCard
  },
  props: {
    events: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.event-card-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  row-gap: 60px;
  margin: 0 40px;
  column-gap: 40px; 
}


  
  

</style>
