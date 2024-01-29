
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImp } from "../infrastructure/reposities/log.respository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


const fileSystemLogRepository = new LogRepositoryImp(
    new FileSystemDatasource()
);

export class Server{
    public static start(){
        console.log('server started...');

        // const emailService = new EmailService(fileSystemLogRepository);

        // emailService.sendEmailWithFileSystemLogs([
        //     'svgarcia7895@gmail.com', 
        //     'sergio.garcia@fundacioncapital.org'
        // ]);

        // emailService.sendEmail({
        //     to:'svgarcia7895@gmail.com',
        //     subject:'logs de sistema',
        //     htmlBody:`  `
            
        // });        
    //     CronService.createJob('*/5 * * * * *',()=>{
    //         new CheckService(
    //             fileSystemLogRepository,
    //             ()=>console.log('success'),
    //             (error) => console.error(error)
    //         ).execute('https://google.com');
    //    });
    }
};