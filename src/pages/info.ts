import state from "../data/botStates";
import deleteMessages, { deleteAllMessages } from "../tools/deleteMessages";
import { addMessageToDelete } from "../services/updateData/setChatData";
import aboutUs from "./aboutUs";
import contactUs from "./contactUs";
import FAQ from "./FAQ";
import products from "./products/products";
import { currentLanguage, setCurrentLanguage } from "../data/language";

export default function info(bot: any) {
  bot.action("info", async (ctx: any, next: any) => {
    let pageContent = currentLanguage.topMenu.information;
    ctx.answerCbQuery();
    await deleteMessages(ctx);
    const message = await ctx.reply(pageContent.text, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: pageContent.options.ourProducts.label,
              callback_data: "products",
            },
          ],
          [{ text: pageContent.options.FAQs, callback_data: "FAQ" }],
          [{ text: pageContent.options.aboutUs, callback_data: "aboutUs" }],
          [
            {
              text: pageContent.options.contactUs.label,
              callback_data: "contactUS",
            },
          ],
          [{ text: currentLanguage.back, callback_data: "topmenu" }],
        ],
      },
    });
    addMessageToDelete(state.currentUser.telegramUserName, message.message_id);
  });
  aboutUs(bot);
  contactUs(bot);
  FAQ(bot);
  products(bot);
}
