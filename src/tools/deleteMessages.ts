import { Context } from "telegraf";
import state from "../data/botStates";
import Log from "./log";
import { getChatDataByTelegramUsername } from "./../services/getData/getChatData";
import { emptyMessagesToDelete } from "../services/updateData/setChatData";

export default async function deleteMessages(ctx: any) {
  try {
    await getChatDataByTelegramUsername(
      state.currentUser.telegramUserName
    ).then((value) => {
      if (value.length != 0) {
        value.data.messagesToDelete.map((value: number) => {
          ctx
            .deleteMessage(value)
            .catch((reason: any) =>
              reason.error_code == 400
                ? null
                : Log("Error", "no message to delete by that id")
            );
        });
      }
    });

    if (ctx.message) {
      ctx
        .deleteMessage()
        .catch((reason: any) =>
          reason.error_code == 400
            ? null
            : Log("Error", "no message to delete by that id")
        );
    }
    state.messagesToDelete = {};
    emptyMessagesToDelete(state.currentUser.telegramUserName);
  } catch (error: any) {
    Log("Error", "Data_error responce", error);
  }
}

export function deleteAllMessages(ctx: Context, lastMessage: number) {
  for (let i = lastMessage - 1; i > lastMessage - 1000; i--) {
    ctx.deleteMessage(i).catch((reason: any) => null);
  }
}
