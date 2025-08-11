import { Telegraf, Scenes, session, Context } from "telegraf";
import { getUserByTelegramUsername } from "../services/getData/getUsers";
import topMenu from "./topMenu";
import validateInput from "../tools/validateInput";
import state from "../data/botStates";
import { feedback } from "../clients/Interfaces";
import { getLeadByTelegramUsername } from "../services/getData/getLeads";
import postFeedback from "../services/postData/postFeedback";
import deleteMessages, { deleteAllMessages } from "../tools/deleteMessages";
import Log from "../tools/log";
import { addMessageToDelete } from "../services/updateData/setChatData";
import { getBranches } from "../services/getData/getBranches";
import listArrayAsButtons from "../tools/listArrayAsButtons";
import {
  currentLanguage,
  languages,
  setCurrentLanguage,
} from "../data/language";

const shareFeedback = async (bot: Telegraf) => {
  let pageContent: any;
  let newFeedback: feedback = {
    telegramUserName: "",
    feedback: "",
    userID: 0,
    leadID: 0,
    toBranch: "",
  };
  let branches: any = [];

  (await getBranches()).map((value: any) => {
    branches.push({
      title: value.name,
      callbackData: `feedbackBranch_${value.name}`,
    });
  });
  const branchArray1 = branches.slice(0, 40).map((item: any) => item); // First 40
  const branchArray2 = branches.slice(40, 80).map((item: any) => item); // Next 40
  const branchArray3 = branches.slice(80, 120).map((item: any) => item); // Last 40
  branches.sort();

  const shareFeedbackWizard = new Scenes.WizardScene(
    "shareFeedback-wizard",

    async (ctx: any) => {
      state.onScene.message = "Please share feedback";
      if (await checkForCancelation(bot, ctx)) return ctx.scene.leave();
      if (ctx.update?.callback_query?.data == "shareFeedback") {
        const message = await ctx.reply(pageContent.text, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: pageContent.options.chooseBranch,
                  callback_data: "chooseBranch",
                },
              ],
              [{ text: currentLanguage.back, callback_data: "cancel" }],
            ],
          },
        });
        addMessageToDelete(
          state.currentUser.telegramUserName,
          message.message_id
        );
      }

      return await ctx.wizard.next();
    },
    async (ctx: any) => {
      state.onScene.status = true;
      state.onScene.message = "Please choose branch";
      if (await checkForCancelation(bot, ctx)) return ctx.scene.leave();
      if (ctx.update?.callback_query?.data == "chooseBranch") {
        const message = await listArrayAsButtons(
          ctx,
          branchArray1,
          3,
          "Choose which bank you want to give feedback to"
        );
        const message1 = await listArrayAsButtons(
          ctx,
          branchArray2,
          3,
          "Choose which bank you want to give feedback to"
        );
        const message3 = await listArrayAsButtons(
          ctx,
          branchArray3,
          3,
          "Choose which bank you want to give feedback to",
          { home: true }
        );
      }

      return await ctx.wizard.next();
    },

    async (ctx: any) => {
      await deleteMessages(ctx);
      if (await checkForCancelation(bot, ctx)) return ctx.scene.leave();

      if (ctx.update?.callback_query?.data.startsWith("feedbackBranch_")) {
        const callback_data = ctx.update.callback_query.data.split("_");
        const branch = callback_data[1];
        newFeedback.toBranch = branch;
        const message = await ctx.reply(
          "Please give us your comment or complaint on the text field bellow",
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: currentLanguage.back, callback_data: "cancel" }],
              ],
            },
          }
        );
        addMessageToDelete(
          state.currentUser.telegramUserName,
          message.message_id
        );
      } else if (await validateInput(ctx, "string", ctx.message?.text)) {
        newFeedback.feedback = ctx.message?.text;

        newFeedback.telegramUserName = state.currentUser.telegramUserName;
        await getUserByTelegramUsername(
          state.currentUser.telegramUserName
        ).then(
          (value: any) => {
            if (value.length != 0) newFeedback.userID = value.userID;
          },
          (error) => {
            Log("Error", "unable to get user by userName:", error);
          }
        );
        await getLeadByTelegramUsername(
          state.currentUser.telegramUserName
        ).then(
          (value: any) => {
            if (value.length != 0) newFeedback.leadID = value.leadID;
          },
          (error) => {
            Log("Error", "unable to get Lead by userName:", error);
          }
        );
        await postFeedback(ctx, newFeedback);
        const message = await ctx.reply("Thank you for your feedback");
        addMessageToDelete(
          state.currentUser.telegramUserName,
          message.message_id
        );
        state.onScene.status = false;
        setTimeout(async () => {
          await deleteMessages(ctx);
          topMenu(bot, ctx);
        }, 2500); // Deletes the message after 5 seconds

        return ctx.scene.leave();
      } else return;
    }
  );

  const stage = new Scenes.Stage([shareFeedbackWizard]);

  bot.use(stage.middleware());
  bot.action("shareFeedback", async (ctx: any, next) => {
    pageContent = currentLanguage.topMenu.shareFeedback;

    ctx.answerCbQuery();
    await deleteMessages(ctx);
    try {
      ctx.scene.enter("shareFeedback-wizard");
    } catch (error: any) {
      Log("Error", "unable to enter share feedback wizard:", error);
    }
  });
};

async function checkForCancelation(bot: any, ctx: any) {
  if (
    ctx.update.callback_query?.data == "cancel" ||
    ctx.message?.text == "Cancel"
  ) {
    if (ctx.update.callback_query) ctx.answerCbQuery();
    const message = await ctx.reply(
      currentLanguage.topMenu.shareFeedback.cancelText
    );
    // state.messagesToDelete.feedbackCanceled = message.message_id;
    // state.onScene.status = false;
    setTimeout(() => {
      ctx.deleteMessage(message.message_id);
      topMenu(bot, ctx);
    }, 2500);
    return true;
  }
}

export default shareFeedback;
