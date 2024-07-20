import express from "express";
import cors from "cors";
import { blog, getCurrentTimeIST } from "./lib/utils";
import { ObjectId } from "mongodb";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Server is running :)");
});

app.get("/fetch-all-blogs", async (req, res) => {
  const blogs = await blog.find().toArray();
  console.log({ blogs });
  res.send(JSON.stringify(blogs));
});

app.get("/fetch-blog", async (req, res) => {
  console.log("query id: ", req.query.id);
  if (typeof req.query.id !== "string") return res.status(400);
  const id = new ObjectId(req.query.id);
  const requestedBlog = await blog.findOne({ _id: id });
  console.log(requestedBlog);
  res.send(JSON.stringify(requestedBlog));
});

app.post("/create-blogpost", async (req, res) => {
  console.log("inserting = ", req.body);
  try {
    const out = await blog.insertOne({
      title: req.body.title,
      description: req.body.description,
      dateTime: getCurrentTimeIST(),
      likes: 0,
    });
    console.log(out);
    res.send("OK");
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
});
