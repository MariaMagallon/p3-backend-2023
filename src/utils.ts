import { ErrorRequestHandler, NextFunction, RequestHandler } from "express";
import { check, validationResult } from "express-validator";

export const defaultErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  switch (err.constructor.name) {
    case "NotFoundError":
      return res.status(404).json({
        type: err.constructor.name,
        message: `${err.message} for this ID.`,
      });
    case "PrismaClientKnownRequestError":
      return res.status(404).json({
        type: err.constructor.name,
        message:
          "A property in requiered body is missing, empty or not exist. Name or title must be unique",
      });
    case "PrismaValidationError":
      return res.status(404).json({
        type: err.constructor.name,
        message:
          "Check required body params type or structure",
      });
    default:
      console.error(err);
      return res.status(500).json({
        type: err.constructor.name,
        message: err.message || err.toString(),
      });
  }
};

export const errorChecked = (handler: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      console.error(e);
      next(e);
    }
  };
};

export const validateIdParam = (): any => {
  return [
    check("id")
      .notEmpty()
      .exists()
      .withMessage("ID is required")
      .isNumeric()
      .withMessage("ID must be numeric"),
    (req, res, next): RequestHandler => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

export const validateGenreParams = (): any => {
  return [
    check("name")
      .notEmpty()
      .withMessage("Genre name is required")
      .isString()
      .withMessage("Genre name must be a string"),
    (req, res, next): RequestHandler => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};
