import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
// import CreateEventView from '../views/CreateEventView.vue'; // Import the CreateEventView component
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/create-event', // Define the route path
    //   name: 'createEvent', // Define the route name
    //   component: CreateEventView // Specify the component to render for this route
    // },
  ]
})

export default router;
