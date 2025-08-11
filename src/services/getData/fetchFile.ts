import fs from "fs";
import client from "../../clients/DB_Connection";

export default async function fetchFile(assetName: string) {
  const Client = await client;

  // Query the binary data from the table
  const query = 'SELECT * FROM assets WHERE "assetName" = $1'; // Use actual column/condition
  const values = [assetName]; // Replace with actual ID or condition

  const res = await Client.query(query, values);
  if (res.rows.length === 0) {
    console.error("❌ No rows returned for the specified ID.");
    return;
  }

  const fileBuffer = res.rows[0].assetData;
  const description = res.rows[0].description;

  if (!fileBuffer) {
    console.error("❌ Retrieved row does not contain 'asset' data.");
    console.log("Row data:", res.rows[0]);
    return;
  }
  // fs.writeFileSync("downloaded_image.mp4", fileBuffer);
  // console.log("✅ File downloaded successfully as 'downloaded_image.jpg'");
  return {
    descripton: description,
    data: fileBuffer,
  };
}

// fetchFile("englishUSSdVideoGuide2");
