import fp from 'fastify-plugin'

export default fp((server, opts, next) => {
    server.get(
        '/memo',
        { preValidation: server.auth },
        async (request, reply) => {
            const memos = await server.db.memo.find({
                where: {
                    user: +request.user,
                },
            })
            reply.code(200).send({ memos })
        }
    )

    server.get(
        '/memo/:id',
        { preValidation: server.auth },
        async (request, reply) => {
            const { id } = request.params
            const memo = await server.db.memo.findOne({
                where: { id },
                relations: ['user'],
            })

            if (memo) {
                // check ownership
                if (memo.user.id !== +request.user) {
                    reply.code(403).send('MEMO_NO_ACCESS')
                } else {
                    reply.code(200).send({ memo })
                }
            } else {
                reply.code(404).send('MEMO_NOT_FOUND')
            }
        }
    )

    server.post(
        '/memo',
        { preValidation: server.auth },
        async (request, reply) => {
            const { title, content } = request.body
            const user = await server.db.user.findOne(+request.user)
            const memo = await server.db.memo.save({
                title,
                content,
                user,
            })
            delete memo.user
            reply.code(201).send({ memo })
        }
    )

    server.patch(
        '/memo/:id',
        { preValidation: server.auth },
        async (request, reply) => {
            const { id } = request.params
            const memo = await server.db.memo.findOne({
                where: { id },
                relations: ['user'],
            })

            if (memo) {
                // check ownership
                if (memo.user.id !== +request.user) {
                    reply.code(403).send('MEMO_NO_ACCESS')
                } else {
                    await server.db.memo.update(id, request.body)
                    const updatedMemo = await server.db.memo.findOne({ id })
                    reply.code(200).send({ memo: updatedMemo })
                }
            } else {
                reply.code(404).send('MEMO_NOT_FOUND')
            }
        }
    )

    server.delete(
        '/memo/:id',
        { preValidation: server.auth },
        async (request, reply) => {
            const { id } = request.params
            const memo = await server.db.memo.findOne({
                where: { id },
                relations: ['user'],
            })

            if (memo) {
                // check ownership
                if (memo.user.id !== +request.user) {
                    reply.code(403).send('MEMO_NO_ACCESS')
                } else {
                    await server.db.memo.delete({ id })
                    reply.code(200).send()
                }
            } else {
                reply.code(404).send('MEMO_NOT_FOUND')
            }
        }
    )

    next()
})
