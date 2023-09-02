<template>

<router-view/>

<div>
  <router-view :logout="logout" />
</div>
  
</template>

<script>
import { firebase } from '@/firebase';

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user.email);
  } else {
    //User not signed in
    console.log('No User');
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
