import client from "./DB_Connection";
import { update } from "./Interfaces";
export default async function Update({ table, setClause, condition }: update) {
  try {
    const Client = await client;

    const query = `UPDATE "${table}" SET ${setClause} WHERE ${condition}`;
    const res = await Client.query(query);
    return res;
  } catch (error) {
    console.error("update error", error);
    throw error;
  }
}
