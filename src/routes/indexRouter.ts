import { format } from "date-fns";
import { Router } from "express";
import { getAllMessages, getMessageById, insertMessage } from "../db/queries.js";

const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
  const allMessages = await getAllMessages();
  res.render("index", { title: "Mini Message Board", messages: allMessages });
});

indexRouter.post("/new", async (req, res) => {
  const timestampFormat = "eee LLL dd yyyy HH:mm:ss OOOO";

  await insertMessage(req.body.messageUser, req.body.messageText, format(new Date(), timestampFormat));
  // Redirect to same page and end req-res cycle
  res.redirect("/");
});

indexRouter.get("/message/:id", async (req, res) => {
  try {
    const msg = await getMessageById(Number(req.params.id));
    console.log(msg[0]);
    if (msg) res.status(200).render("message", { message: msg[0] });
  } catch (err) {
    res.status(404).json(`Message with id ${req.params.id} not found`);
    throw (err);
  }
});

export default indexRouter;