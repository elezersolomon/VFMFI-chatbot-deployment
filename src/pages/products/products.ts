import savingProducts from "./SavingProducts";
import loanProducts from "./loanProducts";
import state from "../../data/botStates";
import { Context } from "telegraf";
import deleteMessages, { deleteAllMessages } from "../../tools/deleteMessages";
import { addMessageToDelete } from "../../services/updateData/setChatData";
import { currentLanguage, setCurrentLanguage } from "../../data/language";

export default function products(bot: any) {
  bot.action("products", async (ctx: any, next: any) => {
    let pageContent = currentLanguage.topMenu.information.options.ourProducts;

    ctx.answerCbQuery();
    await deleteMessages(ctx);
    const message = await ctx.reply(pageContent.text, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: pageContent.options.savingProducts,
              callback_data: "savingProducts",
            },
          ],
          [
            {
              text: pageContent.options.loanProducts,
              callback_data: "loanProducts",
            },
          ],
          [{ text: currentLanguage.back, callback_data: "topmenu" }],
        ],
      },
    });
    addMessageToDelete(state.currentUser.telegramUserName, message.message_id);
  });
  savingProducts(bot);
  loanProducts(bot);
}
