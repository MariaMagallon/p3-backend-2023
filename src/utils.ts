import { ErrorRequestHandler, RequestHandler } from "express";

export const defaultErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({
    error: "Ha ocurrido un error en el servidor",
  });
}

export const errorChecked = (handler: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      next(e);
    }
  }
}

