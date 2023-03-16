import { Router } from "https://deno.land/x/oak/mod.ts";
import { Bson } from 'https://deno.land/x/mongo@v0.29.2/mod.ts';

import { getDb } from "../helpers/db_client.ts";

const router = new Router();

type Todo = {
  id?: string; //making id optional
  text: string;
};

router.get("/todos", async (ctx) => {
  const todos = await getDb().collection("todos").find().toArray();

  const transformedTodos = todos.map(
    (todo) => {

      return {
        id: todo._id.toString(),
        text: todo.text,
      };
    }
  );
  ctx.response.body = {
    todos: transformedTodos
  };
});

router.post("/todos", async (ctx) => {
  const { text } = await ctx.request.body({ type: "json" }).value;

  const newTodo: Todo = {
    // id: new Date().toISOString(),
    text,
  };

  const id = await getDb().collection("todos").insertOne(newTodo);

  newTodo.id = id.$oid;

  ctx.response.body = {
    message: "Todo created",
    todo: newTodo,
  };
});

router.put("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId!;
  const data = await ctx.request.body({ type: "json" }).value;

  await getDb()
    .collection("todos")
    .updateOne({ _id: new Bson.ObjectId(tid) }, { $set: { text: data.text } });

  ctx.response.body = {
    message: "Todo Updated",
  };
});

router.delete("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId!;

  await getDb()
    .collection("todos")
    .deleteOne({ _id: new Bson.ObjectId(tid) });

  ctx.response.body = {
    message: "Todo Deleted",
  };
});

export default router;
