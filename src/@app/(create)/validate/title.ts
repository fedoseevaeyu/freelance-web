export default function validateTitleInput(value: string) {
  return value.length < 20
    ? "Название должно содержать не менее 20 символов"
    : value.length > 100
    ? "Название должно содержать не более 100 символов"
    : null;
}
