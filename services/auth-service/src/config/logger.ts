import type { PinoLoggerOptions } from "fastify/types/logger.js"

// Logger configuration
export const loggerConfig: PinoLoggerOptions = {
    transport: {
        target: "@fastify/one-line-logger"
    }
}