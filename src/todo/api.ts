import { BASE_API } from "../api";

export const getTodos = async () => {
  const response = await fetch(BASE_API + "/todo/");
  const data = await response.json();
  return data;
};

export const createTodo = async (todo: { title: string }) => {
  const response = await fetch(BASE_API + "/todo/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  return data;
};

export const updateTodo = async (
  id: number,
  data: { title: string; completed: boolean }
) => {
  const response = await fetch(BASE_API + `/todo/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      title: data.title,
      completed: data.completed,
    }),
  });
  const res = await response.json();
  return res;
};

export const deleteTodo = async (id: number) => {
  const response = await fetch(BASE_API + `/todo/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return response
}