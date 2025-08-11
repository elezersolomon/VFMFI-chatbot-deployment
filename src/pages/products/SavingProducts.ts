import { Context } from "telegraf";
import replyWithAButton from "../../components/replyWithAButton";
import listArrayAsButtons from "../../tools/listArrayAsButtons";
import deleteMessages from "../../tools/deleteMessages";
import state from "../../data/botStates";
import { addMessageToDelete } from "../../services/updateData/setChatData";
import getBotData from "../../services/getData/getBotData";
import escapifyJson from "../../tools/escapify";
import { currentLanguage, setCurrentLanguage } from "../../data/language";

export default async function savingProducts(bot: any) {
  bot.action("savingProducts", async (ctx: any, next: any) => {
    const fetchedSavingProducts: any = escapifyJson(
      await getBotData(
        "content",
        state.currentUser.preferredLanguage,
        "products"
      )
    );

    let savingProduct =
      currentLanguage.topMenu.information.options.ourProducts.options
        .savingProducts;
    const savingProducts = fetchedSavingProducts[savingProduct];
    ctx.answerCbQuery();
    await deleteMessages(ctx);
    let savingProductsList: Array<object> = [];
    Object.keys(savingProducts).map((key, index) => {
      savingProductsList.push({
        title: key,
        callbackData: `savingProduct_${index}`,
      });
    });

    let buttons = listArrayAsButtons(
      ctx,
      savingProductsList,
      1,
      "Choose Products Below",
      {
        back: "products",
        home: true,
      }
    );
  });
  bot.action(/savingProduct_.+/, async (ctx: any, next: any) => {
    ctx.answerCbQuery();
    await deleteMessages(ctx);
    const callback_data = ctx.update.callback_query.data.split("_");
    const product = callback_data[1];
    const fetchedSavingProducts: any = escapifyJson(
      await getBotData(
        "content",
        state.currentUser.preferredLanguage,
        "products"
      )
    );

    let savingProduct =
      currentLanguage.topMenu.information.options.ourProducts.options
        .savingProducts;
    const savingProducts = fetchedSavingProducts[savingProduct];
    Object.entries(savingProducts).map(([key, val], index) => {
      if (index == product) {
        const message = ctx.replyWithMarkdownV2(`*${key}*\n${val} `, {
          reply_markup: {
            inline_keyboard: [
              [
                { text: currentLanguage.back, callback_data: "savingProducts" },
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
