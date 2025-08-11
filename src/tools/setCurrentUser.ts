import state from "../data/botStates";

export default function setCurrentUser(ctx: any) {
  if (ctx.message?.from) {
    state.currentUser = {
      telegramID: ctx.message?.from.id,
      telegramUserName: ctx.message?.from.username,
      userFName: ctx.message?.from.first_name,
      userLName: ctx.message?.from.last_name,
    };
  } else if (ctx.update?.callback_query?.from) {
    state.currentUser = {
      telegramID: ctx.update?.callback_queryfrom?.id,
      telegramUserName: ctx.update?.callback_query?.from.username,
      userFName: ctx.update?.callback_query?.from.first_name,
      userLName: ctx.update?.callback_query?.from.last_name,
    };
  }
}
