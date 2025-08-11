import Select from "../../clients/Get";
import Log from "../../tools/log";

async function getAllUsers(columns?: Array<string>) {
  //@ts-ignore
  let StringifiedTargetColumn: any = [] || "";
  if (columns?.length != 0 && columns?.length != undefined) {
    StringifiedTargetColumn = columns?.map((value) => {
      let newTargetColumn = [];
      newTargetColumn.push(`"${value}"`);
      return newTargetColumn;
    });
  } else if (columns == undefined || columns.length == 0) {
    StringifiedTargetColumn = "*";
  }
  const users = Select("users", StringifiedTargetColumn).then(
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

async function getUserByTelegramUsername(
  userName: string,
  columns?: Array<string>
) {
  //@ts-ignore
  let StringifiedTargetColumn: any = [] || "";
  if (columns?.length != 0 && columns?.length != undefined) {
    StringifiedTargetColumn = columns?.map((value) => {
      let newTargetColumn = [];
      newTargetColumn.push(`"${value}"`);
      return newTargetColumn;
    });
  } else if (columns == undefined || columns.length == 0) {
    StringifiedTargetColumn = "*";
  }
  const userCondition = `"telegramUserName" = '${userName}'`;
  const users = Select("users", StringifiedTargetColumn, userCondition).then(
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

async function getUsers(condition: string, columns?: Array<string>) {
  const users = Select("users", undefined, condition);
  return users;
}

export { getAllUsers, getUserByTelegramUsername, getUsers };
