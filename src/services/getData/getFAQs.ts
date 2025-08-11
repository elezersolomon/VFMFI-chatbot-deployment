import { isArray } from "util";
import Select from "../../clients/Get";
import Log from "../../tools/log";

async function getFAQS(columns?: Array<string>) {
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
  const res = await Select("FAQs", StringifiedTargetColumn).then(
    (value: any) => {
      if (value.length != 0) return value;
      else return "No FAQs Found";
    },
    (error) => {
      Log("Error", "Unable to get FAQs", error);
      return error;
    }
  );

  return res;
}

async function getFAQByID(FAQID: string, columns?: Array<string>) {
  const condition = `"FAQID" = FAQID`;
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
  const res = await Select("FAQs", StringifiedTargetColumn).then(
    (value: any) => {
      if (value.length != 0) return value;
      else return "No FAQs Found";
    },
    (error) => {
      Log("Error", "Unable to get FAQs by ID", error);
      return error;
    }
  );

  return res;
}

export { getFAQS, getFAQByID };
