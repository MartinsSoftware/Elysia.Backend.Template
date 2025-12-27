export enum AppErrorCode {
  UNAUTHORIZED = "UNAUTHORIZED",
  NOT_FOUND = "NOT_FOUND",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export interface AppErrorParams {
  code: AppErrorCode;
  message: string;
  status?: number;
  details?: {
    field: string;
    message: string;
  }[];
}

export class AppError extends Error {
  public readonly code: AppErrorCode;
  public readonly status: number;
  public readonly details?: unknown;

  constructor(params: AppErrorParams) {
    super(params.message);
    this.code = params.code;
    this.status = params.status ?? 400;
    this.details = params.details;
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}
