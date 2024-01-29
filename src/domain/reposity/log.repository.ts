import { LogEntity, LogServerityLevel } from "../entities/log.entities";

export abstract class LogRepository{
    abstract saveLog(log:LogEntity):Promise<void>
    abstract getLogs(logServeritLevel:LogServerityLevel):Promise<LogEntity[]>
}