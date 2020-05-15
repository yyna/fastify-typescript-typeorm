import { Server, IncomingMessage, ServerResponse } from 'http'
import { Repository } from 'typeorm'

import { Memo } from '../../modules/memo/entity'
import { User } from '../../modules/user/entity'

interface Repositories {
    memo: Repository<Memo>
    user: Repository<User>
}

declare module 'fastify' {
    export interface FastifyInstance<
        HttpServer = Server,
        HttpRequest = IncomingMessage,
        HttpResponse = ServerResponse
    > {
        db: Repositories
        auth: any
        jwt: any
    }
}
