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

    <div class="guarantees-container">
      <h3>Added Guarantees</h3>
      <div class="guarantee-list">
        <div class="guarantee-item" v-for="(item, index) in addedItems" :key="index" :class="{ expired: isExpired(item.expireDate) }">
          <div class="guarantee-info">
            <div @click="openPopup(item)" style="cursor: pointer;">
            <p>Name: {{ item.name }} {{ isExpired(item.expireDate) ? ' (Expired)' : '' }}</p>
            </div>
            <p>Expiration Date: {{ item.expireDate }}</p>
          </div>
        </div>
      </div>
     <!-- <DeleteGuarantee
    v-if="showDeleteDialog"
    @deleteGuaranteeConfirmed="deleteConfirmed"
    @cancelDelete="cancelDelete"/>-->
    </div>
  </div>
  <!--Popup prozor koji se otvara nakon klika na garanciju sa slikama garancije i racuna-->
  <div class="popup-details" v-if="isPopupOpen">
    <div class="popup-content">
      <h3>{{ selectedGuarantee.name }}</h3>
      <p>Expiration Date: {{ selectedGuarantee.expireDate }}</p>
      <div class="popup-images">
        <img v-if="selectedGuarantee.guaranteePicture" :src="selectedGuarantee.guaranteePicture" alt="Guarantee Picture">
        <img v-if="selectedGuarantee.receiptPicture" :src="selectedGuarantee.receiptPicture" alt="Receipt Picture">
      </div>
      <button @click="closePopup">Close</button>
      <!--Delete botun-->
      <DeleteGuarantee @deleteClicked="openDeleteDialog(item)"/>
    </div>
  </div>
  

</template>

<script>
import { Slide } from 'vue3-burger-menu';
import AddGuaranteeReceipt from "@/components/AddGuaranteeReceipt.vue"; // Importanje AddGuaranteeReceipt komponente
import store from '@/store';
import { db, auth, storage } from '@/firebase';
import DeleteGuarantee from '@/components/DeleteGuarantee.vue';

export default {
  name: 'DashboardView',
  props: ['logout'],
  components: {
    Slide,
    AddGuaranteeReceipt,
    DeleteGuarantee,
  },
  data() {
    return {
      showAddForm: false,
      addedItems: [], //Array za spremanje povucenih podataka iz baze
      selectedGuarantee: null, //Za pracenje odabrane garancije, u nju se sprema kad se klikne na garanciju
      isPopupOpen: false, //Za pracenje da li je garancija otvorena ili zatvorena
      showDeleteDialog: false, // Delete dialog
      deletingGuarantee: null, //Spremanje garancije za brisanje
    };
    },
  computed: {
  currentUser() {
    return store.currentUser;
  },
},

  methods: {

    deleteConfirmed() {
    //Brisanje garancije
    this.deleteGuarantee();
    },

    //Canceliranje brisanja
    cancelDelete() {
    this.showDeleteDialog = false;
    },

    //Otvoranje delete dialoga i postavljanje garancije za brisanje
    openDeleteDialog(guarantee) {
      console.log('Test delete dialog za:', guarantee);
      this.deletingGuarantee = guarantee;
      this.showDeleteDialog = true;
    },

    //Zatvaranje delete dialoga
    closeDeleteDialog() {
      this.showDeleteDialog = false;
    },
    isExpired(expireDate) {
      const currentDate = new Date();
      const guaranteeExpireDate = new Date(expireDate);
      return guaranteeExpireDate < currentDate;
    },

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
    
    async deleteGuarantee() {
  try {
    //check da li je korisnik autenticiran
    const user = auth.currentUser;

    if (!user) {
      console.error('DELETE: User is not authenticated.');
      return;
    }

    if (!this.deletingGuarantee || !this.deletingGuarantee.id) {
      console.error('Invalid guarantee to delete.');
      return;
    }

    console.log('Deleting guarantee with ID:', this.deletingGuarantee.id);

    //Brisanje iz firestora Firestore
    await db.collection('guarantees').doc(this.deletingGuarantee.id).delete();

    //Azuriraj addedItems listu za micanje obrisane garancije
    this.addedItems = this.addedItems.filter(item => item.id !== this.deletingGuarantee.id);

    console.log('Guarantee removed from addedItems.');

    //Zatvaranje delete dialoga
    this.showDeleteDialog = false;

    // Refresh the guarantee list by fetching the user's guarantees
    await this.fetchUserGuarantees();
    console.log('Guarantees list refreshed.');

  

    //Brisanje slika garancije
    if (this.deletingGuarantee.guaranteePicture) {
      const guaranteePictureRef = storage.refFromURL(this.deletingGuarantee.guaranteePicture);
      await guaranteePictureRef.delete();
      console.log('Guarantee picture deleted.');
    }

    //Brisanje slika racuna
    if (this.deletingGuarantee.receiptPicture) {
      const receiptPictureRef = storage.refFromURL(this.deletingGuarantee.receiptPicture);
      await receiptPictureRef.delete();
      console.log('Receipt picture deleted.');
    }
  } catch (error) {
    console.error('Error deleting guarantee:', error);
  }
}

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
  text-align: center;
  margin-top: 20px;
  max-width: 80%;
  margin: 20px auto;
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
  .guarantee-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #471AA1;
    padding: 20px;
    border-radius: 8px;
  }

  .guarantee-item {
    flex-basis: calc(25% - 10px); /*Prikaz garancija u redu od 4*/
    margin-bottom: 20px;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 10px; 
  }
  .popup-details {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /*Poluprozirna pozadina*/
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 80%; 
  max-height: 80%;
  overflow-y: auto;
}

.expired {
  border: 5px solid red;
  background-color: white;
}

</style>