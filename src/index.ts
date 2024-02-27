import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { basicAuth } from "hono/basic-auth";
import { bearerAuth } from "hono/bearer-auth";
import { route } from "./openapi";

const app = new OpenAPIHono();

app.use("/specification", bearerAuth({ token: "bearer-token" })).use(
  "/doc",
  basicAuth({
    username: "user",
    password: "password",
  })
);

app
  .openapi(route, async (c) => {
    console.log("strat");
    const body = c.req.valid("json");
    return c.json({ result: body.input });
  })
  .doc("/specification", {
    openapi: "3.0.0",
    info: {
      title: "Example API",
      version: "1.0.0",
    },
  })
  .get(
    "doc",
    swaggerUI({
      url: "/specification",
      requestInterceptor: `
      request => {
        if (request.url === '/specification') {
          request.headers['authorization'] = \`Bearer bearer-token\`;
        }
        return request;
      }
    `,
    })
  );

export default app;
