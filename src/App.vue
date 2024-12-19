<template>
  <div class="layout">
    <Header />
    <div class="main-container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './components/nav/Header.vue';
import Footer from './components/nav/Footer.vue';


export default {
  components: {
    Header,
    Footer,
  },
  created() {
    this.$store.dispatch("initializeUser");
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
}

body {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
}

.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main-container {
  width: 100%;
  height: 80vh;
  overflow: auto;
}
</style>
