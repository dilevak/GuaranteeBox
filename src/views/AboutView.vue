<template>
    <Slide noOverlay>
      <router-link to="/Dashboard" id="dashboard">Dashboard</router-link>
      <a href="#" @click="logout()">Logout</a>
    </Slide>
  <div class="about">
    <img alt="GuaranteeBox Logo" class="logo" src="../assets/GuaranteeBox_Logo.png">
    <h1 class="white-text">About GuaranteeBox</h1>
    <p class="white-text">
      GuaranteeBox is a web application designed to help users efficiently manage and store information related to product guarantees and receipts. 
      The primary purpose of GuaranteeBox is to simplify the process of organizing and accessing essential details about product warranties.
      Users can declutter their physical space by storing digital copies of guarantees and receipts in one place, eliminating the need for paper documents.
    </p>
    <p class="white-text">
      Features: Guarantee and Receipt Storage, Expiration Date Tracking, User-Friendly Interface, Multi-Platform Accessibility
    </p>
  </div>
</template>

<script>
import { Slide } from 'vue3-burger-menu';

export default {
  name: 'AboutView',
  props: ['logout'],
  components: {
  Slide,
  }
}
</script>

<style scoped>
.about {
  background-color: #471AA1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.white-text {
  color: white;
}
</style>