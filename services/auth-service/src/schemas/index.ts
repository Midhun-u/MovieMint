import { Ratings } from "./rate.schema.js";
import { User } from "./user.schema.js";

User.hasMany(Ratings, {
    foreignKey: "user_id"
})

Ratings.belongsTo(User, {
    foreignKey: "user_id"
})

export {User, Ratings}