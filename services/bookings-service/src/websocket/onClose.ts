import type { WSContext } from "hono/ws";
import { clients } from "./onOpen.js";

export const onClose = (event: Event, ws: WSContext) => {
    console.log("Websocket connection is closed")
    clients.delete(ws)
}