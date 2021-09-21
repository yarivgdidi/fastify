"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
var loginSchema = {
    schema: {
        description: 'User login API',
        tags: ['auth'],
        summary: 'Login user',
        body: {
            type: 'object',
            properties: {
                email: { type: 'string' },
                password: { type: 'string' }
            },
        },
        response: {
            200: {
                description: 'Successful login',
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    id: { type: 'string' },
                    token: { type: 'string' }
                }
            }
        }
    }
};
exports.loginSchema = loginSchema;
//# sourceMappingURL=loginSchema.js.map