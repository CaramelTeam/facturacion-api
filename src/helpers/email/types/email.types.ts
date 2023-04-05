export interface EmailI {
    to: Array<string>;
    cc?: Array<string>;
    bcc?: Array<string>;
    subject: string;
    attachments?: Array<any>;
    html: string;
    template?: string;
    preview: string;
    title: string;
    options?: {
        button?: {
            text: string;
            url: string;
        }
    }
}