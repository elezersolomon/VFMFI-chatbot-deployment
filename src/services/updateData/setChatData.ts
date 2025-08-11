import Update from "../../clients/Update";
import { user } from "../../clients/Interfaces";
import Log from "../../tools/log";

export default async function setChatData(telegramUserName: string, data: {}) {
  const table = "chatData";
  let values = {};
  const condition = `"telegramUserName" = '${telegramUserName}'`;
  Object.entries(data).map(([key, value]) => {
    values = {
      data: `jsonb_set("data", '{${key}}', '${value}'::jsonb)`,
    };
  });
  const setClause = Object.entries(values)
    .map(([key, value]) => `"${key}" = ${value}`)
    .join(", ");

  return await Update({ table, setClause, condition })
    .catch((error) => Log("Error", "Not able to update chatData"))
    .then((value) => {
      Log("Success", "Update chatData successful.");
      return value?.rowCount;
    });
}

export async function addMessageToDelete(
  telegramUserName: string,
  messageID: number
) {
  const table = "chatData";
  let values = {};
  const condition = `"telegramUserName" = '${telegramUserName}'`;

  values = {
    data: `jsonb_set("data", '{messagesToDelete}', (data->'messagesToDelete')::jsonb || '${messageID}'::jsonb)`,
  };
  const setClause = Object.entries(values)
    .map(([key, value]) => `"${key}" = ${value}`)
    .join(", ");
  return await Update({ table, setClause, condition })
    .catch((error) => Log("Error", "Not able to update chatData"))
    .then((value) => {
      Log("Success", "Update chatData successful.");
      return value?.rowCount;
    });
}
export async function emptyMessagesToDelete(telegramUserName: string) {
  const table = "chatData";
  const values = {
    data: `jsonb_set("data", '{messagesToDelete}', '[]'::jsonb)`,
  };
  const condition = `"telegramUserName" = '${telegramUserName}'`;

  const setClause = Object.entries(values)
    .map(([key, value]) => `"${key}" = ${value}`)
    .join(", ");
  return await Update({ table, setClause, condition })
    .catch((error) => {
      Log("Error", "Not able to update chatData");
      throw error; // Ensure errors are propagated for debugging
    })
    .then((value) => {
      Log("Success", "Update chatData successful.");
      return value?.rowCount;
    });
}
