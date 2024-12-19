
import { localHost } from "./urls";

export const updateSplitExpenses = async (updatedSplitValue) => {
  const res = await fetch(`${localHost}/expenses/${updatedSplitValue.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedSplitValue),
  });

  const data = await res.json();
  console.log(data, "after updating split ");
  return data;
};

export const fetchUsers = async () => {
  const response = await fetch(`${localHost}/users`);
  return response.json();
}

export const fetchExpenses = async (currentUser) => {
  const response = await fetch(`${localHost}/expenses`);
  const data = await response.json();
  return data.filter((expense) => expense.email === currentUser);
};

export const addExpense = async (newExpense) => {
  const response = await fetch(`${localHost}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newExpense),
  });

  return response.json();
};

export const updateExpense = async (updatedExpense) => {
  const response = await fetch(`${localHost}/expenses/${updatedExpense.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedExpense),
  });

  return response.json();
};


export const deleteExpense = async (id) => {
  const response = await fetch(`${localHost}/expenses/${id}`, {
    method: "DELETE",
  });

  return response.ok;
};