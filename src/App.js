import React from 'react';
import { tsv } from 'd3';
import './App.css';

let combined = []
Promise.all([
  tsv('./data/2019-01.tsv'),
  tsv('./data/2019-02.tsv'),
  tsv('./data/2019-03.tsv'),
  tsv('./data/2019-04.tsv')
])
.then(data => {
  data.forEach(arr => combined = [...combined, ...arr]);
  combined = combined.map(trans => ({
    transaction: trans.Transaction,
    date: trans.Date,
    debit: Math.floor(+trans.Debit),
    credit: Math.floor(+trans.Credit),
    category: trans.Category
  }));
  return combined
})
.then(trans => {
  groupDebitByCategory(trans);
  groupDebitByTransaction(trans);
  calculateMonthlySavingsRate(trans);
})

function calculateMonthlySavingsRate(data) {
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

function groupDebitByCategory(data) {
  const output = {};

  data.forEach(trans => {
    if (trans.debit) {
      output[trans.category] = trans.debit + (output[trans.category] || 0)
    }
  })

  console.log(output);
  return output;
}

function groupDebitByTransaction(data) {
  const output = {};

  data.forEach(trans => {
    if (trans.debit) {
      output[trans.transaction] = trans.debit + (output[trans.transaction] || 0)
    }
  })

  console.log(output);
  return output;
}

function App() {
  return (
    <div>Testing</div>
  );
}

export default App;
