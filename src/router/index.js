import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/:name',
      name: 'Countries',
      component: () => import('../views/CountriesView.vue'),
      
    },
    {
      path: '/borders/:borders',
      name: 'Borders',
      component: () => import('../views/BordersView.vue'),
      
    }
  ]
})

export default router
