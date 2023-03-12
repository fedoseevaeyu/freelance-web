export default function validatePriceInput(value: string) {
  return value ? (Number(value) < 100 ? "Цена должна быть не менее 100" : null) : null;
}
