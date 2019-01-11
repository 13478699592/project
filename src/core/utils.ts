import { HttpException } from "@nestjs/common";
import * as _ from "lodash";
import * as path from "path";
import { LoggerService } from "./modules/logger";
import { HTTP_STATUS_CODE_ENUM } from "./shared/enums";
import { IResult } from "./shared/interfaces";

// const { DEBUG_FOLDER, DEBUG_LEVEL } = APP_CONFIG;

const rootPath = process.cwd();


export function getRootPath() {
  return rootPath;
}

export function getPath(...paths) {
  return path.resolve(getRootPath(), ...paths);
}

export function createResult(data: any): IResult;
export function createResult(error: Error): IResult;
export function createResult(data: any, code?: number): IResult;
export function createResult(error: Error, code?: number): IResult;
export function createResult(error: HttpException, code?: number): IResult;
export function createResult(dataOrError: any | Error, code?: number): IResult {
  let data = {};
  if (dataOrError instanceof HttpException) {
    if (code === undefined) {
      code = HTTP_STATUS_CODE_ENUM.INTERNAL_SERVER_ERROR;
    }
    LoggerService.error(_.toString(dataOrError.message.message));
  } else if (dataOrError instanceof Error) {
    if (code === undefined) {
      code = HTTP_STATUS_CODE_ENUM.INTERNAL_SERVER_ERROR;
    }
    LoggerService.error(_.toString(dataOrError.stack));
  } else {
    data = dataOrError;
    code = HTTP_STATUS_CODE_ENUM.OK;
  }
  return { data, code };
}