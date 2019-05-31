import React, { Component } from 'react'
import * as d3 from 'd3'

import './CategoryByMonthChart.css'

function formatData(transactions) {
  let grouped = {
    Total: {}
  }

  transactions.forEach(t => {
    const category = t.category
    if (category === 'Rent') return

    if (!grouped[category]) {
      grouped[category] = {}
    }

    const yearMonth = t.date.slice(0, 7) + '-01T00:00:00'
    if (!grouped[category][yearMonth]) {
      grouped[category][yearMonth] = t.debit
    } else {
      grouped[category][yearMonth] += t.debit
    }

    if (!grouped['Total'][yearMonth]) {
      grouped['Total'][yearMonth] = t.debit
    } else {
      grouped['Total'][yearMonth] += t.debit
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

  categories = categories.filter(cat => {
    let keep = false
    cat.data.forEach(m => {
      if (m.data) keep = true
    })

    return keep
  })

  console.log(categories)
  return categories
}

function transactionDateRange(transactions) {
  let first, last
  transactions.forEach(trans => {
    const transDate = new Date(trans.date.slice(0, 7) + '-01')
    if (!first || transDate < first) {
      first = transDate
    }

    if (!last || transDate > last) {
      last = transDate
    }
  })

  return [first, last]
}

class CategoryByMonthChart extends Component {
  componentDidMount() {
    const { transactions, height = 500, width = 800 } = this.props
    const data = formatData(transactions)
    console.log(data)
    // 2. Use the margin convention practice
    var margin = {top: 50, right: 50, bottom: 50, left: 50}
      , w = width - margin.left - margin.right // Use the window's width
      , h = height - margin.top - margin.bottom; // Use the window's height

    var xScale = d3.scaleTime()
        .domain(transactionDateRange(transactions))
        .range([0, w]);

    // 6. Y scale will use the randomly generate number
    const maxDebit = d3.max(data.find(e => e.key === 'Total').data.map(e => e.data))
    var yScale = d3.scaleLinear()
        .domain([0, maxDebit]) // input
        .range([h, 0]); // output

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // 7. d3's line generator
    var line = d3.line()
        .x(function(d) { return xScale(d.key); }) // set the x values for the line generator
        .y(function(d) { return yScale(d.data); }) // set the y values for the line generator

    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    // var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })

    // 1. Add the SVG to the page and employ #2
    var svg = d3.select("body").append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 3. Call the x axis in a group tag
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat("%b"))

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    const lines = svg.append('g')

    lines.selectAll('.line-group')
        .data(data)
        .enter()
          .append('path')
          .attr("class", "line")
          .attr("stroke", (_, i) => color(i))
          .attr("d", d => line(d.data));

    const legend = svg.append('g')

    legend.selectAll('.legend-group')
      .data(data)
      .enter()
        .append('text')
        .attr("class", "legend")
        .attr('y', (_, i) => 10 * i + 30)
        .attr('x', 10)
        .attr('fill', (_, i) => color(i))
        .text(d => d.key)

  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div id="category-by-month-chart"></div>
    )
  }
}

export default CategoryByMonthChart
