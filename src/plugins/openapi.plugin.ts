import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { auth } from "@/modules/auth/auth";

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema());

export const OpenAPI = {
  getPaths: (prefix = "/api/auth") =>
    getSchema().then(({ paths }) => {
      const reference: typeof paths = Object.create(null);

      for (const path of Object.keys(paths)) {
        const key = prefix + path;
        reference[key] = paths[path];

        for (const method of Object.keys(paths[path])) {
          const operation = (reference[key] as any)[method];

          operation.tags = ["Better Auth"];
        }
      }

      return reference;
    }) as Promise<any>,
  components: getSchema().then(({ components }) => components) as Promise<any>,
} as const;

export const openApiPlugin = new Elysia({ name: "OpenAPI" }).use(
  openapi({
    documentation: {
      info: {
        title: "Elysia API Template",
        version: "1.0.0",
        description: "Elysia API Template",
      },
      components: await OpenAPI.components,
      paths: await OpenAPI.getPaths(),
    },
  })
);
