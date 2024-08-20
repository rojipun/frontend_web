<template>
  <header>
    <div class="header-content">
      <!-- Logo Image -->
      <img src="../assets/images/logo.png" alt="Logo" class="logo" />
      <nav>
        <!-- Links visible when not logged in -->
        <router-link to="/" v-if="!isUserLoggedIn">Home</router-link>
        <router-link to="/services" v-if="!isUserLoggedIn">Services</router-link>
        <router-link to="/contact" v-if="!isUserLoggedIn">Contact</router-link>
        <router-link to="/packages" v-if="!isUserLoggedIn">Packages</router-link>
        <button v-if="!isUserLoggedIn" @click="showLoginPopup" class="login-button">Login</button>
      
         <!-- Links visible when logged in -->
         <router-link to="/" v-if="isUserLoggedIn">Home</router-link>
         <router-link v-if="isLoggedIn && userRole === 'admin'" to="/admindashboard">Admin Dashboard</router-link>
        <router-link to="/userprofile" v-if="isUserLoggedIn">User Profile</router-link>
        <router-link to="/CampPage" v-if="isUserLoggedIn">Camp Details</router-link>
        <button v-if="isUserLoggedIn" @click="signOut" class="signout-button">Sign Out</button>
      </nav>
    </div>
  </header>
</template>

<script>
import { computed } from 'vue'; // Import computed from Vue for reactive properties


export default {
  props: {
    isLoggedIn: {  // Property to receive the login state from the parent component
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const isUserLoggedIn = computed(() => props.isLoggedIn);  // Reactive property for login state
    const userRole = JSON.parse(localStorage.getItem('user'))?.role || ''; // Get user role from localStorage



    return {
      isUserLoggedIn,
      userRole


    };
  },
    methods: {
      showLoginPopup() {
        this.$emit('showLoginPopup'); // Emit event to show the login popup
      },
      signOut() { {
        // Remove user data from localStorage and emit signOut event
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.$emit('signOut');
      }
    },
    watch: {
      isLoggedIn(newVal) {
        console.log('Navbar isLoggedIn updated:', newVal);// Log change in login state for debugging
      }
    },
    mounted() {
      console.log('Navbar isLoggedIn:', this.isLoggedIn); // Log initial login state for debugging
  }
 }
}
</script>





<style scoped>
/* General Header Styles */
header {
  background: #2A2B2E;
  color: #fff;
  padding: 0;
  border-bottom: 2px solid #e67e22;
  height: 80px; 
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Header Content Styles */
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px; 
  padding: 0 1em; 
}

.logo {
  width: 100px;
  height: auto;
}

/* Navbar Container */
nav {
  display: flex;
  align-items: center;
  gap: 1.5em;
}

/* Navbar Links Styles */
nav a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  font-family: 'Arial', sans-serif; 
  font-size: 1em; 
  padding: 0.5em 1em;
  transition: color 0.3s;
}


nav a:hover {
  color: #f39c12;
}

.login-button {
  background: #f39c12;
  color: #fff;
  border: none;
  padding: 0.75em 1.5em;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 1em;
}


.login-button:hover {
  background: #e67e22;
}

/* Sign Out Button Styles */
.signout-button {
  background: #e67e22;
  color: #fff;
  border: none;
  padding: 0.75em 1.5em;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 1em;
}


.signout-button:hover {
  background: #d35400;
}
</style>
