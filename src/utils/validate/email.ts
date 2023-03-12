export const emailFormValidate = (val: string) =>
  !val ? "Email не может быть пустым" : /^\S+@\S+$/.test(val) ? null : "Недействительный email";
