export enum LogServerityLevel{
    low    ='low',
    medium ='medium',
    high   ='high'
}

export interface LogEntityOption{
    level:LogServerityLevel;
    message:string;
    createAt?:Date;
    origin:string;

}

export class LogEntity{
    
    public level:LogServerityLevel;
    public message:string;
    public createAt:Date;
    public origin:string;

    constructor(options:LogEntityOption){
        const {message, level, createAt = new Date(), origin } =options;
        this.message = message;
        this.level = level;
        this.createAt = createAt;
        this.origin = origin;
    }

    static fromJson =(json:string):LogEntity =>{
        const {message, level, createAt} =  JSON.parse(json);

        const log = new LogEntity({
            message:message, 
            level:level,
            createAt:createAt,
            origin:origin
        });
        return log;
    }


}