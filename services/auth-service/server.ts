import Fastify from "fastify"

// App instance
const app = Fastify({
    logger: true
})
const port = 5000

// Listening port
app.listen({port: port}, (error, address) => {

    if(error){
        console.error(error)
        process.exit(1)
    }

    console.log(`Server running on ${address}`)

})