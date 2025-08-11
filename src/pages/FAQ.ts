import listArrayAsButtons from "../tools/listArrayAsButtons";
import { getFAQS, getFAQByID } from "../services/getData/getFAQs";
import deleteMessages, { deleteAllMessages } from "../tools/deleteMessages";
import state from "../data/botStates";
import { addMessageToDelete } from "../services/updateData/setChatData";
import getBotData from "../services/getData/getBotData";
import escapifyJson from "../tools/escapify";
import {
  currentLanguage,
  languages,
  setCurrentLanguage,
} from "../data/language";

export default async function FAQ(bot: any) {
  let FAQList: Array<Object> = [];
  await bot.action("FAQ", async (ctx: any, next: any) => {
    const currentLanguageFAQ = escapifyJson(
      await getBotData("content", "languages", "FAQs")
    );
    const FAQs = currentLanguageFAQ[state.currentUser.preferredLanguage];

    ctx.answerCbQuery();
    await deleteMessages(ctx);
    Object.keys(FAQs).map((key: any, index: number) => {
      FAQList.push({ title: key, callbackData: `FAQ_${index}` });
    });
    listArrayAsButtons(ctx, FAQList, 1, "Choose FAQ", {
      back: "info",
    });
    FAQList = [];
  });

  bot.action(/FAQ_.+/, async (ctx: any, next: any) => {
    await deleteMessages(ctx);
    const callback_data = ctx.update.callback_query.data.split("_");
    const FAQID = callback_data[1];
    const currentLanguageFAQ = escapifyJson(
      await getBotData("content", "languages", "FAQs")
    );
    const FAQs = currentLanguageFAQ[state.currentUser.preferredLanguage];
    Object.entries(FAQs).map(([key, value], index) => {
      if (index == FAQID) {
        const message = ctx.replyWithMarkdownV2(`*${key}*\n${value}`, {
          reply_markup: {
            inline_keyboard: [
              [{ text: currentLanguage.back, callback_data: "FAQ" }],
            ],
          },
        });
        addMessageToDelete(
          state.currentUser.telegramUserName,
          message.message_id
        );
        return;
      }

      return;
    });
  });
}
