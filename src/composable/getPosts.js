import { ref } from 'vue'
import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

const posts = ref([])
const error = ref(null)

const getPosts = () => {
  const load = async () => {
    try {
      const res = await getDocs(collection(db, 'posts'))
      posts.value = res.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        }
      })
    } catch (err) {
      error.value = `Failed to load posts: ${err.message}`
      console.error('Error loading posts:', err)
    }
  }

  return { posts, error, load }
}

export default getPosts
