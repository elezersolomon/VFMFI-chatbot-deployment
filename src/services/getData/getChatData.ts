import Select from "../../clients/Get";
import Log from "../../tools/log";

async function getAllChatData(columns?: Array<string>) {
  const users = Select("chatData").then(
    (value) => {
      return value;
    },
    (error) => {
      Log("Error", "Data_unable to get all users", error);
      return [];
    }
  );
  return users;
}

async function getChatDataByTelegramUsername(
  userName: string,
  columns?: Array<string>
) {
  const userCondition = `"telegramUserName" = '${userName}'`;
  //@ts-ignore
  let StringifiedTargetcolumns: any = [] || "";
  if (columns?.length != 0 && columns?.length != undefined) {
    StringifiedTargetcolumns = columns?.map((value) => {
      let newTargetcolumns = [];
      newTargetcolumns.push(`"${value}"`);
      return newTargetcolumns;
    });
  } else if (columns == undefined || columns.length == 0) {
    StringifiedTargetcolumns = "*";
  }
  const users = Select(
    "chatData",
    StringifiedTargetcolumns,
    userCondition
  ).then(
    (value: any) => {
      if (value.length != 0) return value[0];
      else return false;
    },
    (error) => {
      Log("Error", "Unable to get user by telegram user name", error);
    }
  );
  return users;
}

export { getChatDataByTelegramUsername, getAllChatData };
