import type { Context } from "hono";
import { redis } from "../../config/redis.js";

// Controller for getting reserved seats
export const getReservedSeatsController = async (context: Context) => {

    const {showId} = context.req.param()

    if(!showId){
        context.status(400)
        return context.json({success: false, error: "Show id is required", statusCode: 400})
    }

    const reservedSeatsJson = await redis.zRangeWithScores(`show-${showId}`, 0, -1)
    if(reservedSeatsJson){

        const parsedReservedSeats = await Promise.all(reservedSeatsJson.map(async reservedSeat => {
            
            if(reservedSeat.score < Date.now()){
                console.log("Expired")
                await redis.zRemRangeByScore(`show-${showId}`, 0, Date.now())
            }else{
                return JSON.parse(reservedSeat.value)
            }

        }) || [])

        return context.json({success: true, reservedSeats: parsedReservedSeats, statusCode: 200})

    }

    return context.json({success: true, reservedSeats: [], statusCode: 200})

}