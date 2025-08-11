import listArrayAsButtons from "../../tools/listArrayAsButtons";
import deleteMessages from "../../tools/deleteMessages";
import state from "../../data/botStates";
import { addMessageToDelete } from "../../services/updateData/setChatData";
import getBotData from "../../services/getData/getBotData";
import escapifyJson from "../../tools/escapify";
import { currentLanguage, setCurrentLanguage } from "../../data/language";

export default async function loanProducts(bot: any) {
  bot.action("loanProducts", async (ctx: any, next: any) => {
    const fetchedLoanProducts: any = escapifyJson(
      await getBotData(
        "content",
        state.currentUser.preferredLanguage,
        "products"
      )
    );

    let loanProduct =
      currentLanguage.topMenu.information.options.ourProducts.options
        .loanProducts;
    const loanProducts = fetchedLoanProducts[loanProduct];
    ctx.answerCbQuery();
    await deleteMessages(ctx);
    let loanProductsList: Array<object> = [];

    Object.keys(loanProducts).map((key, index) => {
      loanProductsList.push({
        title: key,
        callbackData: `loanProduct_${index}`,
      });
    });

    listArrayAsButtons(ctx, loanProductsList, 2, "Choose Products Below", {
      back: "products",
      home: true,
    });
  });

  bot.action(/loanProduct_.+/, async (ctx: any) => {
    ctx.answerCbQuery();
    await deleteMessages(ctx);
    const callback_data = ctx.update.callback_query.data.split("_");
    const product = callback_data[1];

    const fetchedLoanProducts: any = escapifyJson(
      await getBotData(
        "content",
        state.currentUser.preferredLanguage,
        "products"
      )
    );

    let loanProduct =
      currentLanguage.topMenu.information.options.ourProducts.options
        .loanProducts;
    const loanProducts = fetchedLoanProducts[loanProduct];
    Object.entries(loanProducts).find(([key, val], index) => {
      if (index == product) {
        const message = ctx.replyWithMarkdownV2(`*${key}*\n${val} `, {
          reply_markup: {
            inline_keyboard: [
              [
                { text: currentLanguage.back, callback_data: "loanProducts" },
                { text: currentLanguage.home, callback_data: "topmenu" },
              ],
            ],
          },
        });
        addMessageToDelete(
          state.currentUser.telegramUserName,
          message.message_id
        );
        return;
      }
    });
  });
}
