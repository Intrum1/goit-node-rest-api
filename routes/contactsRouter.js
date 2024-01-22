import express from "express";
import {
  listContactsAll,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const contacts = await listContactsAll();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", updateContact);

export default contactsRouter;
