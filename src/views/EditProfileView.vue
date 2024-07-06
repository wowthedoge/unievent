<template>
  <div class="edit-profile-main">
    <div class="edit-profile">
      <h1>Edit Profile</h1>
      <div class="profile-picture-container">
        <div class="profile-image-wrapper">
          <img v-if="user && user.photoURL" :src="user.photoURL" alt="Profile Picture" class="profile-image" />
          <div v-else class="profile-placeholder">
            <span>No Profile Picture</span>
          </div>
        </div>
      </div>
      <div>
        <label for="displayName">Username:</label>
        <input type="text" id="displayName" v-model="displayNameInput" required />
      </div>
      <div class="weekly-email-checkbox">
        <input type="checkbox" id="weeklyUpdates" v-model="weeklyUpdates" />
        <label for="weeklyUpdates">Send me weekly events by email!</label>
      </div>
      <button type="submit" @click="handleSubmit">Save Profile</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthState } from '@/services/AuthService';
import { useRouter } from 'vue-router';
import { watch } from 'vue';

const router = useRouter();
const { user, modifyUser } = useAuthState();
const displayNameInput = ref('');
const weeklyUpdates = ref(false);
let profileImageUrl = '';

watch(user, (updatedUser) => {
  if (updatedUser) {
    displayNameInput.value = updatedUser.displayName || '';
    profileImageUrl = updatedUser.photoURL;
    weeklyUpdates.value = updatedUser.wantsWeeklyUpdates;
  }
});

const handleSubmit = async () => {
  await modifyUser({
    displayName: displayNameInput.value,
    photoURL: user.value.photoURL,
    wantsWeeklyUpdates: weeklyUpdates.value
  });
  router.go();
};

</script>

<style scoped>
.edit-profile-main {
  display: flex;
  height: calc(100vh - 50px);
  justify-content: center;
  align-items: center;
}

.edit-profile {
  width: min(400px, 90vw);
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 30px;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

input[type="checkbox"] {
  margin-right: 10px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 50px;
}

button:hover {
  background-color: #0056b3;
}

.profile-picture-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.profile-image-wrapper {
  position: relative;
  display: inline-block;
}

.profile-image {
  max-width: 200px;
  max-height: 200px;
  border-radius: 50%;
}

.profile-placeholder {
  width: 200px;
  height: 200px;
  background-color: #ccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-placeholder span {
  text-align: center;
  color: #333;
}

.weekly-email-checkbox {
  display: flex;
  flex-direction: row;
}
</style>
