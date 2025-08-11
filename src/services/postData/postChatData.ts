import { Context } from "telegraf";
import Post from "../../clients/Post";
import log from "../../tools/log";
import { chatData } from "../../clients/Interfaces";
import Log from "../../tools/log";

export default async function postChatData(ctx: Context, data: chatData) {
  try {
    const columnsArray: any = [];
    Object.keys(data).map((value) => {
      columnsArray.push(`${value}`);
    });
    const valuesArray: any = [];
    Object.values(data).map((value) => {
      if (typeof value == "object") {
        valuesArray.push(JSON.stringify(value));
        return;
      }
      valuesArray.push(`${value}`);
    });
    const res = await Post("chatData", valuesArray, columnsArray).then(
      (value) => {
        log("Success", "chatData has been created successfuly");
      }
    );
  } catch (error: any) {
    if (error.code === `23505`)
      Log("Info", `User ${ctx.message?.from.username} has already registered`);
    else Log("Error", "Unable to Post user", error);
  }
}
