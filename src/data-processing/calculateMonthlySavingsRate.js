export default function calculateMonthlySavingsRate(data) {
  const output = {};

  data.forEach(trans => {
    let month = trans.date.substring(5, 7);
    if (month === "1") console.log(trans)

    if (month in output) {
      output[month].debit += trans.debit;
      output[month].credit += trans.credit;
    } else {
      output[month] = {
        debit: trans.debit,
        credit: trans.credit
      }
    }
  })

  let totalSR = 0;
  let totalEntries = 0;
  for (let m in output) {
    let savings = output[m].credit - output[m].debit;
    output[m].savings = savings;
    output[m].savingsRate = Math.floor((savings/output[m].credit)*100);
    totalSR += output[m].savingsRate
    totalEntries += 1;
  }

  console.log(totalSR / totalEntries);

  return output;
}
