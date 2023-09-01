<template>
  <div class="app-container">
    <img alt="GuaranteeBox Logo" src="../assets/GuaranteeBox_Logo_mid.png">
    <div class="home">
    </div>
     <!--Forma za signup i signup botun-->
    <form name="signup-form">
      <div class="mb-3">
        <label for="username" class="white-label">Username:</label>
        <input type="text" id="username" v-model="input.username" />
      </div>
      <div class="mb-3">
        <label for="email" class="white-label">Email:</label>
        <input type="email" id="email" v-model="input.email" />
      </div>
      <div class="mb-3">
        <label for="password" class="white-label">Password:</label>
        <input type="password" id="password" v-model="input.password" />
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="white-label">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="input.confirmPassword" />
      </div>
      <button class="big-button signup-button" type="submit" @click.prevent="signup()">
        Signup
      </button>
      <p class="white-text">Already have an account? <router-link to="/login" button class="big-button login-button" >Login</router-link></p>

      <!-- Prikaz signupStatusMessage u bijeloj boji korisniku  -->
      <p v-if="signupStatusMessage" class="white-text">{{ signupStatusMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignupView',
  data() {
    return {
      input: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      signupStatusMessage: '', //Za spremanje status poruke
    };
  },
  methods: {
    signup() {
      // Make sure all fields are not empty
      if (
        this.input.username !== '' &&
        this.input.email !== '' &&
        this.input.password !== '' &&
        this.input.confirmPassword !== ''
      ) {
        if (this.input.password === this.input.confirmPassword) {
          console.log('Registered');
          this.signupStatusMessage = ''; //Ne prikazujemo nista korisniku ako je uspjesno
        } else {
          console.log('Passwords do not match');
          this.signupStatusMessage = 'Passwords do not match'; //Prikazujemo ako lozinke nisu iste
        }
      } else {
        console.log('All fields are required');
        this.signupStatusMessage = 'All fields are required'; //Prikazujemo ako sva polja nisu ispunjena
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