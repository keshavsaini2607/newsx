import { connectDB } from "../../../utils/db-connect";
import Post from "../../../model/post";
import { errorHandler, responseHandler } from "../../../utils/common";

export default async function handler(req, res) {
  try {
    await connectDB();
    const posts = await Post.find({})
      .select("_id title slug image createdAt")
      .exec();
    if (posts) {
      responseHandler(posts, res);
    } else {
      errorHandler("Something went wrong!", res);
    }
  } catch (error) {
    errorHandler(error, res);
  }
}
