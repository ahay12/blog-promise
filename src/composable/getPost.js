import { getDoc, doc } from 'firebase/firestore'
import { ref } from 'vue'
import { db } from '../firebase/config'

const post = ref(null)
const error = ref(null)

const getPost = (id) => {
  const load = async () => {
    try {
      // Introduce a delay (e.g., 2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const docRef = doc(db, 'posts', id)
      const res = await getDoc(docRef)
      if (res.exists()) {
        post.value = { ...res.data(), id: res.id }
      }
    } catch (err) {
      error.value = err.message
    }
  }

  return { post, error, load }
}

export default getPost
