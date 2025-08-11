import { getAllUsers, getUserByTelegramUsername, getUsers } from "./getUsers";
import { getLeadByTelegramUsername } from "./getLeads";

class GetData {
  public getAllUsers = getAllUsers;
  public getUserByTelegramUsername = getUserByTelegramUsername;
  public getUsers = getUsers;
  public getUserByTelegramleadname = getLeadByTelegramUsername;
}

const getData = new GetData();

export default getData;
