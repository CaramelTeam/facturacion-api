import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { EmailI } from "./types/email.types";
import envsConfig from "src/config/envs.config";

@Injectable()
export class EmailService {
    constructor(
        private readonly mailerService: MailerService
    ) { }

    async sendEmail(email: EmailI) {
        const { to, cc, subject, bcc, template, attachments, html } = email
        const { button } = email.options
        
        const from = envsConfig().NODEMAILER.NODEMAILER_ADDRESS
        return await this.mailerService.sendMail({
            from,
            to,
            cc,
            bcc,
            attachments,
            subject,
            template,
            context: {
                title: email.title,
                preview: email.preview,
                content: html,
                button
            }
        })
    }

}