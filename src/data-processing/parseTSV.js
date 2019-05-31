export default function parseTSV(data) {
  // Data comes in as an array of transaction arrays
  // so we flatten it into an array of transactions,
  // then format the data
  const output = data
    .flat()
    .map(trans => ({
      transaction: trans.Transaction,
      date: trans.Date,
      debit: Math.floor(+trans.Debit),
      credit: Math.floor(+trans.Credit),
      category: trans.Category
    }));

  console.log(output);
  return output;
}
