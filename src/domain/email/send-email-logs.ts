import { EmailService } from "../../presentation/email/email.service"
import { LogEntity, LogServerityLevel } from "../entities/log.entities";
import { LogRepository } from "../reposity/log.repository"

interface SendLogEmailUseCase{
    execute:(to:string | string[]) => Promise<boolean>
}


export class SendEmailLogs implements SendLogEmailUseCase{
    constructor(
        private readonly emailService:EmailService,
        private readonly logRepository:LogRepository
    ){}
    
    async execute(to: string | string[]){

        const log = new LogEntity({
            message: '',
            level: LogServerityLevel.low,
            origin:'send-email-log.ts',
        })
        try {
            const sent =  await this.emailService.sendEmailWithFileSystemLogs(to);
            if(!sent){
                throw new Error('email log not sent');
            } 

            log.message = `Log email sent`;
            this.logRepository.saveLog(log);
            return true;
        } catch (error) {
            
            log.message = `Log email sent ${error}`;
            this.logRepository.saveLog(log);
            return false;
        }
    }
;


}