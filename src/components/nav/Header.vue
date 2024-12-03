<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/">Home</router-link>
    </div>
    <nav class="header__nav">
      <ul>
        <li>
          <router-link to="/report">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/expenses">Expenses</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>

export default {
  name: "HeaderComponent",
  computed: {

  },
  methods: {
    login() {

    },
  },
};
</script>

<style scoped>
/* Header Base Styling */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 5rem;
  background-color: #3cb043;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* Logo Styling */
.header__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header__logo img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.header__logo a {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
  transition: color 0.3s;
}

.header__logo a:hover {
  color: #f0d5ff;
}

/* Navigation Styling */
.header__nav {
  margin-left: auto;
}

.header__nav ul {
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  gap: 1.5rem;
}

.header__nav li {
  margin: 0;
}

.header__nav a {
  text-decoration: none;
  color: white;
  font-weight: 500;
  padding: 0.25rem 0;
  border-bottom: 2px solid transparent;
  transition: color 0.3s, border-color 0.3s;
}

.header__nav a:hover,
.header__nav a.router-link-active {
  color: #f0d5ff;
  border-color: #f0d5ff;
}

/* Cart Badge */
.cart {
  display: flex;
  align-items: center;
}

.cart base-badge {
  margin-left: 0.5rem;
}

/* Actions (Login/Logout and Admin Button) */
.header__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

button {
  font: inherit;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border: 1px solid white;
  background-color: transparent;
  color: white;
  border-radius: 20px;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  background-color: white;
  color: #45006d;
}

.admin-link {
  text-decoration: none;
  font-weight: bold;
  color: #ffc107;
  /* Gold Color for Admin */
  padding: 0.5rem 1rem;
  border: 1px solid #ffc107;
  border-radius: 20px;
  background-color: transparent;
  transition: background-color 0.3s, color 0.3s;
}

.admin-link:hover {
  background-color: #ffc107;
  color: #45006d;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header {
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem;
  }

  .header__logo {
    margin-bottom: 0.5rem;
  }

  .header__nav ul {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .header__actions {
    margin-top: 0.5rem;
  }
}
</style>
