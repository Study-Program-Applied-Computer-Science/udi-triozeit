<template>
    <!-- <div class="container"> -->
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <h1 class="text-4xl font-bold text-blue-500">Hello, Tailwind CSS! </h1>
        <h1 class="text-4xl font-bold text-blue-500">Login to view contents</h1>
    </div>
    <!-- </div> -->
</template>
<script>
export default {
    name: "DashboardComponent",
    created() {
        this.$store.dispatch("initializeUser");
    },
}

</script>
<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>