import { createRoute } from "@hono/zod-openapi";
import { ParamsSchema, RequestBodySchema, ResponseSchema } from "./schema/echo";

export const route = createRoute({
  method: "post",
  path: "/echo/{id}",
  description: "受け取った入力値をそのまま応答する",
  request: {
    params: ParamsSchema,
    body: {
      required: true,
      content: {
        "application/json": {
          schema: RequestBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: ResponseSchema,
        },
      },
    },
  },
});
