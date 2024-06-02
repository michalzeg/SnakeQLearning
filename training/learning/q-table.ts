export type qTableType = number[][][];


export const createQTable = (rows: number, columns: number, actions: number): qTableType => {
  const qTable: number[][][] = [];
  for (let i = 0; i < rows; i++) {
    qTable[i] = [];
    for (let j = 0; j < columns; j++) {
      qTable[i][j] = [];
      for (let k = 0; k < actions; k++) {
        qTable[i][j][k] = 0;
      }
    }
  }
  return qTable;
}
