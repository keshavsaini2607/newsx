import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide user email it is required'],
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
}, {timestamps: true})

mongoose.models = {}

export default mongoose.model("User", userSchema);