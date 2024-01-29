import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entities";
import { LogRepository } from "../../domain/reposity/log.repository";


export class LogRepositoryImp implements LogRepository{

    constructor(private readonly logDatasource:LogDatasource){

    }

    saveLog(log: LogEntity): Promise<void> {
        return this.logDatasource.saveLog(log);
    }
    getLogs(logServeritLevel: LogServerityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(logServeritLevel);
    }
}