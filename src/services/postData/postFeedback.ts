import { Context } from "telegraf";
import Post from "../../clients/Post";
import Log from "../../tools/log";
import { feedback } from "../../clients/Interfaces";

export default async function postFeedback(ctx: Context, data: feedback) {
  try {
    const columnsArray: any = [];
    Object.keys(data).map((value) => {
      columnsArray.push(`${value}`);
    });
    const valuesArray: any = [];
    Object.values(data).map((value) => {
      valuesArray.push(`${value}`);
    });
    const res = await Post("feedbacks", valuesArray, columnsArray).then(
      (value) => {
        Log("Success", "feedback has been posted successfully");
      }
    );
  } catch (error: any) {
    if (error.code === `23505`) Log("Info", `Post feedback error`, error);
  }
}
