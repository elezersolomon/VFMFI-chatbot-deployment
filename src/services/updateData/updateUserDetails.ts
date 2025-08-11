import Update from "../../clients/Update";
import { user } from "../../clients/Interfaces";
import Log from "../../tools/log";

export default async function UpdateUser(telegramUserName: string, data: {}) {
  const table = "users";
  let values = data;
  const setClause = Object.entries(values)
    .map(([key, value]) => `"${key}" = '${value}'`)
    .join(", ");
  const condition = `"telegramUserName" = '${telegramUserName}'`;
  return await Update({ table, setClause, condition })
    .catch((error) => Log("Error", "Not able to update user data"))
    .then((value) => {
      Log("Success", "Update user data successful.");
      return value?.rowCount;
    });
}
