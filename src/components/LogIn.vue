<template>
  <form @submit.prevent="login">
    <div class="form-group">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required />
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
    </div>
    <button type="submit" class="cta-button">Login</button>
    <p>Don't have an account? <a href="#" @click.prevent="showSignUp">Sign Up</a></p>
  </form>
</template>

<script>
import apiClient from '@/API'; 
import { ref } from 'vue';
import { useRouter } from 'vue-router';


export default {
  emits: ['loginSuccess', 'showSignUp'],
  setup(props, { emit }) {
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const login = async () => {
      try {
        // Attempt normal login process
        const response = await apiClient.post('/User/login', {
          username: username.value,
          password: password.value,
        });

        console.log('Login successful', response.data);

        const { token, user } = response.data;
        
        // Store token and user information
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        emit('loginSuccess', user);

        // Redirect based on user role
        if (user.role === 'admin') {
          router.push('/admindashboard');
        } else {
          router.push('/CampPage');
        }

      } catch (error) {
        // If normal login fails, check hardcoded admin credentials
        if (username.value === 'admin' && password.value === 'admin') {
          console.log('Hardcoded admin login successful');
          const user = { username: 'admin', role: 'admin' };
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', 'hardcoded-token'); // Use a placeholder or actual token
          localStorage.setItem('user', JSON.stringify(user));

          emit('loginSuccess', user);
          router.push('/admindashboard');
          return;
        }

        // If both normal login and hardcoded admin login fail, show an error message
        console.error('Login failed', error.response ? error.response.data : error.message);
        alert('Login failed: ' + (error.response ? error.response.data.message : error.message));
      }
    };

    const showSignUp = () => {
      emit('showSignUp');
    };

    return {
      username,
      password,
      login,
      showSignUp
    };
  }
};



</script>

<style scoped>

.popup-content {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  padding: 2em;
  position: relative;
  animation: fadeIn 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}


form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.form-group {
  margin-bottom: 1em;
}

.form-group label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 0.75em;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

button.cta-button {
  background: #f39c12;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 0.75em 1.5em;
  border-radius: 5px;
  transition: background 0.3s;
  font-size: 1em;
  font-weight: bold;
}

button.cta-button:hover {
  background: #e67e22;
}

a {
  color: #f39c12;
  text-decoration: none;
}

a:hover {
  color: #e67e22;
}
</style>
