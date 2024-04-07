<template>
  <div class="chat" :class="{ 'chat-open': isDrawerOpen }">
    <div
      class="chat-toggle-bar"
      :class="{ 'chat-toggle-bar-open': isDrawerOpen }"
      @click="toggleDrawer"
    >
      <h3>Chat</h3>
      <font-awesome-icon icon="bars" class="icon" />
    </div>
    <div
      ref="chatContainer"
      :class="{ 'chat-list-open': isDrawerOpen }"
      class="chat-list"
    >
      <ul v-for="message in chatMessages" :key="message.id">
        <li>{{ message.text }}</li>
      </ul>
    </div>
    <div class="chat-input-bar-container">
      
      <div class="chat-input-bar" :class="{ 'chat-input-bar-open': isDrawerOpen }">
        <input type="text" size="10" v-model="chatInput" @keyup.enter="sendMessage" />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import { getDatabase, ref as firebaseRef, onValue, push, set } from 'firebase/database'
import { useRoute } from 'vue-router' 


const route = useRoute()
const isDrawerOpen = ref(false)

const chatContainer = ref(null)
const chatMessages = ref([])
const chatInput = ref('')
const isNarrowScreen = ref(window.innerWidth < 840);

function toggleDrawer() {
  if (!isNarrowScreen.value) isDrawerOpen.value = true
  isDrawerOpen.value = !isDrawerOpen.value
}

function updateScreenSize() {
  isNarrowScreen.value = window.innerWidth < 840;
  if (!isNarrowScreen.value) isDrawerOpen.value = true;
}

onMounted(() => {
  window.addEventListener('resize', updateScreenSize);
  fetchEventChatFromRealtimeDatabase();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
});


const fetchEventChatFromRealtimeDatabase = () => {
  const realtimeDB = getDatabase()
  const chatRef = firebaseRef(realtimeDB, `events/${route.params.id}/chat`)
  onValue(chatRef, (snapshot) => {
    chatMessages.value = snapshot.val() ? Object.values(snapshot.val()) : []
    scrollToBottom()
  })
}

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

const sendMessage = () => {
  if (chatInput.value) {
    const realtimeDB = getDatabase()
    const chatRef = firebaseRef(realtimeDB, `events/${route.params.id}/chat`)
    const newMessageRef = push(chatRef)
    set(newMessageRef, {
      text: chatInput.value,
      id: newMessageRef.key
    })
    chatInput.value = ''
    scrollToBottom()
  }
}
</script>

<style scoped>

.chat {
  z-index: 99;
}


.chat-list {
  margin-top: 30px;
  width: 100vw;
  max-width: 440px;
  padding-top: 30px;
  border: 1px solid var(--color-dark);
  overflow-y: scroll;
  height: 70px;
  position: fixed;
  bottom: 80px;
  transition: height 0.3s ease;
  background-color: white;
}

.chat-list-open {
  height: 65vh;
}

h3 {
  font-family: 'League Spartan', sans-serif;
  font-size: clamp(30px, 4vw, 40px);
  color: var(--color-light);
  margin-top: auto;
  margin-bottom: auto;
}

.chat-toggle-bar {
  width: 100%;
  max-width: 440px;
  cursor: pointer;
  position: fixed;
  bottom: 150px;
  background-color: var(--color-dark);
  transition: bottom 0.3s ease;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  overflow: hidden;
  padding-left: 40px;
  padding-top: 12px;
}

.chat-toggle-bar-open {
  bottom: calc(65vh + 80px);
}

.chat ul {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
}

.chat li {
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  background-color: #eee;
}

.chat-input-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 30px;
  width: 100%;
  max-width: 440px;
  padding: 0 10px;
  background-color: white;
}


.chat-input-bar input[type='text'] {
  flex-grow: 1;
  margin-right: 10px;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 0 10px;
}

.chat-input-bar button {
  white-space: nowrap;
  border-radius: 25px;
  background-color: var(--color-dark);
  color: var(--color-yellow);
  border: none;
  padding: 4px 15px;
  font-weight: 500;
}

.chat-input-bar-container {
  background-color: white;
  bottom: 0;
  position: fixed;
  width: 440px;
  height: 80px;

}
  
  
  

@media (min-width: 841px) {

  .chat-toggle-bar {
    position: fixed;
    top: 110px;
    right: 50px;
  }

  .chat-toggle-bar :hover {
    cursor: auto;
  }

  .chat-list {
    height: calc(100vh - 50px - 220px);
    overflow-y: auto;
    position: fixed;
    right: 50px;
    left: auto;
    bottom: 100px;
  }

  .chat-input-bar {
    background-color: transparent;
  }

  .chat-input-bar {
    position: fixed;
    bottom: 50px;
    right: 50px;
    left: auto; 
  }

}
</style>
