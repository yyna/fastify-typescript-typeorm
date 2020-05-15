import fp from 'fastify-plugin'
import jwt from 'fastify-jwt'

export default fp((server, opts, next) => {
    server.register(jwt, {
        secret: 'secret',
    })
    server.decorate('auth', async (req: any, res: any) => {
        try {
            await req.jwtVerify()
        } catch (err) {
            res.send(err)
        }
    })

    next()
})
