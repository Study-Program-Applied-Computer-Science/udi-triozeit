export const fetchTask = async (email) => {
  const res = await fetch(`http://localhost:8081/users?email=${email}`);
  const data = await res.json();
  return data;
};
