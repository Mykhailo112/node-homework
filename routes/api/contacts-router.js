import express from "express";

import contactsController from "../../controlers/contacts-controller.js";

import { isEmptyBody, isValidId } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import {
  contactAddSchema,
  contactUpdateSchema,
  contactUpdateFavoriteSchema,
} from "../../models/contacts.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getList);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsController.add
);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactsController.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateFavoriteSchema),
  contactsController.updateById
);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

export default contactsRouter;
