import state from "../data/botStates";
import deleteMessages, { deleteAllMessages } from "../tools/deleteMessages";
import { addMessageToDelete } from "../services/updateData/setChatData";
import VideoGuides from "./VideoGuides";
import { currentLanguage, setCurrentLanguage } from "../data/language";

export default function resources(bot: any) {
  bot.action("resources", async (ctx: any, next: any) => {
    let pagecontent = currentLanguage.topMenu.resources;
    ctx.answerCbQuery();
    await deleteMessages(ctx);
    const message = await ctx.reply("choose Resources", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: pagecontent.options.videoGuides,
              callback_data: "videoGuides",
            },
          ],
          [{ text: pagecontent.options.Documents, callback_data: "documents" }],
          [{ text: currentLanguage.back, callback_data: "topmenu" }],
        ],
      },
    });
    addMessageToDelete(state.currentUser.telegramUserName, message.message_id);
  });
  VideoGuides(bot);
}
