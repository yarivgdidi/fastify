import fastify, {FastifyReply, FastifyRequest} from 'fastify'
import fastifySwagger from 'fastify-swagger'
import fastifyCors from "fastify-cors";

import {sequelizeWrapper} from "./sequelize/sequelize";

import { userRegistrationSchema, loginSchema , swaggerSchema } from './schemas';
import { IRegisterUser, ILoginUser ,ILoginResponse} from './interfaces';

const app = fastify({trustProxy: true})

// @ts-ignore
app.register(fastifySwagger, swaggerSchema );
app.register(fastifyCors);

app.post<{ Body: IRegisterUser; Reply: ILoginResponse}>( '/api/auth/register', userRegistrationSchema, async (req: FastifyRequest, rep: FastifyReply) => {
    const { email, first, last, password } = req.body as IRegisterUser;
    const response: ILoginResponse = {
        email: 'aaa',
        id: 'bbb',
        token: 'aaa'
    }
    rep.status(201).send(response);
});

app.post<{ Body: ILoginUser; Reply: ILoginResponse }>( '/api/auth/login', loginSchema, (req: FastifyRequest, rep: FastifyReply) => {
    const response: ILoginResponse = {
        email: 'aaa',
        id: 'bbb',
        token: 'aaa'
    }
    rep.status(200).send(response);
})

app.listen(3000, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
const start = async () => {
    try {
        await sequelizeWrapper.connect()
    }
    catch (err)  {
        console.log(err)
    }
}
