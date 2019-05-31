export default function groupDebitByCategory(data) {
  const grouped = {};

  data.forEach(trans => {
    if (trans.debit) {
      grouped[trans.category] = trans.debit + (grouped[trans.category] || 0)
    }
  })

  let output = [];

  for (let key in grouped) {
    output.push({ name: key, amount: grouped[key] })
  }

  output.sort((a, b) => b.amount - a.amount )

  return output;
}
