import express, { json } from "express";
import cors from "cors";
import fs from "fs";
import crypto from "crypto";

const data = fs.readFileSync("./data.json", "utf-8");

let todos = JSON.parse(data);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

// GET all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// POST a new todo
app.post("/api/todos", (req, res) => {
  const newTodo = {
    id: crypto.randomUUID(),
    text: req.body.text,
    dueDate: req.body.dueDate,
  };
  todos.push(newTodo);

  const jsonTodos = JSON.stringify(todos, null, 2);

  try {
    fs.writeFile("./data.json", jsonTodos, "utf-8", (err) => {
      if (err) throw new Error(err);
    });
    console.log("JSON file saved");
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "JSON write fail" });
  }
});

// PUT update a todo
app.put("/api/todos/:id", (req, res) => {
  const todoId = req.params.id;
  const todo = todos.find((t) => t.id === todoId);
  const todoIndex = todos.findIndex((t) => t.id === todoId);

  if (todo) {
    todo.completed = true;
    todos[todoIndex] = todo;
    const jsonTodos = JSON.stringify(todos, null, 2);

    try {
      fs.writeFile("./data.json", jsonTodos, "utf-8", (err) => {
        if (err) throw new Error(err);
      });
      console.log("JSON file saved");
      res.status(201).json(todo);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "JSON write fail" });
    }
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// DELETE a todo
app.delete("/api/todos/:id", (req, res) => {
  const todoId = req.params.id;
  const todo = todos.find((t) => t.id === todoId);
  if (todo) {
    todos = todos.filter((t) => t.id !== todoId);

    const jsonTodos = JSON.stringify(todos, null, 2);

    try {
      fs.writeFile("./data.json", jsonTodos, "utf-8", (err) => {
        if (err) throw new Error(err);
      });
      console.log("JSON file saved");
      res.status(201).json(todo);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "JSON write fail" });
    }
  } else res.status(404).json({ message: "Todo not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
