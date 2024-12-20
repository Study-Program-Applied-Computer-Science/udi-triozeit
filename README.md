Below are the features that each team member handled, detailing their specific contributions to the project.
--- 

**Manu Janardhana:**
- **Advanced Expense Editing:**  
  - Implemented splitting a single expense into multiple smaller parts.  
    - Added validation to ensure amounts are numeric and not empty or whitespace.  
    - Enabled splitting, editing, and deleting of these subdivided expenses.

- **Streak Management:**  
  - Developed a daily streak feature to encourage regular use.
    - Daily login maintains a streak.
    - Users with active streaks receive additional opportunities to add expenses (default limit: 5 entries/day).

- **UI Fixes:**  
  - Fixed various errors and improved overall UI flow.  
  - Resolved navigation issues, including proper handling of the back button.  
  - Added loading overlays to ensure smoother transitions.

---

**Pramukh Prakash:**
- **Authentication:**  
  - Developed secure signup and login functionality for user authentication.

- **Search and Filter Expenses:**  
  - Implemented search functionality based on expense details.  
    - Added filters to search expenses within a specified date range.  
    - Enabled filtering expenses by categories.

- **Expense Reports:**  
  - Built the feature to generate and download detailed expense reports.

---

**Yathish Sadashivareddy:**
- **CRUD Operations:**  
  - Developed core features for managing expenses:  
    - Adding new expenses.  
    - Editing existing expenses.  
    - Deleting expenses.

- **Expense Reports:**  
  - Integrated expense categorization to better organize and analyze expenses within the reports.

---
## Latest Updates

All the latest changes and updates are available in the **main** branch.

## Development Setup

This project is built with **Vue 3** and uses `json-server` for handling mock APIs.

### Running the Project

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone [repository_url]
   cd [project_directory]
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server for the Vue 3 application:

   ```bash
   npm run dev
   ```

4. Run the mock API server using the following command:

   ```bash
   npm run db
   ```

The `json-server` will serve data from `db.json` and start on port 5001, dynamically updating based on changes in the file.

---

Team triozeit

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/9E64H9WI)
