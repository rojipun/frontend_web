<template>
  <div id="app">
    <!-- Sidebar for navigation -->
    <div class="sidebar">
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><a href="#" @click.prevent="showModal('manageSpots')">Manage Spots</a></li>
          <li><a href="#" @click.prevent="showModal('manageUsers')">Manage Users</a></li>
        </ul>
      </nav>
    </div>

    <!-- Main content area -->
    <div class="main-content">
      <h1>Welcome, Admin!</h1>
      
      <!-- Cards for quick access to manage spots and users -->
      <div class="card" @click="showModal('manageSpots')">
        <h3>Manage Spots</h3>
        <p>View and manage all spots here.</p>
      </div>
      <div class="card" @click="showModal('manageUsers')">
        <h3>Manage Users</h3>
        <p>View and manage all users here.</p>
      </div>

      <!-- Manage Spots section -->
      <div v-if="showModalType === 'manageSpots'">
        <h2>Manage Spots</h2>
        <button @click="toggleForm('spot')">Add New Spot</button>
        <div class="form-container" :class="{ active: showFormType === 'spot' }">
          <h4>{{ currentSpot && currentSpot.spotId ? 'Edit Spot' : 'Add New Spot' }}</h4>
          <form @submit.prevent="saveSpot" v-if="currentSpot">
            <label for="spotName">Name:</label>
            <input type="text" v-model="currentSpot.name" required>
            <label for="spotLocation">Location:</label>
            <input type="text" v-model="currentSpot.location" required>
            <label for="spotDescription">Description:</label>
            <textarea v-model="currentSpot.description" required></textarea>
            <label for="spotPrice">Price:</label>
            <input type="number" v-model.number="currentSpot.price" required>
            <label for="spotAvailability">Availability:</label>
            <input type="checkbox" v-model="currentSpot.availability">
            <button type="submit">{{ currentSpot.spotId ? 'Save Changes' : 'Add Spot' }}</button>
          </form>
        </div>
        <div v-for="spot in spots" :key="spot.spotId">
          <h4>{{ spot.name }}</h4>
          <p><strong>Location:</strong> {{ spot.location }}</p>
          <p><strong>Description:</strong> {{ spot.description }}</p>
          <p><strong>Price:</strong> ${{ spot.price }}</p>
          <p><strong>Availability:</strong> {{ spot.availability ? 'Available' : 'Not Available' }}</p>
          <button @click="editSpot(spot)">Edit</button>
          <button @click="deleteSpot(spot.spotId)">Delete</button>
        </div>
      </div>

      <!-- Manage Users section -->
      <div v-if="showModalType === 'manageUsers'">
        <h2>Manage Users</h2>
        <div v-for="user in users" :key="user.id">
          <h4>{{ user.username }}</h4>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <button @click="editUser(user.id)">Edit</button>
          <button @click="deleteUser(user.id)">Delete</button>
        </div>
      </div>

      <!-- Edit User Form -->
      <div v-if="showModalType === 'editUser' && currentUser">
        <h2>Edit User</h2>
        <form @submit.prevent="saveUser">
          <label for="firstname">First Name:</label>
          <input type="text" v-model="currentUser.firstname" required>
          
          <label for="lastname">Last Name:</label>
          <input type="text" v-model="currentUser.lastname" required>
          
          <label for="username">Username:</label>
          <input type="text" v-model="currentUser.username" required>
          
          <label for="email">Email:</label>
          <input type="email" v-model="currentUser.email" required>
          
          <label for="password">Password:</label>
          <input type="password" v-model="currentUser.password">
          
          <button type="submit">Save Changes</button>
          <button type="button" @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>




<script>
import apiClient from '@/API'; 

