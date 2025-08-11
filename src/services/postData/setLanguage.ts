import { Context } from "telegraf";
import Update from "../../clients/Update";
import state from "../../data/botStates";

export default function setLanguage(lang: string, ctx: Context) {
  state.currentUser.currentLanguage = lang;
  Update({
    table: "leads",
    setClause: `"language" =  '${lang}'`,
    condition: `"telegramUserName" = '${state.currentUser.telegramUserName}'`,
  });
}
