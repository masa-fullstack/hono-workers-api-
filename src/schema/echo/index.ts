import { z } from "@hono/zod-openapi";

const ParamsSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "1212121",
    }),
});

const RequestBodySchema = z.object({
  input: z.string().openapi({
    example: "Hello World!",
    description: "入力",
  }),
});

const ResponseSchema = z.object({
  result: z.string().openapi({
    example: "Hello World!",
    description: "応答",
  }),
});

export { ParamsSchema, RequestBodySchema, ResponseSchema };
