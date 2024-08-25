import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShowPost from '../views/posts/Show.vue'
import Tag from '../views/posts/Tag.vue'
import SignUp from '../components/users/SignUp.vue'
import SignIn from '../components/users/SignIn.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import { auth, db } from '../firebase/config'
import { getDoc, doc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { title: 'Home Page' },
  },
  {
    path: '/user/signup',
    name: 'SignUp',
    component: SignUp,
    meta: { title: 'Sign Up' },
  },
  {
    path: '/user/signin',
    name: 'SignIn',
    component: SignIn,
    meta: { title: 'Sign In' },
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requireRole: 'admin' },
  },
  {
    path: '/posts/:id',
    name: 'ShowPost',
    component: ShowPost,
    props: true,
    meta: { title: '' },
  },
  {
    path: '/tag/:tag',
    name: 'Tag',
    component: Tag,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Ensure auth is initialized before setting up the router guard
let authInitialized = false

const initializeAuth = new Promise((resolve) => {
  onAuthStateChanged(auth, (user) => {
    authInitialized = true
    resolve(user)
  })
})

router.beforeEach(async (to, from, next) => {
  await initializeAuth

  const user = auth.currentUser

  // console.log('Navigating to:', to.name)
  // console.log('User:', user)

  if (to.matched.some((record) => record.meta.requireRole)) {
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid)
        const userDoc = await getDoc(userRef)

        if (userDoc.exists()) {
          const userData = userDoc.data()
          const userRole = userData.role

          // console.log('User role:', userRole)

          if (userRole === to.meta.requireRole) {
            next()
          } else {
            console.warn('Access denied. User does not have the required role.')
            next('/')
          }
        } else {
          console.warn('No user document found.')
          next('/')
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        next('/')
      }
    } else {
      console.warn('User not authenticated.')
      next('/user/signin')
    }
  } else {
    // Routes that do not require any specific role
    next()
  }

  if (to.name === 'ShowPost' && to.params.id) {
    try {
      const postRef = doc(db, 'posts', to.params.id) // Specify the post ID
      const docSnap = await getDoc(postRef)

      if (docSnap.exists()) {
        const postData = docSnap.data()
        document.title = postData.title || 'Default Title' // Set the document title
        to.meta.title = postData.title
      } else {
        document.title = 'Post Not Found' // Handle the case where the document does not exist
        to.meta.title = 'Post Not Found'
      }
    } catch (error) {
      console.error('Error fetching post title:', error)
      document.title = 'Error' // Fallback title in case of an error
      to.meta.title = 'Error'
    }
  } else {
    document.title = to.meta.title || 'Default Title' // Fallback title
  }
  next()
})

export default router
