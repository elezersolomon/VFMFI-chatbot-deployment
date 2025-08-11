import { isArray } from "util";
import Select from "../../clients/Get";
import Log from "../../tools/log";

async function getLeadByTelegramUsername(
  userName: string,
  columns?: Array<string>
) {
  const userCondition = `"telegramUserName" = '${userName}'`;
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
  const res = await Select(
    "leads",
    StringifiedTargetColumn,
    userCondition
  ).then(
    (value: any) => {
      if (value.length != 0) return value[0];
      else return "There is no lead recorded by that user name";
    },
    (error) => {
      Log("Error", "unable to get Lead by telegram user name", error);
    }
  );

  return res;
}

export { getLeadByTelegramUsername };
