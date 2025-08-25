import { FastifyReply } from "fastify";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  timestamp: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
  code?: number;
  timestamp: string;
}

export class ResponseHandler {
  static success<T>(
    reply: FastifyReply,
    data?: T,
    message: string = 'Success',
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    },
    statusCode: number = 200
  ) {
    const response: ApiResponse<T> = {
      success: true,
      message,
      timestamp: new Date().toISOString(),
    };

    if (data !== undefined) {
      response.data = data;
    }

    if (pagination) {
      response.pagination = pagination;
    }

    return reply.status(statusCode).send(response);
  }

  static error(
    reply: FastifyReply,
    message: string,
    error?: string,
    statusCode: number = 500
  ) {
    const response: ErrorResponse = {
      success: false,
      message,
      error,
      code: statusCode,
      timestamp: new Date().toISOString(),
    };

    return reply.status(statusCode).send(response);
  }

  static created<T>(reply: FastifyReply, data?: T, message: string = 'Created successfully') {
    return this.success(reply, data, message, undefined, 201);
  }

  static notFound(reply: FastifyReply, message: string = 'Resource not found') {
    return this.error(reply, message, undefined, 404);
  }

  static badRequest(reply: FastifyReply, message: string, error?: string) {
    return this.error(reply, message, error, 400);
  }

  static unauthorized(reply: FastifyReply, message: string = 'Unauthorized') {
    return this.error(reply, message, undefined, 401);
  }

  static forbidden(reply: FastifyReply, message: string = 'Forbidden') {
    return this.error(reply, message, undefined, 403);
  }

  static serverError(reply: FastifyReply, message: string = 'Internal Server Error', error?: string) {
    return this.error(reply, message, error, 500);
  }
}

export const paginationHelper = (
  page: number = 1,
  limit: number = 10,
  total: number
) => {
  const offset = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  return {
    offset,
    limit,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

// Backward compatibility - export functions for existing code
export const successResponse = ResponseHandler.success;
export const errorResponse = ResponseHandler.error;
