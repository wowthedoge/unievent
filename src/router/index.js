import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateEventView from '../views/CreateEventView.vue'
import EventDetailsView from '@/views/EventDetailsView.vue'
import TestView from '@/views/TestView.vue'

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
    }
  ]
})

export default router
