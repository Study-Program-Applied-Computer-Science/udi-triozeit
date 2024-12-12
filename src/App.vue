<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from './components/nav/Header.vue';

export default {
  components: {
    Header,
  },
}
</script>

<!-- <style>
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

.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style> -->
