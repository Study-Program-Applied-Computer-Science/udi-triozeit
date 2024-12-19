<template>
  <div class="flex flex-col">
    <Header />
    <div>
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
</style>
