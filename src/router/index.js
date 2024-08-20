import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/HomePage.vue';
import CampPage from '../pages/CampPageDetails.vue';
import AdminDashboard from '../pages/AdminDashboard.vue';
import UserProfile from '../pages/UserProfile.vue';

//Defining Routes
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/CampPage', name: 'CampPage', component: CampPage },
  { path: '/admindashboard', name: 'AdminDashboard', component: AdminDashboard, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/userprofile', name: 'UserProfile', component: UserProfile, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' } // Redirect to home for undefined routes
];

// Creating the router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Use HTML5 history mode for navigation
  routes // Register the routes
});

// Navigation guard to handle route access control
router.beforeEach((to, from, next) => {
  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = JSON.parse(localStorage.getItem('user'));

  if (to.meta.requiresAuth && !isLoggedIn) { // Check if the route requires authentication
    next('/'); // Redirect to home if not logged in
  } else if (to.meta.role && user?.role !== to.meta.role) {
    next('/'); // Redirect to home if the user does not have the required role
  } else {
    next();
  }
});

export default router;
