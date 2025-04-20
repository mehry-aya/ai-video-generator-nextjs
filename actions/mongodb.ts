"use server";
import Video from "@/models/video";
// import Credit from "@/models/credit";
import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";

export const saveVideoToDatabase = async (data: any) => {
  try {
    await db();

    const user = await currentUser();
    const userEmail = user?.emailAddresses[0].emailAddress;
    const userName = user?.fullName;

   
    await new Video({
      ...data,
      userEmail,
      userName,
    }).save();

  } catch (err) {
    console.error(err);
  }
};

export const getUserVideosFromDatabase = async () => {
  try {
    await db();

    const user = await currentUser();
    const userEmail = user?.emailAddresses[0].emailAddress;

    const videos = await Video.find({ userEmail });
    console.log("videos = ", videos);

    return JSON.parse(JSON.stringify(videos));
  } catch (err) {
    console.error(err);
  }
};
