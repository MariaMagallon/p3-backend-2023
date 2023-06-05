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
    case "PrismaClientValidationError":
      return res.status(404).json({
        type: err.constructor.name,
        message:
          "Check required body params type or structure of the query",
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

export const validateAlbumParams = (): any => {
  return [
    check("title")
      .notEmpty()
      .withMessage("Album title is required")
      .isString()
      .withMessage("Album title must be a string"),
    check("genreId")
      .isNumeric()
      .withMessage("Genre id is required")
      .notEmpty()
      .withMessage("Genre id is required"),
    check("duration").isNumeric().withMessage("Duration must be numeric"),
    (req, res, next): RequestHandler => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

export const validateSongParams = (): any => {
  return [
    check("title")
      .notEmpty()
      .withMessage("Song title is required")
      .isString()
      .withMessage("Song title must be a string"),
    check("albumId")
      .isNumeric()
      .withMessage("Album id is required")
      .notEmpty()
      .withMessage("Album id is required"),
    check("duration").isNumeric().withMessage("Duration must be numeric"),
    (req, res, next): RequestHandler => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

export const validateSingerParams = (): any => {
  return [
    check("fullName")
      .notEmpty()
      .withMessage("Singer name is required")
      .isString()
      .withMessage("Singer name must be a string"),
    check("songId")
      .isNumeric()
      .withMessage("Song id is required")
      .notEmpty()
      .withMessage("Song id is required"),
    check("nacionality").isString().withMessage("Singer's nacionality must be a string"),
    (req, res, next): RequestHandler => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};