import { ErrorCode, HttpStatusEnum } from "../enums/Api";
import { errorMessages } from "./messages";

export class ApiError extends Error {
  public readonly title: string;
  public readonly status: number;
  public readonly details?: unknown;

  constructor(title: string, message: string, status: number, details?: unknown) {
    super(message);
    this.title = title;
    this.status = status;
    this.details = details;

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  toJSON() {
    return {
      title: this.title,
      message: this.message,
      status: this.status,
      details: this.details,
    };
  }
}

export class ApiCodeError extends Error {
  public readonly title: string
  public readonly status: number
  public readonly code: ErrorCode

  constructor(code: ErrorCode, status = HttpStatusEnum.BAD_REQUEST) {
    const { title, message } = errorMessages[code]
    super(message)

    this.title = title
    this.code = code
    this.status = status

    Object.setPrototypeOf(this, ApiCodeError.prototype)
  }

  toJSON() {
    return {
      title: this.title,
      message: this.message,
      code: this.code,
      status: this.status,
    }
  }
}