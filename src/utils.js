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
}
