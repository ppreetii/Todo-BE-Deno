import { Application } from "https://deno.land/x/oak/mod.ts";

import { connect } from "./helpers/db_client.ts";
import { port } from "./config/config.ts";

import todoRoutes from './routes/todo.ts';

await connect();

const app = new Application();

//handling CORS
app.use(async (ctx,next)=>{
  ctx.response.headers.set('Access-Control-Allow-Origin', '*');
  ctx.response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  await next();
})

app.use(todoRoutes.routes());
app.use(todoRoutes.allowedMethods());

await app.listen({ port: port });
