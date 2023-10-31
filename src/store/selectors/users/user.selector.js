export const authUser =
  () =>
  ({ auth: { user } }) =>
    user;

export const userNotifications =
  () =>
  ({ auth: { notifications } }) =>
    notifications;
