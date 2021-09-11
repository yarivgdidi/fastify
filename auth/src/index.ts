import fastify, {FastifyReply, FastifyRequest} from 'fastify'
import fastifySwagger from 'fastify-swagger'
import fastifyCors from "fastify-cors";
const app = fastify({trustProxy: true})

import { Static, Type } from '@sinclair/typebox'

import {registrationSchema} from "../schemas/registrationScherma";
import {loginSchema } from "../schemas/lognSchema";
import {swaggerSchema} from "../schemas/swaggerSchema";

app.register(fastifyCors);

// @ts-ignore
app.register(fastifySwagger, swaggerSchema );

const RegisterUser = Type.Object( {
    email: Type.String(),
    first: Type.String(),
    last: Type.String(),
    password: Type.String()
})
type RegisterUserType = Static<typeof RegisterUser>;

const LoginUser = Type.Object( {
    email: Type.String(),
    password: Type.String(),
})

type LoginUserType = Static<typeof LoginUser>;

const LoginResponse = Type.Object( {
    email: Type.String(),
    id: Type.String(),
    token: Type.String(),
})
type LoginResponseType = Static<typeof LoginResponse>;

app.post<{ Body: RegisterUserType; Reply: LoginResponseType }>( '/register', registrationSchema, async (req: FastifyRequest, rep: FastifyReply) => {
    const { email, first, last, password } = req.body as RegisterUserType;

    const response: LoginResponseType = {
        email: 'aaa',
        id: 'bbb',
        token: 'aaa'
    }
    rep.status(200).send(response);
});

app.post<{ Body: LoginUserType; Reply: LoginResponseType }>( '/login', loginSchema, (req: FastifyRequest, rep: FastifyReply) => {
    const response: LoginResponseType = {
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
