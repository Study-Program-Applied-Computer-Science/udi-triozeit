<template>
  <div class="flex items-center justify-center h-screen bg-white text-black px-4 lg:px-20">
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center w-full text-center lg:text-left">
      
      <div>
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Simplify your finances</h1>
        <p class="text-base md:text-lg mb-6">
          with our user-friendly expense tracking application.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div class="flex flex-col items-center">
            <i class="fas fa-wallet text-3xl md:text-4xl mb-2 text-black"></i>
            <p class="font-semibold">Track Your Expenses</p>
            <span class="text-sm md:text-base text-gray-600 text-center">
              Keep your daily expenses organized and up-to-date.
            </span>
          </div>
          <div class="flex flex-col items-center">
            <i class="fas fa-chart-pie text-3xl md:text-4xl mb-2 text-black"></i>
            <p class="font-semibold">Analyze Spending</p>
            <span class="text-sm md:text-base text-gray-600 text-center">
              Get detailed insights into your spending patterns.
            </span>
          </div>
          <div class="flex flex-col items-center">
            <i class="fas fa-download text-3xl md:text-4xl mb-2 text-black"></i>
            <p class="font-semibold">Download Reports</p>
            <span class="text-sm md:text-base text-gray-600 text-center">
              Export expense reports for better financial planning.
            </span>
          </div>
        </div>

       
        <div class="flex flex-col items-center mt-6">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 text-center">Your Best Money Assistant</h2>
          <p class="text-sm md:text-lg text-gray-600 mb-8 text-center">
            Start tracking your expenses today and take control of your finances like never before.
          </p>
          <router-link
            to="/login"
            class="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Get Started
          </router-link>
        </div>
      </div>

      
      <div class="flex justify-center lg:justify-end">
        <img
          src="@/assets/hero.png"
          alt="Hero Illustration"
          class="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
        />
      </div>
    </div>
  </div>
</template>


  <script>
  export default {
    name: "DashboardComponent",
    created() {
      this.$store.dispatch("initializeUser");
    },
  };
  </script>
  
  <style scoped>
  body,
  html {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  img {
    object-fit: contain;
  }
  
  h1,
  p {
    text-align: center;
  }
  
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .mt-6 {
    margin-top: 1.5rem;
  }
  </style>
  
  

