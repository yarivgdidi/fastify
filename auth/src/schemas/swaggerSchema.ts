const swaggerSchema = {
    routePrefix: '/api/auth/docs',
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
        hosts: [ 'localhost:3000','fastify.local:3000' ],

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
    transformStaticCSP: (header: any) => header,
    exposeRoute: true
}

export { swaggerSchema }
