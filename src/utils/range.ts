export function range(start: number, end: number) {
  return Array(end - start + 1)
    .fill(1)
    .map((_, idx) => start + idx);
}
