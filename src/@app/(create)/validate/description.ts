export default function validateDescriptionInput(value: string) {
  return value.length < 100
    ? "Описание должно содержать не менее 100 символов"
    : value.length > 1000
    ? "Описание должно содержать не более 1000 символов"
    : null;
}
