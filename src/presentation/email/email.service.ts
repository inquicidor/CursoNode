import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/reposity/log.repository';
import { LogEntity, LogServerityLevel } from '../../domain/entities/log.entities';



interface SendMailOption{
    to:string | string[];
    subject:string;
    htmlBody:string;
    attachements?:Attachement[];
}

interface Attachement{
    filename:string;
    path:string;
}


export class EmailService{
  transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    }
  });

  constructor(
    private readonly logRespository:LogRepository
  ){

  }

  async sendEmail(options:SendMailOption):Promise<boolean>{
    const {to, subject, htmlBody, attachements =[]} = options;

    const log = new LogEntity({
      level:LogServerityLevel.low,
      message:'',
      origin:'email.servise.ts',
    });

    try{
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html:htmlBody,
        attachments:attachements,
      });

      log.message = 'email sent'
      //console.log(sentInformation);
      this.logRespository.saveLog(log);
      
      return true;
    }catch(error){
      log.level = LogServerityLevel.high;
      log.message = 'email didnt send'
      this.logRespository.saveLog(log);
      console.log(error);
      return false;
    }

  }

  async sendEmailWithFileSystemLogs(to:string | string[]):Promise<boolean>{
    const subject = 'Logs del sevidor';
    const htmlBody = `
    <h3>Logs de sistema - NOC</h3>
    <p>Lorem velit non veniam ullamco ex eu laborum deserunt est amet elit nostrud sit. Dolore ullamco duis in ut deserunt. Ad pariatur labore exercitation adipisicing excepteur elit anim eu consectetur excepteur est dolor qui. Voluptate consectetur proident ex fugiat reprehenderit exercitation laboris amet Lorem ullamco sit. Id aute ad do laborum officia labore proident laborum. Amet sit aliqua esse anim fugiat ut eu excepteur veniam incididunt occaecat sit irure aliquip. Laborum esse cupidatat adipisicing non et cupidatat ut esse voluptate aute aliqua pariatur.</p>
    <p>Ver logs adjuntos</p>
    `;

    const attachements:Attachement[] = [
      {filename: 'logs-all.log', path:'./logs/logs-all.log' },
      {filename: 'logs-high.log', path:'./logs/logs-high.log' },
      {filename: 'logs-medium.log', path:'./logs/logs-medium.log' },
    ];

    return this.sendEmail({
      to,
      subject,
      attachements,
      htmlBody
    });
  }

}
