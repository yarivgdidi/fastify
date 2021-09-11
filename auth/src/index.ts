import fastify, {FastifyReply, FastifyRequest} from 'fastify'
import fastifySwagger from 'fastify-swagger'
import fastifyCors from "fastify-cors";
const app = fastify({trustProxy: true})

import { userRegistrationSchema, loginSchema , swaggerSchema } from '../schemas';
import { IRegisterUser, ILoginUser ,ILoginResponse} from '../interfaces';

// @ts-ignore
app.register(fastifySwagger, swaggerSchema );
app.register(fastifyCors);

app.post<{ Body: IRegisterUser; Reply: ILoginResponse}>( '/register', userRegistrationSchema, async (req: FastifyRequest, rep: FastifyReply) => {
    const { email, first, last, password } = req.body as IRegisterUser;
    const response: ILoginResponse = {
        email: 'aaa',
        id: 'bbb',
        token: 'aaa'
    }
    rep.status(200).send(response);
});

app.post<{ Body: ILoginUser; Reply: ILoginResponse }>( '/login', loginSchema, (req: FastifyRequest, rep: FastifyReply) => {
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
