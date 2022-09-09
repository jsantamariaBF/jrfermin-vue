import { createRouter, createWebHistory } from 'vue-router'
import ViewNotes from '../views/ViewNotes.vue'
import EditNote from '../views/EditNote.vue'
import Stats from '../views/Stats.vue'
import NoteView from '../views/NoteView.vue'
import { useStoreAuth } from '../stores/useStoreAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ViewNotes
    },
    {
      path: '/editNote/:id',
      name: 'EditNote',
      component: EditNote
    },
    {
      path: '/note/:id',
      name: 'NoteView',
      component: NoteView,
      props: true,
    },
    {
      path: '/stats',
      name: 'Stats',
      component: Stats
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

 /* Protect routes if the user has not permissions */
router.beforeEach(async (to, from) => {
  const storeAuth = useStoreAuth();

  if(!storeAuth.user.id && to.name === 'Stats') return { name: 'Home' };

  // if (storeAuth.user.id && to.name === 'Auth') return { name: 'Home' }
})

export default router
