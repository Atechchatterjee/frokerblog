import { MongoClient } from "mongodb";

require("dotenv").config();

export const mongoClient = new MongoClient(process.env.MONGO_URI ?? "");

export const database = mongoClient.db("frokerblog");
export const blog = database.collection("blog");

export function getCurrentTimeIST() {
  const date = new Date();
  let normalizedDateTime = new Date(
    date.getTime() +
      (date.getTimezoneOffset() == 0 ? 0 : -1 * date.getTimezoneOffset()) *
        60000
  );
  return new Date(
    normalizedDateTime.toLocaleString("en-US", { timeZone: "Asia/Calcutta" })
  );
}
