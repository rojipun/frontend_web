<template>
  <!-- Popup container with dynamic class binding -->
  <div :class="['popup', { show: isVisible }]">
    <div class="popup-content">
      <!-- Close button for the popup -->
      <span @click="closePopup" class="close-btn">&times;</span>
      
      <!-- Conditional rendering based on the popup type -->
      <div v-if="popupType === 'login'" class="popup-header">
        <h2>Login</h2>
        <!-- LoginForm component for user login -->
        <LoginForm @login="handledLogin" @showSignUp="showSignUp" />
      </div>
      
      <div v-if="popupType === 'signup'" class="popup-header">
        <h2>Sign Up</h2>
        <!-- RegisterForm component for user registration -->
        <RegisterForm @registration-success="handleRegistrationSuccess" />
      </div>
    </div>
  </div>
</template>


<script>
import LoginForm from './LogIn.vue'; // Import the LoginForm component
import RegisterForm from './RegisterForm.vue'; // Import the RegisterForm component

export default {
  name: 'AuthPopup',
  components: {
    LoginForm,
    RegisterForm
  },
  props: {
    type: {
      type: String,
      default: null
    }
  },
  computed: {
    isVisible() {
      return !!this.type; // Determine if the popup should be visible based on the 'type' prop
    },
    popupType() {
      return this.type; // Return the current type of popup
    }
  },
  methods: {
    closePopup() {
      this.$emit('close'); // Emit a 'close' event to notify parent component to hide the popup
    },
    handledLogin(username, password) {
      console.log('Login:', username, password); // Log login details for debugging
      this.$emit('login'); // Emit a 'login' event to notify parent component of successful login
      this.closePopup(); // Close the popup
    },
    showSignUp() {
      this.$emit('showSignUp'); // Emit an event to notify the parent component to show the sign-up form
    },
    handleRegistrationSuccess() {
      console.log('Registration was successful!'); // Log success message for debugging
      this.$emit('login'); // Emit a 'login' event to notify parent component of successful registration
      this.closePopup(); // Close the popup
    },
    showLogin() {
      this.$emit('showLogin'); // Emit an event to notify the parent component to show the login form
    }
  }
}
</script>


<style scoped>

.popup {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup.show {
  display: flex;
  opacity: 1;
}

.popup-content {
  background: #fff;
  border-radius: 8px;
  width: 70%;
  max-width: 400px;
  padding: 2em;
  position: relative;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5em;
  cursor: pointer;
  color: #333;
}

.popup-header {
  text-align: center;
  margin-bottom: 1em;
}
</style>