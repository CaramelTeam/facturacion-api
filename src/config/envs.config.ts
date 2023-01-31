import { registerAs } from "@nestjs/config"

export default registerAs('env.config', () => {
    return {
        app: {
            PORT: process.env.PORT || 3000,
        }
    }
})