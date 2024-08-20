<template>
    <main>
      <!-- Hero Section -->
      <section id="home" class="hero">
        <div class="hero-content">
          <h1>AIRBNB</h1>
          <h2>Discover Your Perfect Camping Getaway</h2>
          <p>Find the best campsites and exclusive packages for your next adventure.</p>
          <a href="index3.html" id="explore-camps" class="cta-button">Explore Camps</a>
        </div>
      </section>
  
      <section id="Services" class="container">
        <h2>Available Services</h2>
        <div id="camp-list" class="card-grid">
          <!-- Display a message if no campsites are available -->
          <div v-if="!camps.length" class="no-items">
            <div class="paragraph">
                <p>No camping spots have been added yet.</p>
            </div>
            
          </div>
          <!-- Camps will be dynamically inserted here -->
          <div v-else>
            <div v-for="camp in camps" :key="camp.id" class="card">
              <img :src="camp.image" alt="Camping Spot">
              <div class="card-content">
                <h3>{{ camp.name }}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
  

  
      <section id="contact" class="container">
        <h2>Contact Us</h2>
        <form id="contact-form">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit" class="cta-button">Send Message</button>
        </form>
      </section>
  
      <!-- Find Us Section -->
      <section id="" class="container">
        <div class="map-container">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5019.2267293978275!2d4.4878507!3d51.02329129999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3e43339c63923%3A0xbd48d7fdc7be3c66!2sThomas%20More%20Mechelen%20-%20Campus%20De%20Vest!5e0!3m2!1sen!2sbe!4v1723905719643!5m2!1sen!2sbe" width="1200" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>
    </main>
  </template>
  
  <script>
  import apiClient from '@/API';
  export default {
    name: 'HomePage',
    data() {
      return {
        camps: [], 
      }
    },
    mounted() {
        this.fetchCamps();
    },
    methods: {
        async fetchCampSpots() {
      try {
        const response = await apiClient.get('/api/CampingSpot');
        this.camps = response.data;
      } catch (error) {
        console.error('Error fetching camp spots:', error);
      }
    }
}
}
  </script>
  
  <style scoped>

body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background: #f9f9f9;
    color: #000000;
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: auto;
    padding: 1.2em;
}


.hero {
    background: url('../assets/images/hero-background.jpg') no-repeat center center/cover;
    color: #000000;
    text-align: center;
    padding: 10em 1em;
    position: relative;
}

.hero-content {
    max-width: 800px;
    margin: auto;
}

.cta-button {
    display: inline-block;
    padding: 0.75em 1.5em;
    background: #f39c12;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    transition: background 0.3s;
}

.cta-button:hover {
    background: #e67e22;
}


main {
    padding: 2em 0;
}

h2 {
    text-align: center;
    margin-bottom: 1em;
}


.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Adjust min-width as needed */
    gap: 1em;
}

.card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-content {
    padding: 1em;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.no-items {
    text-align: center;
    padding: 2em;
    color: #666;
}


form {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 2em;
}

.form-group {
    margin-bottom: 1em;
}

.form-group label {
    display: block;
    margin-bottom: 0.5em;
}

.form-group input, .form-group textarea {
    width: 100%;
    padding: 0.75em;
    border: 1px solid #ddd;
    border-radius: 5px;
}

textarea {
    height: 150px;
    resize: vertical;
}

button.cta-button {
    background: #2c3e50;
    color: #fff;
    border: none;
    cursor: pointer;
    padding: 0.75em 1.5em;
    border-radius: 5px;
    transition: background 0.3s;
}

button.cta-button:hover {
    background: #34495e;
}

/* Footer Styles */
footer {
    background: #2A2B2E;
    color: #fff;
    text-align: center;
    padding: 1em;
    border-top: 2px solid #e67e22;
}

.social-icons {
    margin-top: 1em;
}

.social-icons a {
    margin: 0 0.5em;
    display: inline-block;
}

.social-icons img {
    width: 24px;
    height: auto;
    transition: opacity 0.3s;
}

nav {
    display: flex;
    justify-content: flex-end;
    align-items: center; /* Center items vertically */
    gap: 1em;
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


#signout-btn {
    background: #e67e22;
    color: #fff;
}

#signout-btn:hover {
    background: #d35400;
}


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
    opacity: 0;
    transition: opacity 0.3s ease;
}

.popup.show {
    display: flex;
    opacity: 1;
}

.popup-content {
    background: #fff;
    border-radius: 8px;
    width: 90%;
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

.popup-footer {
    text-align: center;
    margin-top: 1em;
}

.popup-footer a {
    color: #f39c12;
    text-decoration: none;
}

.popup-footer a:hover {
    text-decoration: none;
}

form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 1em;
}

.form-group label {
    display: block;
    margin-bottom: 0.5em;
}

.form-group input, .form-group select {
    width: 100%;
    padding: 0.75em;
    border: 1px solid #ddd;
    border-radius: 5px;
}

button.cta-button {
    background: #f39c12;
    color: #fff;
    border: none;
    cursor: pointer;
    padding: 0.75em 1.5em;
    border-radius: 5px;
    transition: background 0.3s;
}

button.cta-button:hover {
    background: #e67e22;
}


a {
    color: rgb(0, 0, 0); 
    text-decoration: none; 
}

a:hover {
    color: rgb(0, 0, 0); 
    text-decoration: none; 
}


.modal {
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

.modal-content {
    background: #fff;
    padding: 2em;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
    position: relative;
    text-align: center;
}

.modal-content h2 {
    margin: 0 0 1em;
    color: #333;
}

.modal-content .close {
    position: absolute;
    top: 1em;
    right: 1em;
    font-size: 1.5em;
    cursor: pointer;
    color: #333;
}

#ProceedBooking {
    background: #f39c12;
    color: #fff;
    padding: 0.75em 1.5em;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s;
}

#ProceedBooking:hover {
    background: #e67e22;
}


.sold-out {
    background: #e74c3c;
    color: #fff;
    padding: 1em;
    border-radius: 5px;
    font-weight: bold;
    text-align: center;
    margin: 1em 0;
}


 </style>