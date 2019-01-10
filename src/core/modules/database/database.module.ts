import { DynamicModule, Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConnectionOptions } from "typeorm";

@Global()
@Module({})
export class DatabaseModule {
  public static forRoot(
    options: ConnectionOptions,
    entities?: Function[],
  ): DynamicModule {
    return {
      exports: [
        TypeOrmModule.forRoot(options),
        TypeOrmModule.forFeature(entities),
      ],
      imports: [
        TypeOrmModule.forRoot(options),
        TypeOrmModule.forFeature(entities),
      ],
      module: DatabaseModule,
    };
  }
}
