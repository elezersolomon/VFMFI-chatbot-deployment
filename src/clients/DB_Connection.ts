import { Client } from "pg";
import Log from "../tools/log";

async function setDBConnection(): Promise<Client> {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "Whateverdude",
    database: "VFMFI_ChatBot_DB",
  });

  // Return a Promise that resolves to the connected client or an error
  return new Promise((resolve, reject) => {
    client.connect((error) => {
      if (error) {
        Log("Error", "Database Connection Error", error);
        reject(error); // Reject the Promise if there's an error
      } else {
        Log("Success", "Database connected");
        resolve(client); // Resolve the Promise with the connected client
      }
    });
  });
}
const client = setDBConnection();
export default client;
