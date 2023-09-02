<template>
  <div class="logo-container">
    <img alt="GuaranteeBox Logo" class="logo" src="../assets/GuaranteeBox_Logo.png">
    <div class="welcome">
      <h2>Welcome to GuaranteeBox {{ currentUser }}</h2>
    </div>
  </div>
  <div class="dashboard-view">
    <Slide noOverlay>
      <a id="home" href="#">About</a>
      <a href="#" @click="openAddForm">Add New</a>
      <a href="#" @click="logout()">Logout</a>
    </Slide>
    <AddGuaranteeReceipt v-if="showAddForm" @closeAddForm="hideAddForm" @guaranteeReceiptAdded="closeAddForm" />
    <div class="dashboard">
      <div class="guarantees-container">
        <h3>Added Guarantees</h3>
        <ul>
          <li v-for="(item, index) in addedItems" :key="index">
            <div class="guarantee-item">
              <div class="guarantee-image">
                <img v-if="item.guaranteePicture" :src="item.guaranteePicture" alt="Guarantee Picture">
              </div>
              <div class="guarantee-info">
                <p>Name: {{ item.name }}</p>
                <p>Expiration Date: {{ item.expireDate }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Slide } from 'vue3-burger-menu';
import AddGuaranteeReceipt from "@/components/AddGuaranteeReceipt.vue"; // Importanje AddGuaranteeReceipt komponente
import store from '@/store';

export default {
  name: 'DashboardView',
  props: ['logout'],
  components: {
    Slide,
    AddGuaranteeReceipt,
  },
  data() {
    return {
      showAddForm: false,
    };
  },
  computed: {
    currentUser() {
      return store.currentUser;
    },
  },
  methods: {
    openAddForm() {
      this.showAddForm = true;
    },
    hideAddForm() {
      this.showAddForm = false;
  },
  closeAddForm() {
      //Zatvori formu nakon uspjesnog dodavanja u bazu
      this.showAddForm = false;
    },
}
};
</script>

<style scoped>
.guarantees-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center; /* Center the content */
  margin-top: 20px;
  max-width: 80%; /* Limit the width to make it centered */
  margin: 20px auto; /* Center the container */
}
.dashboard-view {
  background-color: #471AA1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dashboard-view h2 {
  color: white;
}
.welcome h2 {
  color: white;
}

.logo-container {
  margin-top: 0px;
  text-align: center;
  background-color: #471AA1;
}

.logo {
  width: 80px;
  height: auto;
}
</style>