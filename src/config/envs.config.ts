import { registerAs } from "@nestjs/config"

export default registerAs('env.config', () => {
    return {
        app: {
            PORT: process.env.PORT || 3000,
        },
        JWT: {
            JWT_SECRET: process.env.JWT_SECRET
        }
    }
})