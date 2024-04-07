<template>
  <div class="create-event-view">
    <div v-if="user" class="title">Create an event</div>
    <div v-else class="title">Please sign in to create an event!</div>

    <form v-if="user" @submit.prevent="submitEvent" @keydown.enter.prevent="handleEnter">
      <label for="event-title">Title</label>
      <input id="event-title" v-model="event.title" type="text" required />

      <label for="event-description">Description</label>
      <textarea id="event-description" v-model="event.description" required></textarea>

      <label for="event-picture">Upload image</label>
      <input id="event-picture" class="input-picture" type="file" @change="onFileChange" />

      <label for="event-date">Date</label>
      <input id="event-date" v-model="event.date" type="date" required />

      <label for="event-time">Time</label>
      <input id="event-time" v-model="event.time" type="time" required />

      <label for="event-tags">Tags</label>
      <input
        id="event-tags"
        v-model="tempTag"
        type="text"
        placeholder="Food Movies Sports Programming Fun"
        @keyup.enter="handleAddTag"
      />

      <div class="tags-display">
        <span v-for="(tag, index) in event.tags" :key="index" class="tag">
          {{ tag }} <font-awesome-icon @click="() => removeTag(index)" icon="times" class="icon" />
        </span>
      </div>

      <button class="submit-button" type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useAuthState } from '../services/AuthService'

const router = useRouter()
const { user } = useAuthState()


library.add(faTimes)

const tempTag = ref('')

const BASE_EVENT = {
  title: '',
  description: '',
  date: '', 
  time: '',
  tags: [],
  author: '',
  picture: ''
}

const event = ref(BASE_EVENT)

const handleAddTag = () => {
  const newTag = tempTag.value.trim()
  if (newTag) {
    event.value.tags.push(newTag)
    tempTag.value = ''
  }
}

const removeTag = (index) => {
  event.value.tags.splice(index, 1)
}

const onFileChange = (e) => {
  event.value.picture = e.target.files[0]
}

const submitEvent = async () => {
  try {
    // Upload picture to Firebase Storage and get URL
    const storage = getStorage()
    const storageReference = storageRef(storage, `events/${event.value.picture.name}`)
    const uploadResult = await uploadBytes(storageReference, event.value.picture)
    const pictureUrl = await getDownloadURL(uploadResult.ref)

    // Save event to Firestore
    const db = getFirestore()
    await addDoc(collection(db, 'events'), {
      ...event.value,
      picture: pictureUrl,
      tags: event.value.tags.filter((tag) => tag.trim() !== ''), // Remove empty tags
      author: user.value.uid,
    })

    alert('Event was created!')

    event.value = BASE_EVENT
    router.push('/')
  } catch (error) {
    console.error('Error creating event:', error)
    alert('Failed to create event.')
  }
}
</script>

<style scoped>
.title {
  font-family: 'League Spartan', sans-serif;
  font-size: clamp(40px, 5vw, 50px);
  color: var(--color-black);
  margin-top: 100px;
  margin-bottom: 20px;
  margin-left: 40px;
}

.create-event-view {
  margin-bottom: 90px;
}

.create-event-view form {
  margin: 0 40px;
  display: flex;
  flex-direction: column;
  font-size: 15px;
}
form input,
form textarea {
  margin-bottom: 10px;
  border: 1px solid grey;
  border-radius: 5px;
}

form .input-picture {
  display: inline;
  max-width: 200px;
  cursor: pointer;
}

.tag {
  border: 1px solid grey;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  display: inline-block;
}
.tag .icon {
  border: none;
  background-color: transparent;
  color: grey;
  cursor: pointer;
}

.submit-button {
  position: fixed;
  bottom: 30px;
  border-radius: 25px;
  background-color: var(--color-dark);
  color: var(--color-yellow);
  border: none;
  padding: 14px 20px;
  font-weight: 500;
  width: calc(100% - 80px);
  max-width: 400px;
}
</style>
