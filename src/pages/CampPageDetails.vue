<template>
  <div class="camp-list">
    <div
      v-for="camp in camps"
      :key="camp.id"
      :class="['camp-card', camp.availability ? 'available' : 'unavailable']"
      @click="openBookingModal(camp)"
    >
      <img :src="camp.image" :alt="camp.name" class="camp-image" />
      <div class="camp-info">
        <h2>{{ camp.name }}</h2>
        <p>{{ camp.description }}</p>
        <p><strong>Location:</strong> {{ camp.location }}</p>
        <p><strong>Price :</strong> {{ camp.price }} per night</p>
        <p><strong>Availability:</strong> {{ camp.availability ? 'Available' : 'Not Available' }}</p>
      </div>
</div>

    <!-- Booking Modal -->
    <div v-if="selectedCamp" class="modal-overlay" @click="closeBookingModal">
      <div class="modal-content" @click.stop>
        <h3>Book {{ selectedCamp.name }}</h3>
        <form @submit.prevent="submitBooking">
          <div>
            <label for="start-date">Start Date:</label>
            <input type="date" v-model="booking.checkInDate" id="start-date" required />
          </div>
          <div>
            <label for="end-date">End Date:</label>
            <input type="date" v-model="booking.checkOutDate" id="end-date" required />
          </div>

          <button type="submit">Book Now</button>
          <button type="button" @click="closeBookingModal">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/API'; // Adjust path as needed

export default {
  data() {
    return {
      camps: [], // List of camping spots
      selectedCamp: null, // Currently selected camp for booking
      booking: {
        checkInDate: '',
        checkOutDate: '',
        guests: 1,
      }
    };
  },
  async created() {
    await this.fetchCampSpots(); // Fetch camp spots when component is created
  },
  methods: {
    // Fetch the list of camping spots
    async fetchCampSpots() {
      try {
        const response = await apiClient.get('/api/CampingSpot');
        this.camps = response.data;
      } catch (error) {
        console.error('Error fetching camp spots:', error);
      }
    },
    // Open booking modal for a selected camp
    openBookingModal(camp) {
      this.selectedCamp = camp;
    },
    // Close booking modal
    closeBookingModal() {
      this.selectedCamp = null;
    },
    // Submit booking request
    async submitBooking() {
  const user = JSON.parse(localStorage.getItem('user')); // Get user data from local storage
  const token = localStorage.getItem('token'); // Get token from local storage

  if (!user || !token) {
    alert('User not logged in.');
    return;
  }

   // Validate dates
   if (new Date(this.booking.checkInDate) >= new Date(this.booking.checkOutDate)) {
    alert('Check-out date must be after check-in date.');
    return;
  }

  try {
    const response = await apiClient.post('/api/Booking/book', {
      spotId: this.selectedCamp.id,
      userId: user.id,
      checkInDate: this.booking.checkInDate,
      checkOutDate: this.booking.checkOutDate,
      status: 'Booked',
      createdAt: new Date().toISOString(),
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}` // Add token to headers
      }
    });

    if (response.status === 200) {
      console.log('Booking response:', response.data); // Log the response data
     
    

      alert('Booking successful!');

      this.closeBookingModal();
    } else {
      throw new Error('Unexpected response status: ' + response.status);
    }

  } catch (error) {
    console.error('Error booking camping spot:', error.response ? error.response.data : error.message);
    alert('Failed to book camping spot.');
  }
}
}
}
</script>

<style scoped>

.camp-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.camp-card {
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 300px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

/* .camp-card.available {
  background-color: #28a745;  Green for available 
  color: white; Ensure text is readable
}

.camp-card.unavailable {
  background-color: #dc3545;  Red for unavailable
  color: white;  Ensure text is readable
} */

.camp-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.camp-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.camp-info {
  padding: 15px;
}

.camp-info h2 {
  font-size: 24px;
  margin: 15px 0;
  text-decoration: underline;
}

.camp-info p {
  margin: 10px 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.modal-content form div {
  margin-bottom: 15px;
}

.modal-content label {
  display: block;
  margin-bottom: 5px;
}

.modal-content input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.modal-content button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.modal-content button:hover {
  background-color: #218838;
}
</style>
