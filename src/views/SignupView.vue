<template>
  <div class="app-container">
    <img alt="GuaranteeBox Logo" src="../assets/GuaranteeBox_Logo_mid.png">
    <div class="home">
  </div>
    <!--Forma za signup i signup botun-->
   <!--Pomocu v-modela cemo bindati input i moći ćemo pohraniti te varijable i pristupiti im kroz kod.-->
  <form name="signup-form">
    <div class="mb-3">
      <label for="email" class="white-label">Email: </label>
      <input type="email" id="email" v-model="input.email" />
    </div>
    <div class="mb-3">
      <label for="password" class="white-label">Password: </label>
      <input type="password" id="password" v-model="input.password" />
    </div>
    <button class="big-button signup-button" type="submit" @click.prevent="signup()">
      Signup
    </button>
    <p class="white-text">Already have an account? <router-link to="/login" button class="big-button login-button" >Login</router-link></p>
    
    <!-- Test for printing email/password variables -->
    <!--<p>Email is: {{ input.email }}</p> -->
    <!--<p>Password is: {{ input.password }}</p> -->

    <!-- Display signup status message to the user -->
    <p v-if="signupStatusMessage">{{ signupStatusMessage }}</p>
  </form>
</div>
</template>

<script>
export default {
  name: 'SignupView',
  data() {
    return {
      input: {
        email: '',
        password: '',
      },
      signupStatusMessage: '', // To store the signup status message
    };
  },
  methods: {
    signup() {
      // Make sure both email and password are not empty
      if (this.input.email !== '' && this.input.password !== '') {
        console.log('registered');
        this.signupStatusMessage = ''; // Don't display the "registered" status to the user
      } else {
        console.log('Email and Password cannot be empty');
        this.signupStatusMessage = 'Email and Password cannot be empty'; // Error message displayed to the user
      }
    },
  },
};
</script>

<style scoped>

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