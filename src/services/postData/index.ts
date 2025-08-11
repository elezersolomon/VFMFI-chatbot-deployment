import postLeads from "./Leads";
import postUser from "./postUser";

class PostData {
  public postLeads = postLeads;
  public postUser = postUser;
}

const postData = new PostData();

export default postData;
