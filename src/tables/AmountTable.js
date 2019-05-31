import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;

  th, td {
    padding: 0.5rem;
    border: 1px solid black;
    text-align: left;
  }

  tr:nth-child(odd) {
    background: lightgrey;
  }

  td:last-of-type {
    text-align: right;
  }
`

export default ({ transactions, groupingFunction }) => {
  if (!transactions.length) return <div>No transactions</div>

  const grouped = groupingFunction(transactions)

  return (
    <Table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Amount</th>
        </tr>
        {
          grouped.map(group => (
            <tr key={group.name}>
              <td>{ group.name }</td>
              <td>{ group.amount }</td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}
