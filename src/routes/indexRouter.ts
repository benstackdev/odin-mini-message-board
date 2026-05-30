import { format } from "date-fns";
import { Router } from "express";

type Message = {
  id: string,
  text: string,
  user: string,
  added: string;
};

const messages: Message[] = [
  {
    id: crypto.randomUUID(),
    text: "Hi there!",
    user: "Amando",
    added: format(new Date(), "HH:mm:ss")
  },
  {
    id: crypto.randomUUID(),
    text: "Hello World!",
    user: "Charles",
    added: format(new Date(), "HH:mm:ss")
  }
];

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Message Board", messages: messages });
});

indexRouter.post("/new", (req, res) => {
  messages.push({
    id: crypto.randomUUID(),
    text: req.body.messageText,
    user: req.body.messageUser,
    added: format(new Date(), "HH:mm:ss")
  });
  // Redirect to same page and end req-res cycle
  res.redirect("/");
});

indexRouter.get("/message/:id", (req, res) => {
  try {
    const msg = messages.find((message) => message.id === req.params.id);
    if (msg) res.status(200).render("message", { message: msg });
  } catch (err) {
    res.status(404).json(`Message with id ${req.params.id} not found`);
    throw (err);
  }
});

export default indexRouter;