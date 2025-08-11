import { Context } from "telegraf";
import topMenu from "./topMenu";
import state from "../data/botStates";
import { getAllUsers } from "../services/getData/getUsers";
import { getLeadByTelegramUsername } from "../services/getData/getLeads";
import setCurrentUser from "../tools/setCurrentUser";
import deleteMessages, { deleteAllMessages } from "../tools/deleteMessages";
import fetchFile from "../services/getData/fetchFile";
import { currentLanguage } from "../data/language";
import Log from "../tools/log";
import { setCurrentLanguage } from "../data/language";

const welcomeMessage = async (bot: any, ctx: Context) => {
  await deleteMessages(ctx);
  setCurrentUser(ctx);
  const file = await fetchFile("VFMFILogo");
  await getLeadByTelegramUsername(state.currentUser.telegramUserName).then(
    async (value: any) => {
      state.currentUser.preferredLanguage = value.language;
      await setCurrentLanguage(value.language);
    },
    (error) => {
      Log("Error", "unable to get Lead by userName:", error);
    }
  );

  const username =
    state.currentUser.userFName != undefined
      ? state.currentUser.userFName
      : state.currentUser.telegramUserName;

  let value: string = currentLanguage.welcomeMessage;
  for (const [key, val] of Object.entries({ username })) {
    value = value.replace(new RegExp(`{{${key}}}`, "g"), val);
  }

  const message = await ctx.replyWithPhoto(
    { source: file?.data },
    { caption: value }
  );
  deleteAllMessages(ctx, message.message_id);

  await topMenu(bot, ctx);
  return ctx;
};

export default welcomeMessage;
