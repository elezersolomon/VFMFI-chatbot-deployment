import { Context, Telegraf } from "telegraf";

const ReplyWithAButton = async function (
  bot: Telegraf<Context>,
  ctx: Context,
  text: string,
  buttonText: string,
  callback: string
) {
  const message = ctx.reply(text, {
    reply_markup: {
      inline_keyboard: [[{ text: buttonText, callback_data: callback }]],
    },
  });
};

export default ReplyWithAButton;
