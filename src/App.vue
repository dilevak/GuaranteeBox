<template>
<div>
  <router-view :logout="logout" />
</div>
</template>

<script>
import { firebase } from '@/firebase';
import store from '@/store';
import router from '@/router'; 

firebase.auth().onAuthStateChanged(function (user) {
  console.log('Firebase Auth State Changed:', user);
  const currentRoute = router.currentRoute;
  if (user) {
    console.log('User is signed in:', user.email);
    store.currentUser = user.email;
    if (!currentRoute.meta.needsUser) {
      router.push({ name: 'dashboard' });
    }
  } else {
    console.log('User not signed in');
    store.currentUser = null;
    if (currentRoute.meta.needsUser) {
      router.push({ name: 'login' });
    }
  }
});


export default {
  name: 'App',
  components: {

  },
  methods: {
    logout(){
      firebase.auth()
      .signOut()
      .then(() => {
          this.$router.push('/login');
    });
  }
}
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
