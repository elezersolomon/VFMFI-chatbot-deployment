import state from "../data/botStates";
import deleteMessages, { deleteAllMessages } from "../tools/deleteMessages";
import { addMessageToDelete } from "../services/updateData/setChatData";
import { currentLanguage } from "../data/language";
export default function changeLanguage(bot: any) {
  bot.action("changeLanguage", async (ctx: any, next: any) => {
    let pageContent = currentLanguage.topMenu.myProfile.options.changeLanguage;
    ctx.answerCbQuery();
    await deleteMessages(ctx);
    const message = await ctx.reply(pageContent.text, {
      reply_markup: {
        inline_keyboard: [
          [{ text: pageContent.languages.English, callback_data: "lang_eng" }],
          [{ text: pageContent.languages.Amharic, callback_data: "lang_amh" }],
          [{ text: pageContent.languages.Oromifa, callback_data: "lang_oro" }],
          [{ text: pageContent.languages.Tigri, callback_data: "lang_tig" }],
          [{ text: pageContent.languages.Somali, callback_data: "lang_som" }],
        ],
      },
    });
    addMessageToDelete(state.currentUser.telegramUserName, message.message_id);
  });
}
