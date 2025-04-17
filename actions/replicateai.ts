"use server";
import Replicate from "replicate";
import { v2 as cloudinary } from "cloudinary";
import { nanoid} from "nanoid";
import fetch from "node-fetch";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY,// Your Replicate API key

});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});