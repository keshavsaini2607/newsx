import Post from "../../../model/post";
import { errorHandler, responseHandler } from "../../../utils/common";
import { connectDB } from "../../../utils/db-connect";

export default async function handler(req, res) {
  try {
    await connectDB();
    const { id } = req.query;
    const response = await Post.findOne({ _id: id })
      .select("_id title image slug description user createdAt")
      .populate("user", "_id fullName")
      .exec();

    if (response) {
      responseHandler(response, res);
    } else {
      errorHandler("Something went wrong", res, 404);
    }
  } catch (error) {
    errorHandler(error, res);
  }
}
