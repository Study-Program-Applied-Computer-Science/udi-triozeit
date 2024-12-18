<template>
  <div class="container">
    <div class="search-filter-container">
      <label>
        Search
        <input type="text" v-model="searchExpense" placeholder="Search expenses..." class="search-input" />
      </label>
      <label>
        From:
        <input type="date" v-model="startDate" class="date-input" />
      </label>
      <label>
        To:
        <input type="date" v-model="endDate" class="date-input" />
      </label>
    </div>

    <label for="category">Choose a category:</label>
    <select v-model="selectedCategory" name="category" id="category">
      <option value="">All</option>
      <option value="Food">Food</option>
      <option value="Transport">Transport</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Utilities">Utilities</option>
      <option value="Other">Other</option>
    </select>

    <div>
      <h3 v-if="inCompleteTasks?.length > 0" class="status_info">Expenses</h3>
      <table class="table_details">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Name</th>
            <th>category</th>
            <th>Amount</th>
            <th>createdBy</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in searchAndFilter" v-bind:key="task.id">
            <td>{{ task.id }}</td>
            <td>{{ task.day }}</td>
            <td>{{ task.name }}</td>
            <td>{{ task.category }}</td>
            <td>{{ task.amount }}</td>
            <td>{{ task.createdBy }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpensesComponent",

  computed: {
    searchAndFilter() {
      console.log("Computed searchAndFilter method called");
      let filterData = this.expenses;
      if (this.searchExpense) {
        filterData = filterData.filter((expense) => {
          return expense.name
            .toLowerCase()
            .includes(this.searchExpense.toLowerCase());
        });
      }

      if (this.selectedCategory) {
        console.log("Category Filter");
        filterData = filterData.filter((expense) => {
          return expense.category === this.selectedCategory;
        })
      }

      if (this.startDate || this.endDate) {
        if (this.startDate && this.endDate) {
          filterData = filterData.filter((expense) => {
            return expense.day >= this.startDate && expense.day <= this.endDate;
          })
        }

        else if (this.startDate) {
          filterData = filterData.filter((expense) => {
            return expense.day >= this.startDate;
          })
        }
        else {
          filterData = filterData.filter((expense) => {
            return expense.day <= this.endDate;
          })

        }
      }

      if (this.sortOrder) {
        filterData.sort((a, b) => {
          if (this.sortOrder === "asc") {
            return a.amount - b.amount
          }
          else {
            return b.amount - a.amount
          }
        })
      }

      return filterData;
    },
  },
  mounted() {
    this.expenses = this.dataArray;
    console.log("the mounted" + this.expenses);
  },
  data() {
    return {
      dataArray: [
        {
          name: "ALDI",
          day: "2024-03-29",
          category: "Other",
          amount: 50.25,
          completed: false,
          createdBy: "test1@gmail.com",
          id: 1,
        },
        {
          name: "Walmart",
          day: "2024-04-01",
          category: "Food",
          amount: 120.0,
          completed: true,
          createdBy: "test2@gmail.com",
          id: 2,
        },
        {
          name: "Target",
          day: "2024-04-05",
          category: "Other",
          amount: 75.99,
          completed: false,
          createdBy: "test3@gmail.com",
          id: 3,
        },
        {
          name: "Costco",
          day: "2024-04-10",
          category: "Other",
          amount: 200.5,
          completed: false,
          createdBy: "test4@gmail.com",
          id: 4,
        },
        {
          name: "Amazon",
          day: "2024-03-31",
          category: "Entertainment",
          amount: 45.0,
          completed: true,
          createdBy: "test5@gmail.com",
          id: 5,
        },
        {
          name: "Best Buy",
          day: "2024-04-15",
          category: "Utilities",
          amount: 299.99,
          completed: false,
          createdBy: "test6@gmail.com",
          id: 6,
        },
        {
          name: "Trader Joe's",
          day: "2024-04-20",
          category: "Food",
          amount: 60.75,
          completed: false,
          createdBy: "test7@gmail.com",
          id: 7,
        },
        {
          name: "Whole Foods",
          day: "2024-04-22",
          category: "Food",
          amount: 85.4,
          completed: true,
          createdBy: "test8@gmail.com",
          id: 8,
        },
        {
          name: "Home Depot",
          day: "2024-03-28",
          category: "Other",
          amount: 150.3,
          completed: false,
          createdBy: "test9@gmail.com",
          id: 9,
        },
        {
          name: "IKEA",
          day: "2024-04-25",
          category: "Utilities",
          amount: 499.99,
          completed: false,
          createdBy: "test10@gmail.com",
          id: 10,
        },
      ],

      expenses: [],
      searchExpense: "",
      selectedCategory: "",
      startDate: "",
      endDate: "",
      sortOrder: "asc"
    };
  },
  components: {},
};
</script>

<style scoped>
.status_info {
  text-align: center;
  margin-top: 25px;
  color: #111111;
}

.completed {
  border-top: 2px solid grey;
  opacity: 0.3;
}

.container {
  margin: 0 auto;
  padding: 20px;
}

.search-filter-container {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
  /* Allow elements to wrap if needed */
  gap: 10px;
  /* Add spacing between elements */
  margin-bottom: 20px;
  /* Add spacing below the filter section */
  align-items: center;
  /* Vertically align items */
  justify-content: space-between;
  /* Spread items across the container */
}

.search-input,
.price-input,
.date-input {
  padding: 6px;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1 0 150px;
  /* Flexible width with a minimum */
  max-width: 200px;
  /* Maximum width for inputs */
}

.search-input {
  flex-grow: 2;
  /* Make search input slightly larger */
}

label {
  font-size: 0.9rem;
  margin-right: 5px;
}

button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
