<template>
  <footer>
    <div class="container">
      <!-- Footer text -->
      <p>&copy; 2024 Airbnb Camping Site. All rights reserved.</p>
      
      <!-- Social media icons with links -->
      <div class="social-icons">
        <a href="https://www.facebook.com/airbnb" target="_blank" rel="noopener">
          <img src="../assets/images/facebook-icon.png" alt="Facebook">
        </a>
        <a href="https://x.com/airbnb" target="_blank" rel="noopener">
          <img src="../assets/images/twitter-icon.png" alt="Twitter">
        </a>
        <a href="https://www.instagram.com/airbnb/" target="_blank" rel="noopener">
          <img src="../assets/images/Instagram-icon.png" alt="Instagram">
        </a>
        <a href="mailto:rossypunm@gmail.com">
          <img src="../assets/images/mail-icon.png" alt="Mail">
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterNavbar' 
};
</script>


  
<style scoped>

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

.social-icons a:hover img {
  opacity: 0.7;
}
</style>
  