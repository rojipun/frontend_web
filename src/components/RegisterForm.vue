<template>
  <div class="form-container">
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="firstname">First Name</label>
        <input type="text" id="firstname" v-model="form.firstname" required />
      </div>
      <div class="form-group">
        <label for="lastname">Last Name</label>
        <input type="text" id="lastname" v-model="form.lastname" required />
      </div>
      <div class="form-group">
        <label for="username">username</label>
        <input type="text" id="text" v-model="form.username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" v-model="form.confirmPassword" required />
      </div>
      <button type="submit" class="cta-button">Register</button>

      <!-- <div class="form-footer"> -->
        <!-- <p>Already have an account? <a @click.prevent="$emit('showLogin')">Log in</a></p>
      </div> -->
    </form>
  </div>
</template>

<script>
import apiClient from '@/API';
export default {
  data() {
    return {
      form: {
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: 'user'
      }
    };
  },
  methods: {
    async register() {
      console.log('Register method called');
      try {
        
        const response = await apiClient.post('/User/register', {
          firstName: this.form.firstname,
          lastName: this.form.lastname,
          username: this.form.username,
          password: this.form.password,
          confirmPassword: this.form.confirmPassword
        });
        console.log('Registration successful', response.data);
        this.$emit('registration-success');
      } catch (error) {
        console.error('Error', error.response ? error.response.data : error.message);
      }
    }
  }
};

</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center; 
  min-height: 10vh;
  padding: 1em; 
}

h1 {
  margin-bottom: 1.5em; 
  color: #333; 
  font-size: 1.8em; 
}

form {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5em; 
  max-width: 400px; 
  width: 100%; 
  box-sizing: border-box; 
}

.form-group {
  margin-bottom: 0.75em;
}

.form-group label {
  display: block;
  margin-bottom: 0.25em; 
}

.form-group input {
  width: 100%;
  padding: 0.5em; 
  border: 1px solid #ddd;
  border-radius: 5px;
}

button.cta-button {
  background: #f39c12;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 0.5em 1em; 
  border-radius: 5px;
  transition: background 0.3s;
  font-size: 0.9em; 
}

button.cta-button:hover {
  background: #e67e22;
}

.form-footer {
  text-align: center;
  margin-top: 1em;
}

.form-footer a {
  color: #f39c12; 
  text-decoration: none;
}

.form-footer a:hover {
  text-decoration: underline;
}
</style>
