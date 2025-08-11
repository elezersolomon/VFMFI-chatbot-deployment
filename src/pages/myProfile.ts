import state from "../data/botStates";
import deleteMessages, { deleteAllMessages } from "../tools/deleteMessages";
import { addMessageToDelete } from "../services/updateData/setChatData";
import editProfile from "./editProfile";
import changeLanguage from "./chooseLanguage";
import { currentLanguage } from "../data/language";

export default function myProfile(bot: any) {
  bot.action("myProfile", async (ctx: any, next: any) => {
    let pageContent = currentLanguage.topMenu.myProfile;
    ctx.answerCbQuery();
    await deleteMessages(ctx);
    const message = await ctx.reply(pageContent.text, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: pageContent.options.editProfileData.label,
              callback_data: "editProfile",
            },
          ],
          [
            {
              text: pageContent.options.changeLanguage.label,
              callback_data: "changeLanguage",
            },
          ],
          [{ text: currentLanguage.back, callback_data: "topmenu" }],
        ],
      },
    });
    addMessageToDelete(state.currentUser.telegramUserName, message.message_id);
  });
  editProfile(bot);
  changeLanguage(bot);
}
