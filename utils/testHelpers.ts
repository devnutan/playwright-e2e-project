export function sortNumbersAscending(values: number[]): number[] {
  return [...values].sort((a, b) => a - b);
}