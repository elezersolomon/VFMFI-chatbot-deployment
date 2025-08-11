type inpuType =
  | "string"
  | "photo"
  | "phoneNumber"
  | "number"
  | "object"
  | "name";
import { isValidNumber } from "libphonenumber-js";
import state from "../data/botStates";
import { addMessageToDelete } from "../services/updateData/setChatData";
import { currentLanguage } from "../data/language";
export default async function validateInput(
  ctx: any,
  inputType: inpuType,
  input: any,
  customMessage?: string
) {
  if (input == null) {
    const message = await ctx.reply(`Please enter a ${inputType} format`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: currentLanguage.cancel, callback_data: "cancel" }],
        ],
      },
    });
    addMessageToDelete(state.currentUser.telegramUserName, message.message_id);
    return false;
  } else if (input == undefined) {
    await ctx.reply(`Please enter a ${inputType} format`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: currentLanguage.cancel, callback_data: "cancel" }],
        ],
      },
    });
    return false;
  } else if (inputType == "phoneNumber") {
    if (isValidNumber(input, "ET")) {
      return true;
    } else if (isValidNumber(input)) {
      ctx.reply("please Enter PoneNumber");
    }
  } else if (inputType == "number" && Number.isNaN(input)) {
    const message = await ctx.reply(`Please enter a ${inputType} format`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: currentLanguage.cancel, callback_data: "cancel" }],
        ],
      },
    });
    addMessageToDelete(state.currentUser.telegramUserName, message.message_id);
    return false;
  } else if (inputType == "name") {
    const pattern = /^[A-Za-z]{2,}$/;
    if (!pattern.test(input) && input.length) {
      const message = await ctx.reply(`Please enter a valid name`, {
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
      return false;
    } else return true;
  } else if (typeof input != inputType) {
    if (customMessage) await ctx.reply(customMessage);
    else {
      const message = await ctx.reply(`Please enter a ${inputType} format`, {
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
      return false;
    }
  } else if (typeof input == inputType) {
    return true;
  }
}
