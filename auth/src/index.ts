import fastify, {FastifyReply, FastifyRequest} from 'fastify'
import fastifySwagger from 'fastify-swagger'
import fastifyCors from "fastify-cors";
const app = fastify({trustProxy: true})
app.register(fastifyCors);
app.register(fastifySwagger, {
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'Test swagger',
            description: 'Testing the Fastify swagger API',
            version: '0.1.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            { name: 'auth', description: 'Authentication related end-points' },
        ],
        definitions: {},
        securityDefinitions: {
            apiKey: {
                type: 'apiKey',
                name: 'apiKey',
                in: 'header'
            }
        },
    },

    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true
})
import { Static, Type } from '@sinclair/typebox'

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

const registrationSchema = {
    schema: {
        description: 'User registration API',
        tags: ['auth'],
        summary: 'Register user',
        body: {
            type: 'object',
            properties: {
                email: { type: 'string' },
                first: { type: 'string' },
                last: { type: 'string' },
                password: { type: 'string' }
            },
        },
        response: {
            201:  {
                description: 'Successful registration',
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    id: { type: 'string' },
                    token: { type: 'string' }
                }
            }
        },
        security: [
            {
                "apiKey": []
            }
        ]
    }
}
const loginSchema = {
    schema: {
        description: 'User login API',
        tags: ['auth'],
        summary: 'Login user',
        body: {
            type: 'object',
            properties: {
                email: {type: 'string'},
                password: {type: 'string'}
            },
        },
        response: {
            200: {
                description: 'Successful login',
                type: 'object',
                properties: {
                    email: {type: 'string'},
                    id: {type: 'string'},
                    token: {type: 'string'}
                }
            }
        }
    }
}

app.post<{ Body: RegisterUserType; Reply: LoginResponseType }>( '/register', registrationSchema, async (req: FastifyRequest, rep: FastifyReply) => {
    console.log('register user', req.body)
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
