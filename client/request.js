import axios from "axios"
import {BASE_URL} from './config'
import {getValue} from '../utils/common'

export const createUser = async(payload) => {
    try {
        const res = await axios.post(BASE_URL + `signup`, payload);
        return res.data;
    } catch (error) {
        return getValue(error, ["response", "data"]);
    }
}

export const createPost = async(formData) => {
    try {
        const res = await axios.post(BASE_URL + `post/create`, formData);
        return res.data;
    } catch (error) {
        return getValue(error, ["response", "data"]);
    }
}

export const getAllPosts = async() => {
    try {
        const res = await axios.get(BASE_URL + `post`);
        return res.data;
    } catch (error) {
        return getValue(error, ["response", "data"]);
    }
}

export const getSinglePost = async(id) => {
    try {
        const res = await axios.get(BASE_URL + `post/${id}`);
        return res.data;
    } catch (error) {
        return getValue(error, ["response", "data"]);
    }
}

export const getUserPosts = async(payload) => {
    try {
        const res = await axios.post(BASE_URL + `user/posts`, payload);
        return res.data;
    } catch (error) {
        return getValue(error, ["response", "data"]);
    }
}