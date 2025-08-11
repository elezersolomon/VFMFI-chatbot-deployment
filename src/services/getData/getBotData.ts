import Select from "../../clients/Get";
import Log from "../../tools/log";
export default async function getBotData(
  column: string,
  key?: string,
  description?: string
) {
  if (key) key = `-> '${key}' as data`;
  else key = "as data";
  if (!description) description = "";
  else description = `"description" = '${description}'`;
  if (!column) column = "*";
  else column = `"${column}"`;
  const users = await Select(
    "botData",
    [` ${column} ${key}`],
    description
  ).then(
    (value: any) => {
      return value[0].data;
    },
    (error) => {
      Log("Error", "Data_unable to get all users", error);
      return [];
    }
  );
  return users;
}
