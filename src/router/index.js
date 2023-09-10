import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import DashboardView from '../views/DashboardView.vue'
import store from '@/store';
import { firebase } from '@/firebase';
import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    props: (route) => ({ logout: route.params.logout }),
    meta:{
      needsUser: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//Cekamo(await) firebaseOnAuth da provjeri auth status prije nastavka s rutanjem
router.beforeEach(async (to, from, next) => {
  const user = await new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user);
    });
  });
  console.log("Stara ruta", from.name, "->", to.name, "Korisnik=", store.currentUser );

  if (!user && to.meta.needsUser) {
    console.error('NE DOPUSTAM!');
    next('login');
  } else {
    next();
  }
});

export default router
