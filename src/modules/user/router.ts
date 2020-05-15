import fp from 'fastify-plugin'
import bcrypt from 'bcrypt'

export default fp((server, opts, next) => {
    server.post('/sign-up', async (request, reply) => {
        const { email, password } = request.body
        const user = await server.db.user.findOne({ email })

        if (user) {
            reply.code(409).send('EMAIL_ALREADY_TAKEN')
        } else {
            await server.db.user.save({
                email,
                password: bcrypt.hashSync(password, 8),
            })
            reply.code(201).send()
        }
    })

    server.post('/sign-in', async (request, reply) => {
        const { email, password } = request.body
        const user = await server.db.user.findOne({ email })

        if (user) {
            // check password
            if (bcrypt.compareSync(password, user.password)) {
                const token = server.jwt.sign(user.id + '')
                reply.code(200).send({ token })
            }
            // password mismatch
            else {
                reply.code(401).send('PASSWORD_MISMATCH')
            }
        } else {
            reply.code(404).send('USER_NOT_FOUND')
        }
    })

    next()
})
