import {CronJob} from "cron";

type CronTime = string|Date;
type OnTick =()=>void;

export class CronService{
    static createJob(cronoTime:CronTime, ontick:OnTick):CronJob {
        const job = new CronJob(cronoTime, ontick);
        job.start();
        return job;
    }

}