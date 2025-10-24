import { ErrorCode, HttpStatusEnum } from "../enums/Api";
import { ApiCodeError } from "./api";

// 400 - Bad Request
export class BadRequest extends ApiCodeError {
  constructor() {
    super(ErrorCode.BAD_REQUEST, HttpStatusEnum.BAD_REQUEST);
  }
}

// 401 - Unauthorized
export class Unauthorized extends ApiCodeError {
  constructor() {
    super(ErrorCode.UNAUTHORIZED, HttpStatusEnum.UNAUTHORIZED);
  }
}

// 403 - Forbidden
export class Forbidden extends ApiCodeError {
  constructor() {
    super(ErrorCode.FORBIDDEN, HttpStatusEnum.FORBIDDEN);
  }
}

// 404 - Not Found
export class NotFound extends ApiCodeError {
  constructor(code: ErrorCode) {
    super(code, HttpStatusEnum.NOT_FOUND);
  }
}

// 500 - Internal Server Error
export class InternalServerError extends ApiCodeError {
  constructor() {
    super(ErrorCode.INTERNAL_ERROR, HttpStatusEnum.INTERNAL_SERVER_ERROR);
  }
}