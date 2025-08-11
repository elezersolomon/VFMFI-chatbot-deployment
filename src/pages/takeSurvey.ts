import { Telegraf, Scenes, session, Context } from "telegraf";
import { user } from "../clients/Interfaces";
import {
  getAllUsers,
  getUserByTelegramUsername,
} from "../services/getData/getUsers";
import topMenu from "./topMenu";
import ReplyWithAButton from "../components/replyWithAButton";
import validateInput from "../tools/validateInput";
import state from "../data/botStates";
import postData from "../services/postData";
import deleteMessages, { deleteAllMessages } from "../tools/deleteMessages";
import Log from "../tools/log";
import { addMessageToDelete } from "../services/updateData/setChatData";
import UpdateUser from "../services/updateData/updateUserDetails";
const { Validator } = require("node-input-validator");
import { currentLanguage } from "../data/language";
// import { runIIFE } from ".."
const takeSurvey = (bot: Telegraf) => {
  const takeSurvey = new Scenes.WizardScene(
    "TakeSurvey-wizard",
    async (ctx) => {
      await deleteMessages(ctx);
      state.onScene.status = true;
      state.onScene.message = "Please finish the survey";
      if (await checkForCancelation(bot, ctx)) return ctx.scene.leave();
      if (ctx.update?.callback_query?.data == "update Account") {
        const message = await ctx.replyWithMarkdownV2(
          `there are 5 questions, Enter your answer to the following questions in the text box bellow\n
          `
        );
        await setTimeout(() => {
          ctx.deleteMessage(message.message_id);
          topMenu(bot, ctx);
        }, 2500);
      }

      const message = await ctx.reply("Enter your First Name", {
        reply_markup: {
          inline_keyboard: [
            [{ text: currentLanguage.cancel, callback_data: "cancel" }],
          ],
        },
      });

      addMessageToDelete(
        state.currentUser.telegramUserName,
        message.message_id
      );

      return await ctx.wizard.next();
    },

    async (ctx: any) => {
      await deleteMessages(ctx);
      if (await checkForCancelation(bot, ctx)) return ctx.scene.leave();

      if (
        await validateInput(
          ctx,
          "object",
          ctx.update.callback_query,
          "Click button that corresponds with your answer"
        )
      ) {
      } else return;
      const message = await ctx.reply(
        "Your account has been updated successfully"
      );
      addMessageToDelete(
        state.currentUser.telegramUserName,
        message.message_id
      );
      await setTimeout(async () => {
        topMenu(bot, ctx);
        ctx.scene.leave();
      }, 2500); // Deletes the message after 2.5 seconds
      state.onScene.status = false;
    }
  );

  const stage = new Scenes.Stage([takeSurvey]);

  bot.use(stage.middleware());
  bot.action("takeSurvey", async (ctx: any, next) => {
    ctx.answerCbQuery();
    await deleteMessages(ctx);
    try {
      await ctx.scene.enter("TakeSurvey-wizard");
    } catch (error: any) {
      Log("Error", "Couldn't enter product wizard", error);
    }
  });
};

async function checkForCancelation(bot: any, ctx: any) {
  if (
    ctx.update.callback_query?.data == "cancel" ||
    ctx.message?.text == "Cancel"
  ) {
    await deleteMessages(ctx);
    if (ctx.update.callback_query) ctx.answerCbQuery();
    const message = await ctx.reply("Survey Canceled");
    await addMessageToDelete(
      state.currentUser.telegramUserName,
      message.message_id
    );

    await setTimeout(async () => {
      await deleteMessages(ctx);
      topMenu(bot, ctx);
    }, 2500); // Deletes the message after 5 seconds

    state.onScene.status = false;
    return true;
  }
}

export default takeSurvey;
