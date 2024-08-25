import { ref } from 'vue'
import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

const users = ref([])
const error = ref(null)

const getUsers = () => {
  const load = async () => {
    try {
      const res = await getDocs(collection(db, 'users'))
      users.value = res.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        }
      })
    } catch (err) {
      error.value = `Failed to load users: ${err.message}`
      console.error('Error fetching users:', err)
    }
  }
  return { users, error, load }
}

export default getUsers
