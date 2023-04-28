<template>
  <div class="not-found">
    <h1>Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <router-link class="home-link" to="/">Go to the login page</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
  color: #444;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.home-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  color: #fff;
  background-color: #3f51b5;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.home-link:hover,
.home-link:focus {
  background-color: #536dfe;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.home-link:active {
  background-color: #1a237e;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
