<template>
  <div>
    <h1>User Profile</h1>
    <div v-if="isAdmin">
      <p>You are an Admin</p>
    </div>
    <div v-else>
      <div v-if="user && !isEditing">
        <p><strong>First Name:</strong> {{ user.firstName }}</p>
        <p><strong>Last Name:</strong> {{ user.lastName }}</p>
        <p><strong>Username:</strong> {{ user.username }}</p>
        
        <button @click="toggleEditMode">Edit</button>
        
        <div v-if="hasBookedSpot">
          <h2>Booking Details</h2>
          <p>Spot ID: {{ bookingDetails.spotId }}</p>
          <p>Date: {{ bookingDetails.date }}</p>
          <p>Time: {{ bookingDetails.time }}</p>
        </div>
      </div>
      
      <div v-else>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="user.firstName" />
        
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="user.lastName" />
        
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="user.username" />
        
        <label for="password">New Password:</label>
        <input type="password" id="password" v-model="newPassword" />
        
        <button @click="updateUser">Save Changes</button>
        <button @click="toggleEditMode">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../API';

export default {
  name: 'UserProfile',
  data() {
    return {
      isAdmin: false,
      user: {
        firstName: '',
        lastName: '',
        username: ''
      },
      newPassword: '',
      isEditing: false,
      hasBookedSpot: false,
      bookingDetails: {
        spotId: '',
        date: '',
        time: ''
      },
      userId: null
    };
  },
  created() {
    this.loadUserProfile();
  },
  methods: {
    async loadUserProfile() {
      try {
        const response = await apiClient.get('/User/Userinfo');
        console.log('API response:', response.data);

        if (response.status === 200 && Array.isArray(response.data)) {
          // Get the stored username
          const storedUser = JSON.parse(localStorage.getItem('user'));
          const storedUsername = storedUser ? storedUser.username : null;

          if (!storedUsername) {
            throw new Error('No stored username found');
          }

          // Find the user in the array
          const foundUser = response.data.find(u => u.username === storedUsername);

          if (foundUser) {
            this.user = {
              firstName: foundUser.firstName || '',
              lastName: foundUser.lastName || '',
              username: foundUser.username || ''
            };
            this.userId = foundUser.id;
            this.isAdmin = foundUser.role === 'admin' || false;
            this.hasBookedSpot = foundUser.hasBookedSpot || false;

            if (this.hasBookedSpot && foundUser.bookingDetails) {
              this.bookingDetails = {
                spotId: foundUser.bookingDetails.spotId || '',
                date: foundUser.bookingDetails.date || '',
                time: foundUser.bookingDetails.time || ''
              };
            }

            console.log('User data after assignment:', this.user);
          } else {
            throw new Error('User not found in the array');
          }
        } else {
          throw new Error('Unexpected response status or data structure');
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        alert('Failed to load user profile. Please try again later.');
      }
    },
    toggleEditMode() {
      this.isEditing = !this.isEditing;
    },
    async updateUser() {
      if (!this.userId) {
        console.error('User ID is not available');
        alert('Failed to update user profile. Please try again.');
        return;
      }
      try {
        await apiClient.put(`/User/putUsId/${this.userId}`, {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          username: this.user.username,
          password: this.newPassword
        });
        alert('User profile updated successfully!');
        this.newPassword = '';
        this.isEditing = false;
      } catch (error) {
        console.error('Failed to update user profile:', error);
        alert('An error occurred while updating the profile.');
      }
    }
  }
};
</script>

<style scoped>

label {
  display: block;
  margin: 10px 0 5px;
}

input {
  display: block;
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
}

h2 {
  margin-top: 20px;
}
</style>