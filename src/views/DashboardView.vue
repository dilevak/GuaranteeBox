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
          <li v-for="(item, index) in addedItems" :key="index" @click="openPopup(item)">
            <div class="guarantee-item">
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
  <!--Popup prozor koji se otvara nakon klika na garanciju sa slikama garancije i racuna-->
  <div class="popup" v-if="isPopupOpen">
    <div class="popup-content">
      <h3>{{ selectedGuarantee.name }}</h3>
      <p>Expiration Date: {{ selectedGuarantee.expireDate }}</p>
      <div class="popup-images">
        <img v-if="selectedGuarantee.guaranteePicture" :src="selectedGuarantee.guaranteePicture" alt="Guarantee Picture">
        <img v-if="selectedGuarantee.receiptPicture" :src="selectedGuarantee.receiptPicture" alt="Receipt Picture">
      </div>
      <button @click="closePopup">Close</button>
    </div>
  </div>
</template>

<script>
import { Slide } from 'vue3-burger-menu';
import AddGuaranteeReceipt from "@/components/AddGuaranteeReceipt.vue"; // Importanje AddGuaranteeReceipt komponente
import store from '@/store';
import { db, auth } from '@/firebase';

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
      addedItems: [], //Array za spremanje povucenih podataka iz baze
      selectedGuarantee: null, //Za pracenje odabrane garancije, u nju se sprema kad se klikne na garanciju
      isPopupOpen: false, //Za pracenje da li je garancija otvorena ili zatvorena
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

//Pregled garancija    
  openPopup(guarantee) {
    this.selectedGuarantee = guarantee; //Postavlja selectedGuarantee na kliknutu garanciju
    this.isPopupOpen = true; //Otvara se popup pregled garancije
    },

  closePopup() {
    this.selectedGuarantee = null; //Prazni selectedGuarantee
    this.isPopupOpen = false; //Zatvara se popup  za pregled garancije
    },

    //Povlacanje garancija po userID-u iz firebase-a
    async fetchUserGuarantees() {
      console.log('Testttttt...');
      try {
        const user = auth.currentUser; //Trenutno logiran user
        if (!user) {
          console.error('User is not authenticated.');
          return;
        }
        const userId = user.uid;
        console.log('User ID:', userId); //Provjera da li radi
        //Upit prema firestoru za povlacanje garancija trenutno logirano korisnika prema userID-u
        const snapshot = await db.collection('guarantees').where('userId', '==', userId).get();
        const guarantees = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          guarantees.push({
            id: doc.id,
            name: data.name,
            expireDate: data.expireDate,
            guaranteePicture: data.guaranteePicture,
            receiptPicture: data.receiptPicture,
          });
        });
        console.log('Povucene garancije:', guarantees); //Provjera povucenih garancija iz baze
        this.addedItems = guarantees; //Postavljanje povucenih podataka u addedItems
      } catch (error) {
        console.error('Error kod povlacenja user-specific garancija:', error);
      }
    },
  },
  mounted() {
    console.log('Component is mounted');
    this.fetchUserGuarantees();
  },
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