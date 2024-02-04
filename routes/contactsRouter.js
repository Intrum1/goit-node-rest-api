import express from "express";
import {
  listContactsAll,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  patchdateContact,
} from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  patchSchema,
} from "../schemas/contactsSchemas.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, listContactsAll);

contactsRouter.get("/:id", authenticate, getOneContact);

contactsRouter.delete("/:id", authenticate, isValidId, deleteContact);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(createContactSchema),
  createContact,
);

contactsRouter.put(
  "/:id",
  authenticate,
  validateBody(updateContactSchema),
  updateContact,
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  validateBody(patchSchema),
  patchdateContact,
);

export default contactsRouter;
