export default function groupDebitByTransaction(data) {
  let grouped = {};

  data.forEach(trans => {
    if (trans.debit) {
      grouped[trans.transaction] = trans.debit + (grouped[trans.transaction] || 0)
    }
  })

  let output = [];

  for (let key in grouped) {
    output.push({ name: key, amount: grouped[key] })
  }

  output.sort((a, b) => b.amount - a.amount )

  return output;
}
