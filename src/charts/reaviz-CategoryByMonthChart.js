import React from 'react'
import { LineChart } from 'reaviz'

const electric = [
  {
    key: new Date('2019-01-01T06:00:00.000Z'),
    data: 49
  },
  {
    key: new Date('2019-02-01T06:00:00.000Z'),
    data: 93
  },
  {
    key: new Date('2019-03-01T06:00:00.000Z'),
    data: 44
  },
  {
    key: new Date('2019-04-01T06:00:00.000Z'),
    data: 28
  }
]

const food = [
  {
    key: new Date('2019-01-01T06:00:00.000Z'),
    data: 169
  },
  {
    key: new Date('2019-02-01T06:00:00.000Z'),
    data: 84
  },
  {
    key: new Date('2019-03-01T06:00:00.000Z'),
    data: 86
  },
  {
    key: new Date('2019-04-01T06:00:00.000Z'),
    data: 206
  }
]

const multi = [
  {
    key: 'Electricity',
    data: electric
  },
  {
    key: 'Food',
    data: food
  }
]

function formatData(transactions) {
  let grouped = {}

  transactions.forEach(t => {
    const category = t.category
    if (!grouped[category]) {
      grouped[category] = {}
    }

    const yearMonth = t.date.slice(0, 7) + '-01T00:00:00'
    if (!grouped[category][yearMonth]) {
      grouped[category][yearMonth] = t.debit
    } else {
      grouped[category][yearMonth] += t.debit
    }
  })

  console.log(grouped)

  let categories = []
  for (let category in grouped) {
    let months = []
    for (let month in grouped[category]) {
      months.push({ key: new Date(month), data: grouped[category][month] })
    }
    categories.push({ key: category, data: months })
  }

  console.log(categories)
  return categories
}

export default ({ transactions = [] }) => {
  if (!transactions.length) return <div>No transactions</div>

  // const data = formatData(transactions)

  return (
    <>
      <LineChart width={500} height={300} data={food} />
      <LineChart width={500} height={300} data={electric} />
      <LineChart width={500} height={300} data={multi} />
    </>
  )
}
