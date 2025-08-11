import { Context } from "telegraf";
import Post from "../../clients/Post";
import log from "../../tools/log";
import { lead } from "../../clients/Interfaces";
import Log from "../../tools/log";

export default async function postLead(ctx: Context, data: lead) {
  try {
    const columnsArray: any = [];
    Object.keys(data).map((value) => {
      columnsArray.push(`${value}`);
    });
    const valuesArray: any = [];
    Object.values(data).map((value) => {
      valuesArray.push(`${value}`);
    });
    const res = await Post("leads", valuesArray, columnsArray).then((value) => {
      log("Success", "lead has been recorded successfully");
    });
  } catch (error: any) {
    if (error.code === `23505`)
      log(
        "Info",
        `User ${ctx.message?.from.username} has already been recorded as a lead`,
        error
      );
  }
}
