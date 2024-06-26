import nodemailer, { Transporter } from "nodemailer";

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

export interface Attachement {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter: Transporter;

  constructor(
    mailService: string,
    mailUser: string,
    senderMailPassword: string
  ) {
    this.transporter = nodemailer.createTransport({
      service: mailService,
      auth: {
        user: mailUser,
        pass: senderMailPassword,
      },
    });
  }

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });

      // console.log(sentInformation);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
