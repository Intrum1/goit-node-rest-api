import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";

const app = express();

//MIDDLEWARES ----------------------------
const tiny = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(tiny));
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
