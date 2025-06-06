export function generateWinningCombinations(size: number): number[][] {
  const combinations: number[][] = [];
  for (let row = 0; row < size; row++) {
    const combo: number[] = [];
    for (let col = 0; col < size; col++) {
      combo.push(row * size + col);
    }
    combinations.push(combo);
  }
  for (let col = 0; col < size; col++) {
    const combo: number[] = [];
    for (let row = 0; row < size; row++) {
      combo.push(row * size + col);
    }
    combinations.push(combo);
  }
  const mainDiagonal: number[] = [];
  for (let i = 0; i < size; i++) {
    mainDiagonal.push(i * size + i);
  }
  combinations.push(mainDiagonal);
  const antiDiagonal: number[] = [];
  for (let i = 0; i < size; i++) {
    antiDiagonal.push(i * size + (size - 1 - i));
  }
  combinations.push(antiDiagonal);

  return combinations;
}
