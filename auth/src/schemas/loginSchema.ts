
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

export { loginSchema }
