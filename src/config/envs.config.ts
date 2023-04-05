import { registerAs } from "@nestjs/config"

export default registerAs('env.config', () => {
    return {
        app: {
            PORT: process.env.PORT || 3000,
            TEST_SECRET_KEY: process.env.TEST_SECRET_KEY
        },
        JWT: {
            JWT_SECRET: process.env.JWT_SECRET
        },
        NODEMAILER: {
            NODEMAILER_ADDRESS: process.env.NODEMAILER_ADDRESS,
            NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
            NODEMAILER_ENCRYPTION: process.env.NODEMAILER_ENCRYPTION,
            NODEMAILER_HOST: process.env.NODEMAILER_HOST,
            NODEMAILER_MAILER: process.env.NODEMAILER_MAILER,
            NODEMAILER_NAME: process.env.NODEMAILER_NAME,
            NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
            NODEMAILER_PORT: process.env.NODEMAILER_PORT,
        }
    }
})