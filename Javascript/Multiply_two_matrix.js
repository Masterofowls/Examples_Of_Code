const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const multiplyMatrices = (matrixA, matrixB) => {
  if (!matrixA.length || !matrixB.length) {
    throw new Error('Matrices cannot be empty.');
  }

  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const rowsB = matrixB.length;
  const colsB = matrixB[0].length;

  if (matrixA.some((row) => row.length !== colsA)) {
    throw new Error('Matrix A has inconsistent row sizes.');
  }

  if (matrixB.some((row) => row.length !== colsB)) {
    throw new Error('Matrix B has inconsistent row sizes.');
  }

  if (colsA !== rowsB) {
    throw new Error(
      `Cannot multiply: columns of A (${colsA}) must equal rows of B (${rowsB}).`,
    );
  }

  const result = Array.from({ length: rowsA }, () =>
    Array.from({ length: colsB }, () => 0),
  );

  for (let i = 0; i < rowsA; i += 1) {
    for (let j = 0; j < colsB; j += 1) {
      for (let k = 0; k < colsA; k += 1) {
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }

  return result;
};

const readMatrix = async (rl, name) => {
  const rows = Number((await rl.question(`Enter number of rows for ${name}: `)).trim());
  const cols = Number((await rl.question(`Enter number of columns for ${name}: `)).trim());

  if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows <= 0 || cols <= 0) {
    throw new Error('Rows and columns must be positive integers.');
  }

  const matrix = [];
  console.log(`Enter rows for ${name} (space-separated numbers):`);

  for (let r = 0; r < rows; r += 1) {
    const rowValues = (await rl.question(`Row ${r + 1}: `))
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(Number);

    if (rowValues.length !== cols || rowValues.some((value) => Number.isNaN(value))) {
      throw new Error(`Expected ${cols} numeric values in row ${r + 1}.`);
    }

    matrix.push(rowValues);
  }

  return matrix;
};

const printMatrix = (matrix) => {
  for (const row of matrix) {
    console.log(row.map((value) => String(value)).join(' '));
  }
};

const main = async () => {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const matrixA = await readMatrix(rl, 'Matrix A');
    const matrixB = await readMatrix(rl, 'Matrix B');
    const result = multiplyMatrices(matrixA, matrixB);

    console.log('\nResult (A x B):');
    printMatrix(result);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
    rl.close();
  }
};

main();