export default {
  data() {
    return {
      showModalType: null,
      showFormType: null,
      currentSpot: null,
      currentUser: null, 
      spots: [],
      users: []
    };
  },
  methods: {
    showModal(type) {
      console.log(`Showing modal: ${type}`);
      this.showModalType = type;
    },
    hideModal() {
      console.log('Hiding modal');
      this.showModalType = null;
      this.showFormType = null;
      this.currentSpot = null; // Clear current spot when hiding the modal
    },
    toggleForm(type) {
      console.log(`Toggling form: ${type}`);
      if (this.showFormType === type) {
        this.showFormType = null;
        this.currentSpot = null;
      } else {
        this.showFormType = type;
        if (type === 'spot') {
          this.currentSpot = { name: '', location: '', description: '', price: 0, availability: false };
        }
      }
    },
    async addSpot() {
      try {
        console.log('Adding spot:', this.newSpot);
        const response = await apiClient.post('api/CampingSpot', this.newSpot);
        this.spots.push(response.data);
        this.newSpot = { name: '', location: '', description: '', price: 0, availability: true };
        this.showFormType = null;
      } catch (error) {
        console.error('Error adding spot:', error);
      }
    },
    async fetchSpots() {
      try {
        const response = await apiClient.get('api/CampingSpot');
        this.spots = response.data;
      } catch (error) {
        console.error('Error fetching spots:', error);
      }
    },
    async fetchUsers() {
      try {
        const response = await apiClient.get('/User/all');
        if (response.status === 200) {
          this.users = response.data;
        } else {
          console.error(`Unexpected status code: ${response.status}`);
        }
      } catch (error) {
        if (error.response) {
          console.error(`Error fetching users: ${error.response.status} ${error.response.statusText}`);
        } else if (error.request) {
          console.error('Error fetching users: No response received');
        } else {
          console.error(`Error fetching users: ${error.message}`);
        }
      }
    },
    async editSpot(spot) {
      console.log('Editing spot:', spot);
      this.currentSpot = { ...spot }; // Clone spot data to edit
      this.showFormType = 'spot'; // Show the form
    },
    async saveSpot() {
      try {
        if (this.currentSpot?.spotId) {
          console.log('Updating spot:', this.currentSpot);
          await apiClient.put(`/CampingSpot/${this.currentSpot.spotId}`, this.currentSpot);
        } else {
          console.log('Adding spot:', this.currentSpot);
          const response = await apiClient.post('api/CampingSpot', this.currentSpot);
          this.spots.push(response.data);
        }
        this.currentSpot = null;
        this.showFormType = null;
      } catch (error) {
        console.error('Error saving spot:', error);
        alert('Failed to save the spot. Please try again.');
      }
    },
    async deleteSpot(spotId) {
      try {
        console.log('Deleting spot:', spotId);
        await apiClient.delete(`api/CampingSpot/${spotId}`);
        this.spots = this.spots.filter(spot => spot.spotId !== spotId);
      } catch (error) {
        console.error('Error deleting spot:', error);
      }
    },
    async editUser(userId) {
      try {
        const response = await apiClient.get(`/User/${userId}`);
        this.currentUser = response.data;
        this.showModalType = 'editUser'; // Show the edit form
        console.log('Current user set to:', this.currentUser);
      } catch (error) {
        console.error('Error fetching user details for edit:', error);
      }
    },
    async saveUser() {
      try {
        if (this.currentUser?.id) {
          await apiClient.put(`/User/putUsId/${this.currentUser.id}`, this.currentUser);
          const index = this.users.findIndex(user => user.id === this.currentUser.id);
          if (index !== -1) {
            this.users[index] = this.currentUser;
          }
        } else {
          console.warn('No user ID present for saving.');
        }
        this.showModalType = null; // Hide the form after saving
      } catch (error) {
        console.error('Error saving user:', error);
      }
    },
    async deleteUser(userId) {
      try {
        console.log('Deleting user:', userId);
        await apiClient.delete(`/User/deleteUsId/${userId}`);
        this.users = this.users.filter(user => user.id !== userId);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  },
  created() {
    this.fetchSpots();
    this.fetchUsers();
  }
};
</script>


<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: Arial, sans-serif;
  display: flex;
  min-height: 100vh;
  margin: 0;
  overflow: hidden;
}
.sidebar {
  width: 250px;
  background-color: #343a40;
  color: #fff;
  padding: 20px;
  position: fixed;
  height: 100%;
  overflow-y: auto;
  transition: width 0.3s;
}
.sidebar:hover {
  width: 300px;
}
.sidebar h1 {
  margin-bottom: 20px;
  font-size: 1.5em;
}
.sidebar nav ul {
  list-style: none;
}
.sidebar nav ul li {
  margin-bottom: 15px;
}
.sidebar nav ul li a {
  color: #ced4da;
  text-decoration: none;
  font-size: 1.1em;
  display: block;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}
.sidebar nav ul li a:hover {
  background-color: #495057;
  color: #e67e22;
}
.main-content {
  margin-left: 250px;
  padding: 20px;
  flex: 1;
  transition: margin-left 0.3s;
}
.sidebar:hover ~ .main-content {
  margin-left: 300px;
}
.card {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Form container styling */
.form-container {
  display: block; 
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px; 
}
.form-container.active {
  display: block; 
}

form {
  display: flex;
  flex-direction: column;
}

/* Label styling */
label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

input[type="text"],
input[type="number"],
input[type="email"],
input[type="password"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 15px;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

input[type="checkbox"] {
  margin-right: 10px;
  align-self: flex-start;
}

button[type="submit"] {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.3s, opacity 0.3s;
}
.modal-overlay.active {
  visibility: visible;
  opacity: 1;
}
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 600px;
  position: relative;
}.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}
.edit-user-form {
  display: none;
  margin-top: 20px;
}
.edit-user-form.active {
  display: block;
}
</style>