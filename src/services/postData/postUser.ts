import { Context } from "telegraf";
import Post from "../../clients/Post";
import log from "../../tools/log";
import { user } from "../../clients/Interfaces";
import Log from "../../tools/log";

export default async function postUser(ctx: Context, data: user) {
  try {
    const columnsArray: any = [];
    Object.keys(data).map((value) => {
      columnsArray.push(`${value}`);
    });
    const valuesArray: any = [];
    Object.values(data).map((value) => {
      valuesArray.push(`${value}`);
    });
    const res = await Post("users", valuesArray, columnsArray).then((value) => {
      log("Success", "User has been successfuly registered");
    });
  } catch (error: any) {
    if (error.code === `23505`)
      Log("Info", `User ${ctx.message?.from.username} has already registered`);
    else Log("Error", "Unable to Post user", error);
  }
}
