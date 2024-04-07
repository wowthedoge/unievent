<template>
    
  <div class="event-author-tag">
    <img :src="authorPic" alt="Author's Picture" />
    <span>{{ authorName }}</span>
  </div>
</template>

<script setup>
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { ref, onMounted, defineProps } from 'vue'

const authorName = ref('')
const authorPic = ref(null)

const author = defineProps({
  authorId: String
})

const fetchAuthorFromFirestore = async (authorId) => {
  const firestore = getFirestore()
  const authorDocRef = doc(firestore, 'users', authorId)
  const authorDocSnapshot = await getDoc(authorDocRef)
  if (authorDocSnapshot.exists()) {
    const authorData = authorDocSnapshot.data()
    authorName.value = authorData.displayName 
    authorPic.value = authorData.photoURL 
  } else {
    console.log('Author does not exist in Firestore!')
  }
}

onMounted(() => {
  // Call fetchAuthorFromFirestore with authorId from props
  fetchAuthorFromFirestore(author.authorId)
})
</script>

<style scoped>
/* Add your scoped styles here */
.event-author-tag {
  display: flex;
  align-items: center;
}
.event-author-tag img {
  width: 30px; /* Adjust size as needed */
  height: 30px; /* Adjust size as needed */
  border-radius: 50%; /* Assuming author picture is round */
  margin-right: 10px; /* Adjust spacing as needed */
}
</style>
