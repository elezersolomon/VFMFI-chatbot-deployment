import * as dotenv from "dotenv";

dotenv.config();

test("sample test", () => {
  expect("test").toEqual("test");
});
