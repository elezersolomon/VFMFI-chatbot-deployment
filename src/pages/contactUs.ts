import { Telegraf } from "telegraf";
import deleteMessages from "../tools/deleteMessages";
import state from "../data/botStates";
import { addMessageToDelete } from "../services/updateData/setChatData";
import getBotData from "../services/getData/getBotData";
import escapifyJson from "../tools/escapify";
import { currentLanguage, setCurrentLanguage } from "../data/language";

export default function contactUs(bot: Telegraf) {
  bot.action("contactUS", async (ctx: any, next) => {
    ctx.answerCbQuery();
    const contactUsInfo = escapifyJson(
      await getBotData("content", "", "Contact Us")
    );

    deleteMessages(ctx);
    const message = await ctx.replyWithMarkdownV2(`*Our Contacts*`);
    const phoneNumber = contactUsInfo?.phoneNumber;
    const firstName = "Phone Number";
    const phoneContactSent = await ctx.replyWithContact(phoneNumber, firstName);
    const telegramChannel = await ctx.replyWithMarkdownV2(
      `*Telegram Channel*: \n${contactUsInfo.telegramChannel}`
    );
    const EmailMessage = `*Email*: \n${contactUsInfo.email}`;
    const emailAdress = await ctx.replyWithMarkdownV2(EmailMessage);

    const locationMessage = await ctx.replyWithMarkdownV2(
      `*Head Quarter*:  Gerji Mebrat Hail\\.\n\n`
    );

    const latitude = 9.00462086383613;
    const longitude = 38.81111902679014;
    const location = ctx.replyWithLocation(latitude, longitude, {
      reply_markup: {
        inline_keyboard: [
          [{ text: currentLanguage.back, callback_data: "info" }],
        ],
      },
    });

    let messagesToDelete = [
      message.message_id,
      telegramChannel.message_id,
      emailAdress.message_id,
      phoneContactSent.message_id,
      locationMessage.message_id,
      location.message_id,
    ];

    messagesToDelete.map((messageID) => {
      addMessageToDelete(state.currentUser.telegramUserName, messageID);
    });
  });
}
