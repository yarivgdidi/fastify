import fastify, {FastifyReply, FastifyRequest} from 'fastify'
import fastifySwagger from 'fastify-swagger'
import fastifyCors from "fastify-cors";

import { Sequelize } from "sequelize";

import { userRegistrationSchema, loginSchema , swaggerSchema } from './schemas';
import { IRegisterUser, ILoginUser ,ILoginResponse} from './interfaces';


const app = fastify({trustProxy: true})
const db = require("./sequelize/models");
const User = db.User;

// @ts-ignore
app.register(fastifySwagger, swaggerSchema );
app.register(fastifyCors);
app.get('/api/auth/health-check', (req: FastifyRequest, rep: FastifyReply)=> {
    rep.status(201).send('Hello');
})
app.post<{ Body: IRegisterUser; Reply: ILoginResponse}>( '/api/auth/register', userRegistrationSchema, async (req: FastifyRequest, rep: FastifyReply) => {
     const { email, first, last, password } = req.body as IRegisterUser;
     console.log('/api/auth/register',email, first, last, password)
    try {
        const user  = User.build(
            { email, first, last, password }
        )
        await user.save()
        const { id } = user;
        const token = 'aaaaaaa'
        const response: ILoginResponse = {id, email, token }
        rep.status(201).send(response);
    } catch (error) {
        rep.status(500).send(error);
    }

});

app.post<{ Body: ILoginUser; Reply: ILoginResponse }>( '/api/auth/login', loginSchema, (req: FastifyRequest, rep: FastifyReply) => {
    const response: ILoginResponse = {
        email: 'aaa',
        id: 123,
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
const MYSQL_URI = process.env.MYSQL_URI || 'localhost:3306'
const sequelize = new Sequelize(`mysql://fastify:fastify@${MYSQL_URI}/fastify`);
sequelize.authenticate()
    .then(()=>console.log('Sequelize connected'))
    .catch(() => {
        console.log('Sequelize connection error, retrying')
        setTimeout(()=> {
            sequelize.authenticate()
                .then(()=>console.log('Sequelize connected'))
                .catch(err => {
                    console.log('Sequelize connection', err)
                })
        }, 10000)

    })


