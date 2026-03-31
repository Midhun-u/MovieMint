import type { WSContext } from "hono/ws";
import { clients } from "./onOpen.js";

export const onMessage = (event: MessageEvent, ws: WSContext<any>) => {

    clients.forEach(client => {
        client.send(event.data)
    })

}