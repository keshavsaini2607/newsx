import User from "../../../model/user";
import {
  errorHandler,
  responseHandler,
  validateFields,
} from "../../../utils/common";
import { connectDB } from "../../../utils/db-connect";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    errorHandler(
      `Req method = ${req.method} not allowed on this request`,
      res,
      400
    );
  }

  try {
    validateFields(req.body);

    await connectDB();

    const user = new User(req.body);
    const saveUser = await user.save();

    if (saveUser) {
      responseHandler(saveUser, res, 201);
    } else {
      errorHandler("Something went wrong", res);
    }
  } catch (error) {
    errorHandler(error, res);
  }
}
