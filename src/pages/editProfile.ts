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
import { getBranches } from "../services/getData/getBranches";
import listArrayAsButtons from "../tools/listArrayAsButtons";
import { currentLanguage } from "../data/language";
const editProfile = async (bot: Telegraf) => {
  let newUser: user = {
    telegramUserName: "",
    telegramID: 1,
    userFName: "",
    userLName: "",
    phoneNumber: 0,
    address: "",
    preferredBranch: "",
    isCustomer: false,
  };
  let pageContent: any;
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
  const productWizard = new Scenes.WizardScene(
    "editUser-Wizard",
    async (ctx) => {
      await deleteMessages(ctx);
      state.onScene.status = true;
      state.onScene.message = pageContent.errors.finishUpdating;
      if (await checkForCancelation(bot, ctx)) return ctx.scene.leave();
      if (ctx.update?.callback_query?.data == "update Account") {
        const message = await ctx.replyWithMarkdownV2(
          pageContent.fields.followTheStepsToUpdate
        );

        addMessageToDelete(
          state.currentUser.telegramUserName,
          message.message_id
        );
      }

      const message = await ctx.reply(pageContent.fields.firstName, {
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

      if (await validateInput(ctx, "name", ctx.message?.text)) {
        newUser.userFName = ctx.message?.text;

        const message = await ctx.reply(pageContent.fields.lastName, {
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

        return ctx.wizard.next();
      } else return;
    },

    async (ctx: any) => {
      if (await checkForCancelation(bot, ctx)) return ctx.scene.leave();

      if (await validateInput(ctx, "name", ctx.message?.text)) {
        newUser.userLName = ctx.message?.text;

        const message = await ctx.reply(pageContent.fields.phoneNumber, {
          reply_markup: {
            keyboard: [
              [
                { text: "📲 Share Contact", request_contact: true },
                { text: currentLanguage.cancel, callback_data: "cancel" },
              ],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
            // force_reply: true,
          },
        });
        addMessageToDelete(
          state.currentUser.telegramUserName,
          message.message_id
        );
      } else return;
      return await ctx.wizard.next();
    },
    async (ctx: any) => {
      if (await checkForCancelation(bot, ctx)) return ctx.scene.leave();
      if (
        await validateInput(
          ctx,
          "phoneNumber",
          ctx.message?.contact?.phone_number
        )
      ) {
        newUser.phoneNumber = Number(ctx.message?.contact?.phone_number);

        const message = await ctx.reply(pageContent.fields.address, {
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
      } else return;

      return await ctx.wizard.next();
    },
    async (ctx: any) => {
      state.onScene.message = "Please choose branch";
      if (await checkForCancelation(bot, ctx)) return ctx.scene.leave();
      const message = await listArrayAsButtons(
        ctx,
        branchArray1,
        3,
        pageContent.fields.branch
      );
      const message1 = await listArrayAsButtons(
        ctx,
        branchArray2,
        3,
        pageContent.fields.branch
      );
      const message3 = await listArrayAsButtons(
        ctx,
        branchArray3,
        3,
        pageContent.fields.branch,
        { home: true }
      );

      return await ctx.wizard.next();
    },
    async (ctx: any) => {
      await deleteMessages(ctx);
      if (await checkForCancelation(bot, ctx)) return ctx.scene.leave();
      newUser.address = ctx.message?.text;
      if (ctx.update?.callback_query?.data.startsWith("feedbackBranch_")) {
        const callback_data = ctx.update.callback_query.data.split("_");
        const branch = callback_data[1];
        newUser.preferredBranch = branch;
      }
      const message = ctx.reply(pageContent.fields.visionFundCustomer, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Yes", callback_data: "yes" },
              { text: "No", callback_data: "no" },
            ],
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
          pageContent.errors.visionFundCustomerError
        )
      ) {
        if (ctx.update?.callback_query?.data == "yes") {
          ctx.answerCbQuery();
          newUser.isCustomer = true;
        } else if (ctx.update?.callback_query?.data == "no") {
          ctx.answerCbQuery();
          newUser.isCustomer = false;
        }
        await UpdateUser(state.currentUser.telegramUserName, newUser);
      } else return;
      const message = await ctx.reply(pageContent.fields.accountUpdateSuccess);
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

  const stage = new Scenes.Stage([productWizard]);

  bot.use(stage.middleware());
  bot.action("editProfile", async (ctx: any, next) => {
    pageContent = currentLanguage.topMenu.myProfile.options.editProfileData;

    ctx.answerCbQuery();
    await deleteMessages(ctx);
    newUser.telegramUserName = ctx.update.callback_query.from.username;
    newUser.telegramID = ctx.update.callback_query.from.id;

    try {
      await ctx.scene.enter("editUser-Wizard");
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
    const message = await ctx.reply(
      currentLanguage.topMenu.myProfile.options.editProfileData.fields
        .accountEditCancelled
    );
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

export default editProfile;
