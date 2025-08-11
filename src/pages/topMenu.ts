import { Context } from "telegraf";
import state from "../data/botStates";
import setCurrentUser from "../tools/setCurrentUser";
import Log from "../tools/log";
import { getUserByTelegramUsername } from "../services/getData/getUsers";
import deleteMessages, { deleteAllMessages } from "../tools/deleteMessages";
import { addMessageToDelete } from "../services/updateData/setChatData";
import getBotData from "../services/getData/getBotData";
import { getLeadByTelegramUsername } from "../services/getData/getLeads";
import { currentLanguage } from "../data/language";
const topMenu = async (bot: any, ctx: any) => {
  await deleteMessages(ctx);
  let pageContent = currentLanguage.topMenu;

  let survey = (await getBotData("content", "active", "Survey")) as Record<
    string,
    { link: string }
  >;

  let activeSurvey = Object.values(survey)[0];

  let userRegistered = await getUserByTelegramUsername(
    state.currentUser.telegramUserName
  ).catch((error) => {
    Log("Error", "unable to get user by userName:", error);
  });
  let userInLead = await getLeadByTelegramUsername(
    state.currentUser.telegramUserName
  ).catch((error) => {
    Log("Error", "unable to get user by userName:", error);
  });

  let text;
  let userAction;
  let topMenuOptions;
  let userActionCallbackData;

  if (userRegistered) {
    userAction = pageContent.myProfile.text;
    userActionCallbackData = "myProfile";
  } else {
    userAction = pageContent.register.text;
    userActionCallbackData = "register";
  }
  if (!userInLead || userInLead.language == null) {
    text = "please choose your preferred language";
    topMenuOptions = [
      [{ text: "English", callback_data: "lang_eng" }],
      [{ text: "Amharic", callback_data: "lang_Amh" }],
      [{ text: "Oromifa", callback_data: "lang_oro" }],
      [{ text: "Tigri", callback_data: "lang_tig" }],
      [{ text: "Somali", callback_data: "lang_som" }],
    ];
  } else {
    text = "i can help you with the following";
    topMenuOptions = [
      [
        {
          text: userAction,
          callback_data: userActionCallbackData,
        },
      ],
      [{ text: pageContent.information.label, callback_data: "info" }],
      [{ text: pageContent.resources.label, callback_data: "resources" }],
      [
        {
          text: pageContent.shareFeedback.label,
          callback_data: "shareFeedback",
        },
      ],
      [{ text: pageContent.takeSurvey, url: activeSurvey.link }], //  This opens a website
    ];
  }

  const message = await ctx.reply(pageContent.text, {
    reply_markup: {
      inline_keyboard: topMenuOptions,
    },

    parse_mode: "HTML",
  });
  addMessageToDelete(state.currentUser.telegramUserName, message.message_id);
};
export default topMenu;
