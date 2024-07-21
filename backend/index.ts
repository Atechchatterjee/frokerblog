import express, { request } from "express";
import cors from "cors";
import { blog, getCurrentTimeIST } from "./lib/utils";
import { ObjectId } from "mongodb";

require("dotenv").config();

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

app.post("/update-likes", async (req, res) => {
  const likes = req.body.likes;
  console.log("query id: ", req.query.id, " likes ", likes);
  if (typeof req.query.id !== "string" || !likes) return res.status(400);
  const id = new ObjectId(req.query.id);
  try {
    const updatedBlog = await blog.updateOne(
      { _id: id },
      { $set: { likes: likes } }
    );
    res.send(JSON.stringify(updatedBlog));
  } catch (err) {
    console.error(err);
    return res.status(400);
  }
});

// it will always fetch the first three blog (for the pinned blog) regardless of page no.
app.get("/fetch-all-blogs", async (req, res) => {
  const {
    page: queryPage,
    size: querySize,
    pinned: queryPinned,
  }: any = req.query;

  if (!queryPage || !querySize || !queryPinned) res.status(400);

  console.log({ page: queryPage, size: querySize, pinned: queryPinned });

  const page: number = parseInt(queryPage),
    size: number = parseInt(querySize),
    pinned: number = parseInt(queryPinned);

  if (page === 1) {
    const limit: number = pinned + size;
    try {
      const blogs = await blog.find().limit(limit).toArray();
      console.log({ blogs });
      res.send(JSON.stringify(blogs));
    } catch (err) {
      console.error(err);
      res.status(400);
    }
  } else {
    const skip: number = (page - 1) * size + pinned;
    try {
      const blogs = await blog.find().skip(skip).limit(size).toArray();
      console.log({ blogs });
      res.send(JSON.stringify(blogs));
    } catch (err) {
      console.error(err);
      res.status(400);
    }
  }
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
      ...req.body,
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
