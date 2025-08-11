import { Telegraf, Context, session } from "telegraf";
import * as dotenv from "dotenv";
import welcomeMessage from "./pages/welcomeMessage";
import postData from "./services/postData";
import state from "./data/botStates";
import topMenu from "./pages/topMenu";
import deleteMessages, { deleteAllMessages } from "./tools/deleteMessages";
import { addMessageToDelete } from "./services/updateData/setChatData";
import Log from "./tools/log";
import registerUser from "./pages/registerUser";
import shareFeedback from "./pages/shareFeedback";
import postChatData from "./services/postData/postChatData";
import { chatData } from "./clients/Interfaces";
import info from "./pages/info";
import resources from "./pages/resources";
import myProfile from "./pages/myProfile";
import takeSurvey from "./pages/takeSurvey";
import setLanguage from "./services/postData/setLanguage";
import { currentLanguage, setCurrentLanguage } from "./data/language";

dotenv.config();

if (!process.env.ChatBot_Token) {
  throw new Error("ENVIRONMENT VARIABLE NOT FOUND: ChatBot");
}

const bot = new Telegraf(process.env.ChatBot_Token);
bot.use(session());

bot.use(async (ctx: any, next) => {
  if (ctx.message) {
    await deleteMessages(ctx);
    if (!state.onScene.status && ctx.message.text != "/start") {
      const message = await ctx.reply("Invalid Input", {
        reply_markup: {
          inline_keyboard: [
            [{ text: currentLanguage.home, callback_data: "topmenu" }],
          ],
        },
      });

      addMessageToDelete(
        state.currentUser.telegramUserName,
        message.message_id
      );
    }
  } else {
    let userName: any;
    let messageID: any;
    let telegramID: any;
    if (ctx.update?.callback_query) {
      messageID = ctx.update.callback_query.message.message_id;
      userName = ctx.update.callback_query.from.username;
      telegramID = ctx.update.callback_query.from.id;
    } else {
      userName = null;
      messageID = null;
    }

    addMessageToDelete(userName, messageID).then((value) => {
      if (value != undefined && value == 0) {
        let chatData: chatData = {
          telegramUserName: userName,
          telegramID: telegramID,
          data: {
            messagesToDelete: [messageID],
          },
        };
        postChatData(ctx, chatData);
      }
    });
  }

  return next();
});
bot.start(async (ctx: any) => {
  if (state.onScene.status) {
    if (state.onScene.message) {
      const message = await ctx.reply(state.onScene.message, {
        reply_markup: {
          inline_keyboard: [
            [{ text: currentLanguage.back, callback_data: "topmenu" }],
          ],
        },
      });
      addMessageToDelete(
        state.currentUser.telegramUserName,
        message.message_id
      );
    }

    return;
  }
  await postData.postLeads(ctx, state.currentUser);

  await welcomeMessage(bot, ctx);
  await deleteAllMessages(ctx, ctx.update.message.message_id);
});

registerUser(bot);
myProfile(bot);
shareFeedback(bot);
info(bot);
resources(bot);
takeSurvey(bot);

bot.action("topmenu", async (ctx: any) => {
  ctx.answerCbQuery();
  state.onScene.status = false;
  await deleteMessages(ctx);
  welcomeMessage(bot, ctx);
});
bot.action(/lang_.+/, async (ctx: any) => {
  await deleteMessages(ctx);
  const callback_data = ctx.update.callback_query.data.split("_");
  const language = callback_data[1];
  setCurrentLanguage(language);
  await setLanguage(language, ctx);
  const message = await ctx.reply(currentLanguage.languageChangeText);

  await addMessageToDelete(
    state.currentUser.telegramUserName,
    message.message_id
  );
  await setTimeout(async () => {
    await deleteMessages(ctx);
    await welcomeMessage(bot, ctx);
  }, 3000);

  state.onScene.status = false;
});

bot.catch((error: any, ctx) => {
  Log("Error", "Error for ${ctx.updateType}", error);
  if (error.code === "ETIMEDOUT") {
    Log(
      "Error",
      "Connection timed out. Please check your network connection and try again.",
      error
    );
  } else {
    console.error("An error occurred:", error.message, true);
  }
});

async function launchBotWithRetry(
  retries: number = 86400,
  delay: number = 30000
) {
  let attempt = 0;
  while (attempt < retries) {
    try {
      Log("Info", `Launching bot (Attempt ${attempt + 1}/${retries})`);
      await bot.launch();
      Log("Info", "Bot launched successfully");
      return;
    } catch (error: any) {
      Log("Error", `Launch attempt ${attempt + 1} failed`, error);

      if (attempt + 1 === retries) {
        Log("Error", "Max retries reached. Exiting process.", error);
        process.exit(1);
      } else {
        Log("Info", `Retrying launch in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        attempt++;
      }
    }
  }
}

// Launch bot with retry logic
launchBotWithRetry();

process.on("unhandledRejection", (reason: any) => {
  Log("Error", "Unhandled Rejection:", reason);
  // process.exit(1);
});

process.on("uncaughtException", (error) => {
  Log("Error", "Uncaught Exception:", error);
  // process.exit(1);
});

process.once("SIGINT", () => {
  Log("Info", "Bot stopped via SIGINT");
  bot.stop("SIGINT");
  process.exit();
});

process.once("SIGTERM", () => {
  Log("Info", "Bot stopped via SIGTERM");
  bot.stop("SIGTERM");
  process.exit();
});
