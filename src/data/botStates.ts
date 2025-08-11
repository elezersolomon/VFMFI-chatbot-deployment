type LanguageKey = "eng" | "amh" | "oro" | "tig" | "som";

let language: LanguageKey = "eng";
let state: any = {
  onScene: {
    status: false,
    message: "",
  },
  expectingInput: false,
  lastMessage: 0,
  currentUser: {
    telegramID: 0,
    telegramUserName: "",
    userFName: "",
    userLName: "",
    preferredLanguage: "",
  },
  messagesToDelete: {},
};

export default state;
