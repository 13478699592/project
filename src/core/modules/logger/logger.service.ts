import { Logger, LoggerService as ILoggerService } from "@nestjs/common";

export class LoggerService extends Logger implements ILoggerService {

  public log(message: string) {
    super.log(message);
  }

  public warn(message: string) {
    super.warn(message);
  }

  public error(message: string, trace: string) {
    super.error(message, trace);
  }
}
