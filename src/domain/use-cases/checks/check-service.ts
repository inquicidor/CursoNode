import { LogEntity, LogServerityLevel } from "../../entities/log.entities";
import { LogRepository } from "../../reposity/log.repository";

interface CheckServiceUseCase {
    execute(url:string):Promise<boolean>;
}


type SuccessCallback =  (() =>void)|undefined;
type ErrorCallback = ((error:string) => void)|undefined; 


export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly logRepository: LogRepository,
        readonly successCallback: SuccessCallback,
        readonly errorCallback:ErrorCallback
    ){}


    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if(!req.ok){
                throw new Error (`error on check service ${url}`);
            }
            const log = new LogEntity({
                message:`service ${url} working `,
                level: LogServerityLevel.low,
                origin: 'check-service.ts'
            });
            
            this.logRepository.saveLog(log);
            this.successCallback && this.successCallback(); 
        } catch (error) {
            const messageError = `service ${url}: ${error} `;
            const log = new LogEntity({
                level:LogServerityLevel.high,
                message:messageError,
                origin:'check-service.ts' 
            });
            this.logRepository.saveLog(log);
            this.errorCallback && this.errorCallback(`${error}`);
        }
        return false;
    }
}