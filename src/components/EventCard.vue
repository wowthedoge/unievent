    <template>
        <div class="event-card">
        <img :src="event.image" alt="Event Image" />
        <div class="content">
            <h3>{{ event.title }}</h3>
            <p>{{ event.description }}</p>
        </div>
        </div>
    </template>
    
    <script setup>
    defineProps({
        event: Object
    });
    </script>
    
    <style scoped>
.event-card {
    border-radius: 20px; /* Increase for more rounded corners */
    width: clamp(100px, 60vw, 500px); /* Adjust according to your preference */
    margin: 0 auto; /* Centers the card if the parent container is wider */
    box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Optional: adds a subtle shadow for depth */
    overflow: hidden; /* Ensures the content respects the border radius */
}

.event-card img {
  width: 100%; /* Keeps the image width responsive to the container width */
  object-fit: cover; /* Ensures the image covers the frame, cropping if necessary */
}

.event-card .content {
  padding: 15px; /* Increased padding for more space inside */
    }

.event-card h3, .event-card p {
  margin: 10px 0; /* Adds some space between the title, description, and the edges */
}
</style>