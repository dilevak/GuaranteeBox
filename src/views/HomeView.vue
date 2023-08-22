<template>
  <div class="app-container">
    <div class="home">
      <img alt="GuaranteeBox Logo" src="../assets/GuaranteeBox_Logo_big.png">
    </div>
  
    <div class="button-container">
      <router-link to="/Login" class="big-button login-button">Login</router-link>
      <router-link to="/Signup" class="big-button signup-button">Signup</router-link>
    </div>
  </div>
</template>

<style>
.app-container {
  background-color: #471AA1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  justify-content: center; /* Center content vertically */
}

/* Custom styleovi za divove*/
.button-container {
  display: flex;
  justify-content: center; /*Centriraj horizontalno*/
  margin-top: 20px;
}

.home {
  display: flex;
  justify-content: center; /*Centriraj horizontalno*/
  margin-top: 20px;
}

.big-button {
  display: inline-block;
  padding: 15px 40px;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 15px;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 5px; /* Adjust this value to control the spacing between buttons */
}

/* Styling za Login botun */
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





