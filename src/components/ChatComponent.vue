<template>
  <div class="chat" :class="{ 'chat-open': isDrawerOpen }">
    <div
      class="chat-toggle-bar"
      :class="{ 'chat-toggle-bar-open': isDrawerOpen }"
      @click="toggleDrawer"
    >
      <h3>Chat</h3>
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
    <div class="chat-input-bar" :class="{ 'chat-input-bar-open': isDrawerOpen }">
      <input type="text" size="10" v-model="chatInput" @keyup.enter="sendMessage" />
      <button @click="sendMessage">Send</button>
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
  border: 1px solid green;
}


.chat-list {
  margin-top: 30px;
  width: calc(100% - 80px);
  max-width: 400px;
  padding-top: 30px;
  border-top: 1px solid var(--color-dark);
  overflow-y: scroll;
  height: 70px;
  position: fixed;
  right: 40px;
  left: 40px;
  bottom: 80px;
  transition: height 0.3s ease;
}

.chat-list-open {
  height: 50vh;
}

h3 {
  font-family: 'League Spartan', sans-serif;
  font-size: clamp(30px, 4vw, 40px);
  color: var(--color-black);
  margin-top: auto;
  margin-bottom: auto;
}

.chat-toggle-bar {
  width: calc(100% - 80px);
  max-width: 400px;
  cursor: pointer;
  position: fixed;
  bottom: 150px;
  background-color: white;
  transition: bottom 0.3s ease;
}

.chat-toggle-bar :hover {
  background-color: rgb(215, 215, 215);
}

.chat-toggle-bar-open {
  bottom: calc(50vh + 80px);
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
  bottom: -170px;
  left: 40px;
  width: calc(100% - 80px);
  max-width: 400px;
  transition: bottom 0.3s ease;
}

.chat-input-bar-open {
  bottom: 30px;
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
@media (min-width: 841px) {

  .chat-toggle-bar {
    position: fixed;
    top: 110px;
    right: 50px;
  }

  .chat-toggle-bar :hover {
    cursor: auto;
    background-color: white;
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
    position: fixed;
    bottom: 50px;
    right: 50px;
    left: auto; 
  }

}
</style>
