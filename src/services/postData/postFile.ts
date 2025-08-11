import fs from "fs";
import Post from "../../clients/Post";
import client from "../../clients/DB_Connection";

async function uploadFile(path: string, name: string) {
  const fileBuffer = fs.readFileSync(path);
  const Client = await client;
  let query = `INSERT INTO assets ("assetData","assetName") VALUES ($1,$2)`;
  await Client.query(query, [fileBuffer, name]);
}

// uploadFile(
//   "C:/Users/Elezer/Documents/vision funnd mobile banking ussd guide/projects/combined/combined assets/amh/VisionFund USSD mobile banking english video guide.mp4",
//   "englishUSSdVideoGuide"
// );
