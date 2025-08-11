import { error } from "console";
import client from "./DB_Connection";

export default async function Post(
  table: string,
  values: any[],
  columns: any[]
) {
  try {
    let columnsArray: any = [];
    let valuesArray: any = [];
    if (columns.length != 0 && columns != undefined) {
      columns?.map((value) => {
        value.replace(/['"]/g, "");
        columnsArray.push(`"${value}"`);
      });
      columnsArray = `(${columnsArray})`;
    }
    if (values.length != 0 && values != undefined) {
      values?.map((value) => {
        valuesArray.push(`'${value}'`);
      });
      valuesArray = `(${valuesArray})`;
    }
    const Client = await client;

    let query = `INSERT INTO "${table}" ${columnsArray} VALUES ${valuesArray}`;
    let res = await Client.query(query);

    return res;
  } catch (error: any) {
    throw error;
  }
}
