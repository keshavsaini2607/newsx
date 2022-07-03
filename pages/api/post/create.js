import { connectDB } from "../../../utils/db-connect";


export default async function handler(req, res) {
    if(req.method !== "POST") {
        res.status(400).json({message: "Invalid req type"});
    }

    await connectDB();

    const { name } = req.body;
    res.status(200).json({savedName: name});
}