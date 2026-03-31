import type { Context } from "hono";
import type { SeatType } from "../../types/seatType.js";
import { redis } from "../../config/redis.js";

// Controller for reserving seats
export const reserveSeatsController = async (context: Context) => {

    const { showId, seats } = await context.req.json() as {
        showId: string,
        seats: Array<SeatType>
    } || {}
    const user = context.get('auth')

    if (!showId || !seats) {
        context.status(400)
        return context.json({ success: false, error: "All fields are required", statusCode: 400 })
    }

    if (!Array.isArray(seats)) {
        context.status(400)
        return context.json({ success: false, error: "Invalid fields", statusCode: 400 })
    }

    const results = await Promise.all(seats.map(async (seat) => {

        if(!seat) return 

        const key = `show-${showId}`
        const isAdded = await redis.zAdd(
            key,
            [
                {
                    score: Date.now() + 10 * 60 * 1000,
                    value: JSON.stringify({
                        userId: user.id,
                        seat: seat
                    })
                }
            ],
        )

        if(isAdded){
            await redis.expire(key, 60 * 60 * 24) // Setting expire for 24 hours
        }
        
        return isAdded

    }) || [])
    
    if (results.includes(0)) {
        context.status(409)
        return context.json({ success: false, error: "Seats are already reserved", statusCode: 400 })
    }
    
    context.status(201)
    return context.json({ success: true, message: "Seats are reserved", statusCode: 201 })

}