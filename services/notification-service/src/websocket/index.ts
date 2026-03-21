import { upgradeWebSocket } from "hono/bun";
import { onOpen } from "./onOpen";

export const wsHandler = upgradeWebSocket(() => {

    return {
        onOpen: onOpen
    }

})