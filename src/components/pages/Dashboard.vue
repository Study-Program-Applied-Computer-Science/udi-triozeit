<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-white text-black relative">
    <div class="absolute top-28 left-40 w-1/2">
      <h1 class="text-5xl font-bold mb-4 text-center">Simplify your finances</h1>
      <p class="text-lg mb-8 text-center">
        with our user-friendly expense tracking application.
      </p>
      <div class="grid grid-cols-3 gap-12 mb-12">
        <div class="flex flex-col items-center">
          <i class="fas fa-wallet text-4xl mb-2 text-black"></i>
          <p class="font-semibold">Track Your Expenses</p>
          <span class="text-sm text-gray-600 text-center">
            Keep your daily expenses organized and up-to-date.
          </span>
        </div>
        <div class="flex flex-col items-center">
          <i class="fas fa-chart-pie text-4xl mb-2 text-black"></i>
          <p class="font-semibold">Analyze Spending</p>
          <span class="text-sm text-gray-600 text-center">
            Get detailed insights into your spending patterns.
          </span>
        </div>
        <div class="flex flex-col items-center">
          <i class="fas fa-download text-4xl mb-2 text-black"></i>
          <p class="font-semibold">Download Reports</p>
          <span class="text-sm text-gray-600 text-center">
            Export expense reports for better financial planning.
          </span>
        </div>
      </div>
      <div class="text-center">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">Your Best Money Assistant</h2>
        <p class="text-lg text-gray-600 mb-8">
          Start tracking your expenses today and take control of your finances like never before.
        </p>
        <router-link :to="isLoggedIn ? '/expenses' : '/login'"
          class="bg-[#006478] hover:bg-[#004d5a] text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          Get Started
        </router-link>
      </div>
    </div>

    <!-- Background Image -->
    <div>
      <img src="@/assets/hero.png" alt="Hero Illustration"
        class="absolute right-20 max-w-sm md:max-w-md lg:max-w-lg w-full h-auto"
        style="transform: translateY(-400px);" />
    </div>
    <!-- <img src="@/assets/hero.png" alt="Hero Illustration"
      class="absolute bottom-10 right-20 max-w-sm md:max-w-md lg:max-w-lg w-full h-auto"
      style="transform: translateY(-400px);" /> -->
  </div>
</template>

<script>
export default {
  name: "DashboardComponent",
  created() {
    this.$store.dispatch("initializeUser");
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.checkLoginStatus;
    },
  },
};
</script>

<style scoped>
button {
  transition: all 0.3s ease;
}

button:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

img {
  z-index: 1;
  /* Ensures the image stays behind the text */
}

h1,
p {
  text-align: center;
  /* Aligns text content to the center */
}
</style>