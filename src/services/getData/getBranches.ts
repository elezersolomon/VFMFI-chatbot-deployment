import Select from "../../clients/Get";
import Log from "../../tools/log";

export const getBranches = async () => {
  const branches = await Select("branches", [`"id", "name"`]).then(
    (value) => {
      return value;
    },
    (error) => {
      Log("Error", "Data_unable to get all users", error);
      return [];
    }
  );

  if (Array.isArray(branches)) return branches;
  else throw "unexpected error while retrieving branches";
};
