import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";

const app = express();

//MIDDLEWARES ----------------------------

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

//Controlers

// const contactsPath = "/api/v1";
app.use("/api/contacts", contactsRouter);

//global custom middleware

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running. Use our API on port ${port}`);
});
