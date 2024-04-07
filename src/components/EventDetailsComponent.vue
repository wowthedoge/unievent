
<template>  
<div class="author-tag">
    <h6 class="label">By:</h6>
    <EventAuthorTag :author-id="event.authorId" />
  </div>
  <div class="datetime">
    <h4 class="label">Date and Time:</h4>
    <p>{{ formatDateTime(event.date, event.time) }}</p>
  </div>
  <div class="description">
    <h4 class="label">About Event:</h4>
    <p>{{ event.description }}</p>
  </div>

</template>

<script setup>
import EventAuthorTag from '@/components/EventAuthorTag.vue'
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