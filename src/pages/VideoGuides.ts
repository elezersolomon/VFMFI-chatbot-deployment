import listArrayAsButtons from "../tools/listArrayAsButtons";
import { getFAQS, getFAQByID } from "../services/getData/getFAQs";
import deleteMessages, { deleteAllMessages } from "../tools/deleteMessages";
import state from "../data/botStates";
import { addMessageToDelete } from "../services/updateData/setChatData";
import getBotData from "../services/getData/getBotData";
import escapifyJson from "../tools/escapify";
import { Context } from "telegraf";
import fetchFile from "../services/getData/fetchFile";
import { currentLanguage, setCurrentLanguage } from "../data/language";

export default async function videoGuides(bot: any) {
  let FAQList: Array<Object> = [];
  await bot.action("videoGuides", async (ctx: Context, next: any) => {
    ctx.answerCbQuery();
    await deleteMessages(ctx);
    const englishUSSdVideoGuide = await fetchFile("englishUSSdVideoGuide");
    const amharicUSSdVideoGuide = await fetchFile("amharicUSSdVideoGuide");
    ctx.replyWithVideo(
      { source: englishUSSdVideoGuide?.data },
      {
        caption: englishUSSdVideoGuide?.descripton,
      }
    );
    ctx.replyWithVideo(
      { source: amharicUSSdVideoGuide?.data },
      {
        caption: amharicUSSdVideoGuide?.descripton,
        reply_markup: {
          inline_keyboard: [
            [{ text: currentLanguage.back, callback_data: "resources" }],
          ],
        },
      }
    );
  });
}
