<template>
  <div class="max-w-5xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
    <button @click="$router.go(-1)"
      class="text-blue-500 font-bold py-2 px-4 rounded-md transition duration-300 flex items-center gap-2">
      <i class="fas fa-arrow-left"></i> Back
    </button>

    <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">Expense Report</h2>

    <div class="bg-green-100 p-6 rounded-lg shadow-lg mb-6">
      <h3 class="text-2xl font-bold text-green-700">Total Expenses</h3>
      <p class="text-4xl font-semibold text-gray-800 mt-2">€{{ totalExpenses }}</p>
    </div>

    <div class="bg-blue-100 p-6 rounded-lg shadow-lg mb-6">
      <h3 class="text-2xl font-bold text-blue-700">Category Breakdown</h3>
      <ul class="mt-4 space-y-3">
        <li v-for="(amount, category) in categoryBreakdown" :key="category"
          class="flex justify-between text-lg text-gray-700 font-medium">
          <span>{{ category }}</span>
          <span>€{{ amount }}</span>
        </li>
      </ul>
    </div>

    <div class="bg-yellow-100 p-6 rounded-lg shadow-lg mb-6">
      <h3 class="text-2xl font-bold text-yellow-700">Today's Expenses</h3>
      <div v-if="todayExpenses.length > 0" class="mt-4 space-y-2">
        <div v-for="expense in todayExpenses" :key="expense.id"
          class="flex justify-between text-lg text-gray-700 font-medium">
          <span>{{ expense.title }} - €{{ expense.amount }}</span>
          <span class="text-gray-500 text-sm">{{ formatDateTime(expense.dateTime) }}</span>
        </div>
      </div>
      <p v-else class="text-gray-600 mt-2">No expenses recorded for today.</p>
    </div>

    <div class="flex justify-center mt-6">
      <button @click="downloadFile"
        class="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 text-lg rounded-lg shadow-md transition duration-300">
        Download the Report
      </button>
    </div>
  </div>
</template>

<script>
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default {
  name: "ReportView",
  computed: {
    expenses() {
      return this.$store.getters.filteredExpenses;
    },
    totalExpenses() {
      return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    },
    categoryBreakdown() {
      return this.expenses.reduce((breakdown, expense) => {
        if (!breakdown[expense.category]) breakdown[expense.category] = 0;
        breakdown[expense.category] += expense.amount;
        return breakdown;
      }, {});
    },
    todayExpenses() {
      const today = new Date().toISOString().split("T")[0];
      return this.expenses.filter(expense => expense.dateTime.startsWith(today));
    },
  },
  methods: {
    downloadFile() {
      const doc = new jsPDF();
      doc.setFontSize(10);

      let totalAmount = 0.0;
      const content = this.expenses.map((item) => {
        totalAmount += item.amount;
        return [item.title, item.dateTime, item.category, `€${item.amount}`];
      });

      doc.text("EXPENSE REPORT", 100, 10);
      doc.line(0, 12, 400, 11);


      autoTable(doc, {
        head: [['Expense Name', 'Date', 'Category', 'Amount']],
        body: content,
        startY: 20
      });


      doc.text(`The total amount: €${totalAmount}`, 150, doc.lastAutoTable.finalY + 10);


      doc.save('ExpenseReport.pdf');
    },
    formatDateTime(dateTime) {
      return new Date(dateTime).toLocaleString();
    },
  },
};
</script>

<style scoped>
button {
  transition: all 0.3s ease-in-out;
}
</style>
