export const passwordFormValidate = (val: string) =>
  val.length < 6 ? "Пароль должен содержать не менее 6 символов" : null;
