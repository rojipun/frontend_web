<template>
  <div id="app">
    <!-- Navbar Component -->
    <Navbar :isLoggedIn="isLoggedIn" 
      @showLoginPopup="showLoginPopup" 
      @signOut="handleSignOut" />
    
    <!-- Main Content Area -->
    <router-view />
    
    <!-- Popup Component -->
    <Popup
      :type="popupType"
      @close="hidePopup"
      @showLogin="showLogin"
      @showSignUp="showSignUp"
      @loginSuccess="handleLoginSuccess"
    />
    
    <!-- Footer Component -->
    <FooterNavbar />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from './components/AppNavbar.vue';
import Popup from './components/AuthPopup.vue';
import FooterNavbar from './components/FooterNavbar.vue'; 
import './assets/styles/global.css';

export default {
  components: {
    Navbar,
    Popup,
    FooterNavbar
  },
  setup() {
    const isLoggedIn = ref(false);
    const popupType = ref(null);
    const router = useRouter();

    const checkLoginState = () => {
      const storedLoginState = localStorage.getItem('isLoggedIn');
      isLoggedIn.value = storedLoginState === 'true';
    };

    onMounted(() => {
      checkLoginState();
    });

    const showLoginPopup = () => {
      popupType.value = 'login';
    };

    const showSignUp = () => {
      popupType.value = 'signup';
    };

    const hidePopup = () => {
      popupType.value = null;
    };

    const showLogin = () => {
      popupType.value = 'login';
    };

    const handleLoginSuccess = (userData) => {
      isLoggedIn.value = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      hidePopup();
      router.push('/CampPage'); // Redirect to CampPage
    };

    const handleSignOut = () => {
      isLoggedIn.value = false;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      router.push('/'); //Redirect to HomePage
    };

    return {
      isLoggedIn,
      popupType,
      showLoginPopup,
      showSignUp,
      hidePopup,
      showLogin,
      handleLoginSuccess,
      handleSignOut
    };
  }
};
</script>
<style scoped>

</style>
  
