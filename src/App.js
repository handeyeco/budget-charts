import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { tsv } from 'd3';
import './App.css';

import AmountTable from './tables/AmountTable'
import CategoryByMonthChart from './charts/CategoryByMonthChart'

import {
  parseTSV,
  groupDebitByTransaction,
  groupDebitByCategory
} from './data-processing'

const TableContainer = styled.div`
  display: none;
  justify-content: center;

  > Table {
    margin: 1rem;
  }
`

export default () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    Promise.all([
      tsv('./data/2019-01.tsv'),
      tsv('./data/2019-02.tsv'),
      tsv('./data/2019-03.tsv'),
      tsv('./data/2019-04.tsv')
    ])
    .then(parseTSV)
    .then(setTransactions)
  }, [])

  return (
    <>
      <TableContainer>
        <AmountTable transactions={transactions} groupingFunction={groupDebitByTransaction} />
        <AmountTable transactions={transactions} groupingFunction={groupDebitByCategory} />
      </TableContainer>

      {transactions.length && (
        <CategoryByMonthChart transactions={transactions} />
      )}
    </>
  );
}
