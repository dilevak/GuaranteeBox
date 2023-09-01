<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>

<template>
    <div class="login-view">
      <img alt="GuaranteeBox Logo" src="../assets/GuaranteeBox_Logo_mid.png">
      <div class="home">
      
  </div>
  <!--Forma za login i login botun-->
  <!--Pomocu v-modela cemo bindati input i moći ćemo pohraniti te varijable i pristupiti im kroz kod.-->
  <form name="login-form">
      <div class="mb-3">
        <label for="email" class="white-label">Email: </label>
        <input type="text" id="email" v-model="input.email" />
      </div>
      <div class="mb-3">
        <label for="password" class="white-label">Password: </label>
        <input type="password" id="password" v-model="input.password" />
      </div>
    <button class="big-button login-button" type="submit" @click.prevent="login()">Login</button>

    <p class="white-text">Don't have an account yet? <router-link to="/Signup" class="big-button signup-button" exact>Signup</router-link></p>
    
    <!-- Prikaz login status poruke korisniku -->
    <p v-if="loginStatusMessage">{{ loginStatusMessage }}</p>
  </form>
</div>
</template>

<script>

export default {
  name: 'LoginView',
  data() {
    return {
      input: {
        email: '',
        password: '',
      },
      loginStatusMessage: '', //Za spremanje login status poruke
    };
  },
  methods: {
    login() {
      // Make sure both email and password are not empty
      if (this.input.email !== '' && this.input.password !== '') {
        console.log('authenticated');
        this.loginStatusMessage = ''; //Ne prikazivanje "authenticated" statusa useru

        this.$router.push('/dashboard'); //Routaj na dashboard nakon successful logina
      } else {
        console.log('email and Password cannot be empty');
        this.loginStatusMessage = 'email and Password cannot be empty'; // Greska koja se ispisuje korisniku
      }
    },
  },
};
</script>

<style scoped>
.login-view {
  background-color: #471AA1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.white-label {
  color: white;
}

.white-text {
  color: white;
}

.login-button {
  background-color: #9E68B4;
  color: #ffffff; /* boja texta */
}

/* Styling za Signup botun */
.signup-button {
  background-color: #7D3DAF;
  color: #ffffff; /*Boja texta*/
}

</style>
