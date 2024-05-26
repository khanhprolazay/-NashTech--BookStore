export const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

export const eq = (a: any, b: any) => a === b;