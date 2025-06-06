export function checkWin(winLines: number[][], field: string[]): string | null {
  console.log(winLines);
  for (let i = 0; i < winLines.length; i++) {
    const line = winLines[i];
    const firstSymbol = field[line[0]];

    if (!firstSymbol) continue;

    const isWin = line.every((index) => field[index] === firstSymbol);

    if (isWin) {
      return firstSymbol;
    }
  }

  return null; // Победителя нет
}
