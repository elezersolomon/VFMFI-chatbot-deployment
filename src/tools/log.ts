import * as util from "util";
import * as fs from "fs";
import * as rfs from "rotating-file-stream"; // Ensure correct import

const logDirectory = "dist/outputs";

type typeType = "Error" | "Success" | "Info";
export default function Log(
  type: typeType,
  description: string,
  error?: object,
  consoleLog?: boolean
) {
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  // Create a rotating write stream
  try {
    const logFileStream = rfs.createStream("app.log", {
      interval: "1d", // Rotate daily
      path: logDirectory,
      maxFiles: 30, // Keep a maximum of 30 files
    });
    const timestamp = `Time: ${new Date().toISOString()}`;
    const Output = `${error}`;
    const logMessage = `////////////////////////////////////////////////////////////////////////////\n[${timestamp}]\ndescription: ${description}\n Type : ${type} \n ${
      error ? Output : ""
    }\n////////////////////////////////////////////////////////////////////////////\n
`;
    logFileStream.write(logMessage);
    consoleLog ? null : process.stdout.write(logMessage); // Also log to the console
  } catch (error) {
    Log("Error", "Data_ error");
  }
}
