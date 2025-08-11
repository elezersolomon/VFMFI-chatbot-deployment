import { languages } from "../data/language";
import state from "../data/botStates";
type LanguageKey = "eng" | "amh" | "oro" | "tig" | "som";
import { getLeadByTelegramUsername } from "../services/getData/getLeads";
import Log from "./log";
import changeLanguage from "../pages/chooseLanguage";
// use `any` if you don’t want to type the full translation structure:
// const Translations = translations as Partial<Record<LanguageKey, any>>;
export default async function getText(
  path: string,
  vars?: Record<string, string>
): Promise<string> {
  await getLeadByTelegramUsername(state.currentUser.telegramUserName).then(
    (value: any) => {
      // state.currentUser.preferredLanguage = value.language;
    },
    (error) => {
      Log("Error", "unable to get Lead by userName:", error);
    }
  );
  const keys = path.split(".");
  const preferredLanguage: LanguageKey = state.currentUser.preferredLanguage;
  let value: any = languages[preferredLanguage];
  for (const key of keys) {
    value = value?.[key];
    if (!value) return path; // fallback to key path
  }

  if (typeof value === "string" && vars) {
    for (const [key, val] of Object.entries(vars)) {
      value = value.replace(new RegExp(`{{${key}}}`, "g"), val);
    }
  }

  return typeof value === "string" ? value : path;
}
