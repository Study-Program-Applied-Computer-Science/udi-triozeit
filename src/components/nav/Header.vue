<template>
  <header class="header">

    <div class="logo">
      <router-link to="/"><img src="../../assets/accounting.png" alt=""></router-link>
    </div>

    <div class="title">
      <h1>EXPENSE TRACKER</h1>
    </div>

    <nav class="header__nav">
      <ul>
        <li>
          <router-link to="/expenses">Expenses</router-link>
        </li>
        <li>
          <router-link to="/report">Report</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/signup">Register</router-link>
        </li>

        <li v-if="!isLoggedIn">
          <router-link to="/login">Login</router-link>
        </li>

        <li v-if="isLoggedIn">
          <router-link to="/login" @click="logout">Logout</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  computed: {
    isLoggedIn() {
      return this.$store.getters.checkLoginStatus;
    },
  },
  methods: {
    loaderInit() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
      });

      setTimeout(() => {
        loader.hide()
      }, 1000)
    },
    async logout() {
      await this.loaderInit();
      this.$store.commit("logout");
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding: 02rem;
  height: 5rem;
  background-color: #006478;
  color: #FFF8E1;
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* Logo Styling */
/* .header__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
} */

.logo {
  width: 30%;
}

.title {
  width: 50%;
  cursor: pointer;
}

.header__nav {}

.logo img {
  height: 40px;
  width: 40px;
}

.title h1 {
  font-family: cursive;
  font-size: 50px;
  margin-left: 30px;
}



/* .header__logo a {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
  transition: color 0.3s;
}

.header__logo a:hover {
  color: #f0d5ff;
} */

/* Navigation Styling
.header__nav {

} */

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
