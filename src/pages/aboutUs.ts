import { Telegraf, Scenes, session, Context } from "telegraf";
import ReplyWithAButton from "../components/replyWithAButton";
import topMenu from "./topMenu";
import deleteMessages, { deleteAllMessages } from "../tools/deleteMessages";
import state from "../data/botStates";
import { addMessageToDelete } from "../services/updateData/setChatData";
import getBotData from "../services/getData/getBotData";
import escapifyJson from "../tools/escapify";
import { currentLanguage, setCurrentLanguage } from "../data/language";

export default function aboutUs(bot: Telegraf) {
  bot.action("aboutUs", async (ctx: any) => {
    ctx.answerCbQuery();
    await deleteMessages(ctx);
    let fetchaboutUs = await getBotData(
      "content",
      state.currentUser.preferredLanguage,
      "About Us"
    );
    let language = state.currentUser.preferredLanguage;
    function formatContent(obj: object) {
      let result = "";
      for (const [key, value] of Object.entries(obj)) {
        result += `*${key}*\n${value}\n\n`;
      }
      return result;
    }
    fetchaboutUs = formatContent(fetchaboutUs);

    fetchaboutUs = escapifyJson(fetchaboutUs);

    const aboutUsText = fetchaboutUs;
    const message = await ctx.replyWithMarkdownV2(aboutUsText, {
      reply_markup: {
        inline_keyboard: [
          [{ text: currentLanguage.back, callback_data: "info" }],
        ],
      },
    });
    addMessageToDelete(state.currentUsertelegramUserName, message.message_id);
  });
}
