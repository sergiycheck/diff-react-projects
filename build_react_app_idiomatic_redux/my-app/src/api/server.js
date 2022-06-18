import { nanoid } from "nanoid";

import { filterTypes } from "../redux/actionsData";

const fakeDatabase = {
  todos: [
    {
      id: nanoid(),
      text: "first todo text",
      completed: true,
    },
    {
      id: nanoid(),
      text: "second completed todo",
      completed: true,
    },
    {
      id: nanoid(),
      text: "second todo text",
      completed: false,
    },
    {
      id: nanoid(),
      text: "let's go",
      completed: false,
    },
  ],
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTodos = async (filter) => {
  await delay(500);
  // if (Math.random() > 0.5) throw new Error("error happend");

  switch (filter) {
    case filterTypes.All:
      return fakeDatabase.todos;
    case filterTypes.Active:
      return fakeDatabase.todos.filter((t) => !t.completed);
    case filterTypes.Completed:
      return fakeDatabase.todos.filter((t) => t.completed);
    default:
      throw new Error(`Unknown filter ${filter}`);
  }
};

export const addTodo = async (text) => {
  await delay(500);

  const newTodo = {
    id: nanoid(),
    text,
    completed: false,
  };

  fakeDatabase.todos.push(newTodo);

  const addedTodo = fakeDatabase.todos.find((todo) => todo.id === newTodo.id);
  return addedTodo;
};

export const toggleTodo = async (id) => {
  await delay(500);

  const todo = fakeDatabase.todos.find((todo) => todo.id === id);
  todo.completed = !todo.completed;
  return todo;
};
