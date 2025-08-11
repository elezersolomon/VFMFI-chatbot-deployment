import { callback } from "telegraf/typings/button";
import state from "../data/botStates";
import { addMessageToDelete } from "../services/updateData/setChatData";
type navButtons = {
  back?: string;
  home?: boolean;
};
import { currentLanguage, setCurrentLanguage } from "../data/language";

export default async function listArrayAsButtons(
  ctx: any,
  Buttons: Array<any>,
  rowCount: number,
  text: string,
  navButtons?: navButtons
) {
  let arrangedArray: Array<object>[] = [];
  let row: Object[] = [];
  Buttons.map((button, index) => {
    row.push({ text: button.title, callback_data: button.callbackData });

    if (row.length == rowCount || index == Buttons.length - 1) {
      arrangedArray.push(row);
      if (index == Buttons.length - 1) {
        let navButtonsToDisplay = [];
        if (navButtons?.back)
          navButtonsToDisplay.push({
            text: currentLanguage.back,
            callback_data: navButtons?.back,
          });
        if (navButtons?.home)
          navButtonsToDisplay.push({
            text: currentLanguage.home,
            callback_data: "topmenu",
          });
        arrangedArray.push(navButtonsToDisplay);
      }
      row = [];
    }
  });
  const message = await ctx.reply(text, {
    reply_markup: {
      inline_keyboard: arrangedArray,
    },
  });

  addMessageToDelete(state.currentUser.telegramUserName, message.message_id);
}
