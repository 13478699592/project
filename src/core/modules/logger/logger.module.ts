import { Global, Module } from "@nestjs/common";
import { LoggerService } from "./logger.service";

const providers = [LoggerService];

@Global()
@Module({
  exports: [...providers],
  providers,
})
export class LoggerModule {}
