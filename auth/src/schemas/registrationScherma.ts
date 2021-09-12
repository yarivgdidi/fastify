const userRegistrationSchema = {
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
export { userRegistrationSchema }
