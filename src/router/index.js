import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import CreateEventView from '@/views/CreateEventView.vue'
import EventDetailsView from '@/views/EventDetailsView.vue'
import SignInView from '@/views/SignInView.vue'
import EditProfileView from '@/views/EditProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create-event',
      name: 'createEvent',
      component: CreateEventView
    },
    {
      path: '/event/:id',
      name: 'event',
      component: EventDetailsView
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignInView
    },
    {
      path: '/edit-profile',
      name: 'editProfile',
      component: EditProfileView
    }
  ]
})

export default router
