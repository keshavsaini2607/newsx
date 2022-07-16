import User from "../../../model/user";
import {
  errorHandler,
  getValue,
  responseHandler,
  validateFields,
} from "../../../utils/common";
import { connectDB } from "../../../utils/db-connect";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    errorHandler(
      `Req method = ${req.method} not allowed on this request`,
      res,
      400
    );

    return;
  }

  try {
    validateFields(req.body);

    await connectDB();
    const hashedPass = await bcrypt.hash(req.body.password, 8);
    const user = new User({
      ...req.body,
      password: hashedPass
    });
    const saveUser = await user.save();

    if (saveUser) {
      const userDoc = saveUser._doc;
      delete userDoc.password;
      responseHandler(userDoc, res, 201);
    } else {
      errorHandler("Something went wrong", res);
    }
  } catch (error) {
    errorHandler(error, res);
  }
}
