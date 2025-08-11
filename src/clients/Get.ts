import { stringify } from "querystring";
import client from "./DB_Connection";
import { QueryResult } from "pg";
// type targetColumnsType = string["userFName"];
type targetColumnsType = string[];

const Select = async (
  table: String,
  targetColumns?: targetColumnsType,
  condition?: string,
  extra?: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (condition) condition = `where ${condition}`;
      else condition = "";
      const Client = await client;
      let query = `Select ${targetColumns}  from "${table}" ${condition}`;
      const res = await Client.query(query); // Perform the query
      resolve(res.rows); // Resolve with the result rows
    } catch (error: any) {
      console.error("select error", error); // Log any errors that occur
      reject([error.message]); // Reject with an array containing the error message
    }
  });
};

export default Select;
