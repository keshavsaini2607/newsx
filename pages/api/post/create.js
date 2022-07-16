import { connectDB } from "../../../utils/db-connect";
import multer from "multer";
import { createRouter } from "next-connect";
import { errorHandler, responseHandler, validateFields } from "../../../utils/common";
import slugify from "slugify";
import Post from "../../../model/post";
import { STATIC_RESOURCE_URL } from "../../../client/config";
import { getSession } from 'next-auth/react'

export const config = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter();

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + "_" + file.originalname.trim());
    },
  }),
});

router.use(upload.single("image")).post(async (req, res) => {
  try {
    console.log("started ===============================>>");
    const session = await getSession({ req });
    console.log("session", session);
    if (!session) {
      console.log("no session <<==============================");
      return errorHandler("Access Denied!", 401);
    } else {
      await connectDB();
      validateFields(req.body)
      if(!req.file) {
        errorHandler('Please select an image', res);
        console.log('errir')
        return;
      }
      const userId = session.user.id;
      const slug = slugify(req.body.title, { remove: /[*+~.()'"!:@]/g });
      const fileUrl = STATIC_RESOURCE_URL + req.file.filename;
      console.log({ fileUrl });
      console.log({ slug });
      const post = new Post({
        ...req.body,
        slug: slug.toLocaleLowerCase(),
        image: fileUrl,
        user: userId,
      });

      const postResponse = await post.save();
      if (postResponse) {
        responseHandler(postResponse, res);
      } else {
        errorHandler(postResponse, res);
      }
    }
  } catch (error) {
    console.log("error", error);
    errorHandler(error, res);
  }
});

const handler = router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

export default handler;
