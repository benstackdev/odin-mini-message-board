import db from "./pool.js";
import type { Request, Response } from "express";

const getAllMessages = async () => {
  const { rows } = await db.query("select * from usernames");
  return rows;
};

const insertMessage = async (username: string, message: string, added: string) => {
  await db.query("insert into usernames (username, message, added) values ($1, $2, $3)", [username, message, added]);
};

const getMessageById = async (id: number) => {
  const { rows } = await db.query("select * from usernames where id = $1", [id]);

  return rows;
};

export {
  getAllMessages,
  insertMessage,
  getMessageById
};