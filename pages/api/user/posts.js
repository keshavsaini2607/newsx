import { errorHandler, responseHandler } from "../../../utils/common";
import { connectDB } from "../../../utils/db-connect";
import Post from "../../../model/post";

export default async function handler(req, res) {
  try {
    await connectDB();
    const { id } = req.body;
    const posts = await Post.find({ user: id })
      .select("_id title image slug description createdAt")
      .exec();

      console.log({posts})

    if(posts) {
        responseHandler(posts, res);
    } else {
        errorHandler("Something went wrong", res);
    }
  } catch (error) {
    errorHandler(error, res);
  }
}
