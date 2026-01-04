import type { FastifyEnvOptions } from "@fastify/env";

// ENV options
export const envOptions: FastifyEnvOptions = {
    dotenv: true,
    schema: {
        type: "object",
        required: ['PORT'],
        properties: {
            PORT: {
                type: "string",
                default: 5000
            }
        }
    },
    confKey: "config"
}