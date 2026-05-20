const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const quoteValue = (value) => {
  const trimmed = value.trim();

  if (trimmed.toLowerCase() === 'null') {
    return 'NULL';
  }

  if (!Number.isNaN(Number(trimmed))) {
    return trimmed;
  }

  return `'${trimmed.replaceAll("'", "''")}'`;
};

const buildSelect = async (rl) => {
  const table = (await rl.question('Table name: ')).trim();
  const columns = (await rl.question('Columns (comma-separated, or *): ')).trim() || '*';
  const where = (await rl.question('WHERE condition (optional): ')).trim();

  let sql = `SELECT ${columns} FROM ${table}`;
  if (where) {
    sql += ` WHERE ${where}`;
  }

  return `${sql};`;
};

const buildInsert = async (rl) => {
  const table = (await rl.question('Table name: ')).trim();
  const columnsRaw = (await rl.question('Columns (comma-separated): ')).trim();
  const valuesRaw = (await rl.question('Values (comma-separated): ')).trim();

  const columns = columnsRaw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const values = valuesRaw.split(',').map((item) => item.trim());

  if (columns.length !== values.length) {
    throw new Error('Columns count must match values count.');
  }

  const formattedValues = values.map(quoteValue).join(', ');
  return `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${formattedValues});`;
};

const buildUpdate = async (rl) => {
  const table = (await rl.question('Table name: ')).trim();
  const assignmentsRaw = (await rl.question('Set values (example: name=John, age=25): ')).trim();
  const where = (await rl.question('WHERE condition (required for safety): ')).trim();

  if (!where) {
    throw new Error('WHERE condition is required for UPDATE.');
  }

  const assignments = assignmentsRaw.split(',').map((part) => {
    if (!part.includes('=')) {
      throw new Error(`Invalid assignment: ${part}`);
    }

    const [column, value] = part.split('=');
    return `${column.trim()}=${quoteValue(value.trim())}`;
  });

  return `UPDATE ${table} SET ${assignments.join(', ')} WHERE ${where};`;
};

const buildDelete = async (rl) => {
  const table = (await rl.question('Table name: ')).trim();
  const where = (await rl.question('WHERE condition (required for safety): ')).trim();

  if (!where) {
    throw new Error('WHERE condition is required for DELETE.');
  }

  return `DELETE FROM ${table} WHERE ${where};`;
};

const main = async () => {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    console.log('Simple SQL Generator');
    console.log('1) SELECT');
    console.log('2) INSERT');
    console.log('3) UPDATE');
    console.log('4) DELETE');

    const choice = (await rl.question('Choose query type (1-4): ')).trim();

    let sql;
    if (choice === '1') {
      sql = await buildSelect(rl);
    } else if (choice === '2') {
      sql = await buildInsert(rl);
    } else if (choice === '3') {
      sql = await buildUpdate(rl);
    } else if (choice === '4') {
      sql = await buildDelete(rl);
    } else {
      console.log('Invalid choice.');
      return;
    }

    console.log('\nGenerated SQL:');
    console.log(sql);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
    rl.close();
  }
};

main();
