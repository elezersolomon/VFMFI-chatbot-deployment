interface user {
  telegramUserName: string;
  telegramID: number;
  userFName: string;
  userLName: string;
  phoneNumber: number;
  address: string;
  preferredBranch: string;
  isCustomer: boolean;
}

interface chatData {
  telegramUserName: string;
  telegramID: number;
  data: {};
}

interface update {
  table: string;
  setClause: string;
  condition: string;
}

interface feedback {
  telegramUserName?: string;
  feedback: string;
  userID: number;
  leadID: number;
  toBranch: string;
}

interface lead {
  telegramID: number;
  vfclientID?: string;
  userFName: string | undefined;
  userLName: string | undefined;
  PhoneNumber?: number;
  telegramUserName: string | undefined;
}

export { user, update, lead, feedback, chatData };
