import type { WSContext } from "hono/ws";

export const clients = new Set<WSContext>()

export const onOpen = (event: Event, ws: WSContext<any>) => {

    clients.add(ws)
    console.log("Websocket is connected")
    ws.send("Websocket is connected")

}